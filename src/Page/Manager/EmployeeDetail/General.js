import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

//Firebase
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../Config/FirebaseConfig'

//mui
import { Avatar, Button, FormControl, TextField } from '@mui/material'

//redux
import { PutEmployeeAsyncApi, getEmployeeByIdAsyncApi } from '../../../Redux/Employee/employeeSlice'
import { useSnackbar } from '../../../Hook/useSnackbar'

export default function General() {
    const [selectedImage, setSelectedImage] = useState()
    const [click, SetClick] = useState(false)
    const param = useParams()
    const showSnackbar = useSnackbar()
    const { EmployeeDetail } = useSelector((state) => state.employee)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEmployeeByIdAsyncApi(param.id))
            .then((response) => {
                if (response.meta.requestStatus == 'fulfilled') {
                    formik.setValues({
                        employeeId: response.payload.employeeId,
                        managerId: response.payload.managerId,
                        name: response.payload.name,
                        address: response.payload.address,
                        gender: response.payload.gender,
                        email: response.payload.email,
                        phoneNumber: response.payload.phoneNumber,
                        status: response.payload.status,
                        hireDate: response.payload.hireDate,
                        avatar: response.payload.avatar,
                        timeOffRemain: response.payload.timeOffRemain,
                        employeesClassification: response.payload.employeesClassification,
                    })
                    setSelectedImage(response.payload.avatar)
                }
            })
            .catch((error) => {
                // Handle failure case
            })
        return () => {}
    }, [])
    const initialValues = {
        employeeId: '',
        managerId: '',
        name: '',
        address: '',
        gender: '',
        email: '',
        phoneNumber: '',
        status: '',
        hireDate: '',
        avatar: '',
        timeOffRemain: '',
        employeesClassification: '',
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            managerId: Yup.string().required(),
            email: Yup.string().required(),
            name: Yup.string().min(5, 'Too Short!').max(4000, 'Too Long!').required(),
            address: Yup.string().min(5, 'Too Short!').max(4000, 'Too Long!').required(),
            gender: Yup.string().required(),
            phoneNumber: Yup.string().required(),
            status: Yup.string().required(),
            timeOffRemain: Yup.number().typeError('not valid Number').required().positive(),
        }),
        onSubmit: (values) => {
            const storageRef = ref(storage, `Package/${selectedImage.name}`)
            const uploadTask = uploadBytesResumable(storageRef, selectedImage)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                },
                (error) => {
                    alert(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        let today = new Date()
                        const newData = {
                            ...values,
                            hireDate: today,
                            avatar: click == true ? downloadURL : values.avatar,
                        }
                        await dispatch(PutEmployeeAsyncApi(newData))
                            .then((response) => {
                                if (response.meta.requestStatus == 'fulfilled') {
                                    showSnackbar({
                                        severity: 'success',
                                        children: 'Update Employee successfully',
                                    })
                                    SetClick(false)
                                    dispatch(getEmployeeByIdAsyncApi(param.id))
                                        .then((response) => {
                                            if (response.meta.requestStatus == 'fulfilled') {
                                                formik.setValues({
                                                    employeeId: response.payload.employeeId,
                                                    managerId: response.payload.managerId,
                                                    name: response.payload.name,
                                                    address: response.payload.address,
                                                    gender: response.payload.gender,
                                                    email: response.payload.email,
                                                    phoneNumber: response.payload.phoneNumber,
                                                    status: response.payload.status,
                                                    hireDate: response.payload.hireDate,
                                                    avatar: response.payload.avatar,
                                                    timeOffRemain: response.payload.timeOffRemain,
                                                    employeesClassification: response.payload.employeesClassification,
                                                })
                                                setSelectedImage(response.payload.avatar)
                                            }
                                        })
                                        .catch((error) => {
                                            // Handle failure case
                                        })
                                }
                            })
                            .catch((error) => {
                                // Handle failure case
                            })
                    })
                }
            )
        },
    })
    return (
        <div className="bg-white block gap-10 my-5 lg:my-0 lg:flex">
            <div className="flex flex-col gap-5 w-full items-center h-[600px] rounded-2xl bg-white shadow-lg pt-16 my-5 lg:w-1/3 lg:my-0">
                {selectedImage == undefined ? (
                    <Avatar className="mx-auto" sx={{ width: 160, height: 160 }} />
                ) : (
                    <Avatar
                        className="mx-auto"
                        sx={{ width: 160, height: 160 }}
                        src={click == false ? selectedImage : window.URL.createObjectURL(selectedImage)}
                    />
                )}
                <p className="text-center text-lg text-gray-400 font-semibold">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
                <Button className="" variant="contained" component="label">
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={(event) => {
                            setSelectedImage(event.target.files[0])
                            SetClick(true)
                        }}
                    />
                </Button>
            </div>
            <div className="rounded-2xl bg-white shadow-lg lg:w-2/3">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-2 gap-5 py-4 px-8 mb-5 lg:my-0">
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.employeeId && formik.errors.employeeId ? true : undefined}
                                className="w-full"
                                value={formik.values.employeeId}
                                name="employeeId"
                                label="Id"
                                variant="outlined"
                                disabled
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.email && formik.errors.email ? true : undefined}
                                className="w-full"
                                value={formik.values.email}
                                name="email"
                                label="Email"
                                variant="outlined"
                                disabled
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.name && formik.errors.name ? true : undefined}
                                className="w-full"
                                value={formik.values.name}
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Name"
                                variant="outlined"
                            />
                            {formik.errors.name && formik.touched.name && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.name}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.managerId && formik.errors.managerId ? true : undefined}
                                className="w-full"
                                value={formik.values.managerId}
                                name="managerId"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Manager"
                                variant="outlined"
                            />
                            {formik.errors.managerId && formik.touched.managerId && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.managerId}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.address && formik.errors.address ? true : undefined}
                                className="w-full"
                                value={formik.values.address}
                                name="address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Address"
                                variant="outlined"
                            />
                            {formik.errors.address && formik.touched.address && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.address}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.gender && formik.errors.gender ? true : undefined}
                                className="w-full"
                                value={formik.values.gender}
                                name="gender"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Gender"
                                variant="outlined"
                            />
                            {formik.errors.gender && formik.touched.gender && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.gender}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : undefined}
                                className="w-full"
                                value={formik.values.phoneNumber}
                                name="phoneNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Phone Number"
                                variant="outlined"
                            />
                            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.phoneNumber}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.status && formik.errors.status ? true : undefined}
                                className="w-full"
                                value={formik.values.status}
                                name="status"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Status"
                                variant="outlined"
                            />
                            {formik.errors.status && formik.touched.status && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.status}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.hireDate && formik.errors.hireDate ? true : undefined}
                                className="w-full"
                                value={formik.values.hireDate}
                                name="hireDate"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Hire Date"
                                variant="outlined"
                            />
                            {formik.errors.hireDate && formik.touched.hireDate && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.hireDate}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.timeOffRemain && formik.errors.timeOffRemain ? true : undefined}
                                className="w-full"
                                value={formik.values.timeOffRemain}
                                name="timeOffRemain"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Time Of Remain"
                                variant="outlined"
                            />
                            {formik.errors.timeOffRemain && formik.touched.timeOffRemain && (
                                <div className="text mt-1 text-red-600 font-semibold">
                                    {formik.errors.timeOffRemain}
                                </div>
                            )}
                        </div>
                    </div>
                    <Button className=" right-8 float-right" variant="contained" type="submit">
                        Save
                    </Button>
                </form>
            </div>
        </div>
    )
}
