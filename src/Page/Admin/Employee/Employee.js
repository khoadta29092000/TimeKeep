import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

//hook
import { useSnackbar } from '../../../Hook/useSnackbar'

//Firebase
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../Config/FirebaseConfig'

//Mui
import { Avatar, Button, FormControl, TextField, DialogActions, Tooltip, IconButton } from '@mui/material'

//Icon
import VisibilityIcon from '@mui/icons-material/Visibility'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BadgeIcon from '@mui/icons-material/Badge'
import FilterListIcon from '@mui/icons-material/FilterList'
import DeleteIcon from '@mui/icons-material/Delete'
import EmailIcon from '@mui/icons-material/Email'
import AddIcon from '@mui/icons-material/Add'

//Component
import Search from '../../../Components/Search'
import TableData from '../../../Components/Table'
import IconBreadcrumbs from '../../../Components/Breadcrumbs'
import PopupData from '../../../Components/Popup'
import PopupConfirm from '../../../Components/PopupConfirm'

//reudex
import {
    DeleteEmployeeAsyncApi,
    PostEmployeeAsyncApi,
    PutEmployeeAsyncApi,
    getEmployeeAsyncApi,
} from '../../../Redux/Employee/employeeSlice'

const columns = [
    { id: 'number', label: 'Number', minWidth: 50, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 200, align: 'left' },
    { id: 'info', label: 'Name', minWidth: 200, align: 'left' },
    { id: 'address', label: 'Address', minWidth: 250, align: 'left' },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 100, align: 'left' },
    { id: 'gender', label: 'Gender', minWidth: 50, align: 'center' },
    { id: 'status', label: 'Status', minWidth: 50, align: 'center' },
    { id: 'action', label: 'Actions', minWidth: 50, align: 'center' },
]

const breadcrumbIcons = () => {
    const data = [
        { title: 'Dashboard', icon: <DashboardIcon />, url: '/', status: true },
        { title: 'Employee', icon: <BadgeIcon />, url: '/Employee', status: false },
    ]
    return data
}

const dataBreadcrumbs = breadcrumbIcons()

export default function EmployeeAdmin() {
    const showSnackbar = useSnackbar()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [open, setOpen] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [isAction, setIsAction] = useState(0)
    const [search, setSearch] = useState('')
    const [idDelete, setIdDelete] = useState()
    const [selectedImage, setSelectedImage] = useState()
    const [click, SetClick] = useState(false)
    //setting redux
    const { EmployeeList } = useSelector((state) => state.employee)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEmployeeAsyncApi())
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
        hireDate: new Date(),
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
            if (isAction == 1) {
                let today = new Date()
                const newData = {
                    hireDate: today,
                    ...values,
                }
                const { employeeId, ...data } = newData

                dispatch(PostEmployeeAsyncApi(data))
                    .then((response) => {
                        if (response.meta.requestStatus == 'fulfilled') {
                            setOpen(false)
                            setIsAction(0)
                            formik.setTouched({})
                            formik.setErrors({})
                            showSnackbar({
                                severity: 'success',
                                children: 'Add Employee successfully',
                            })
                            formik.setValues({
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
                            })
                            dispatch(getEmployeeAsyncApi())
                        }
                    })
                    .catch((error) => {})
            } else if (isAction == 2) {
                dispatch(PutEmployeeAsyncApi(values))
                    .then((response) => {
                        if (response.meta.requestStatus == 'fulfilled') {
                            setOpen(false)
                            setIsAction(0)
                            formik.setTouched({})
                            formik.setErrors({})
                            showSnackbar({
                                severity: 'success',
                                children: 'Update Employee successfully',
                            })
                            formik.setValues({
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
                            })
                            dispatch(getEmployeeAsyncApi())
                        }
                    })
                    .catch((error) => {})
            }
        },
    })

    const handleChangePage = (newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    const callbackSearch = (childData) => {
        setSearch(childData)
    }
    const handleClickOpenAdd = () => {
        setOpen(true)
        setIsAction(1)
    }
    const handleClickOpenUpdate = (data) => {
        setOpen(true)
        setIsAction(2)
        console.log('data', data)
        formik.setValues({
            employeeId: data.employeeId,
            managerId: data.managerId,
            name: data.name,
            address: data.address,
            gender: data.gender,
            email: data.email,
            phoneNumber: data.phoneNumber,
            status: data.status,
            hireDate: data.hireDate,
            avatar: data.avatar,
            timeOffRemain: data.timeOffRemain,
            employeesClassification: data.employeesClassification,
        })
    }

    const clickOpenFalse = (event) => {
        setOpen(false)
        setIsAction(0)
        formik.setTouched({})
        formik.setErrors({})
        formik.setValues({
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
        })
    }
    const handleClickOpenConfirm = (data) => {
        setOpenConfirm(true)
        setIdDelete(data)
    }
    const clickOpenFalseConfirm = (event) => {
        setOpenConfirm(false)
    }
    const handleClickSave = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        dispatch(DeleteEmployeeAsyncApi(idDelete))
            .then((response) => {
                if (response.meta.requestStatus == 'fulfilled') {
                    setOpenConfirm(false)
                    setIsAction(0)
                    showSnackbar({
                        severity: 'success',
                        children: 'Delete Employee successfully',
                    })
                    dispatch(getEmployeeAsyncApi())
                }
            })
            .catch((error) => {})
    }
    const viewModalContent = (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-5 py-4 px-8 mb-5 lg:my-0">
                    <div className={`my-2   ${isAction == 2 ? '' : 'hidden'}`}>
                        <TextField
                            id="outlined-basic"
                            size="small"
                            error={formik.touched.employeeId && formik.errors.employeeId ? true : undefined}
                            className={`w-full hidden  ${isAction == 2 ? '' : ''}`}
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
                            size="small"
                            error={formik.touched.email && formik.errors.email ? true : undefined}
                            className="w-full"
                            value={formik.values.email}
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Email"
                            variant="outlined"
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="text mt-1 text-red-600 font-semibold">{formik.errors.email}</div>
                        )}
                    </div>
                    <div className="my-2">
                        <TextField
                            id="outlined-basic"
                            size="small"
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
                            size="small"
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
                            size="small"
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
                            size="small"
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
                            size="small"
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
                            size="small"
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
                    {/* <div className="my-2">
                        <TextField
                            id="outlined-basic"
                            size="small"
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
                    </div> */}
                    <div className="my-2">
                        <TextField
                            id="outlined-basic"
                            size="small"
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
                            <div className="text mt-1 text-red-600 font-semibold">{formik.errors.timeOffRemain}</div>
                        )}
                    </div>
                </div>

                <DialogActions>
                    <div className="flex gap-5">
                        <Button variant="contained" color="inherit" autoFocus onClick={handleClickSave}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" autoFocus>
                            Save changes
                        </Button>
                    </div>
                </DialogActions>
            </form>
        </Fragment>
    )

    const createRows = () => {
        return EmployeeList.map((item, index) => ({
            ...item,
            email: (
                <button className="flex items-center gap-2 border-[1px] rounded-full py-2 px-3">
                    <EmailIcon className="w-8 h-8" />
                    {item.email}
                </button>
            ),
            address: item.address.length > 20 ? item.address.slice(0, 35) + '...' : item.address,
            info: (
                <div className="flex gap-2 items-center ">
                    {' '}
                    {/* Added the class 'align-center' for centering */}
                    <Avatar src={item.avatar} alt={item.name} style={{ width: 40, height: 40 }} />
                    <p className="font-bold">{item.name}</p>
                </div>
            ),
            status: <button className="bg-green-300 text-green-600 font-semibold py-1 px-2 rounded-xl">Active</button>,
            number: index + 1,
            action: (
                <div className="flex gap-2 justify-center">
                    <Tooltip onClick={() => handleClickOpenUpdate(item)} title="View Detail">
                        <IconButton>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip onClick={() => handleClickOpenConfirm(item.employeeId)} title="Delete">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
            gender: item.gender === 'Female' ? <FemaleIcon /> : <MaleIcon />,
        }))
    }
    const rows = createRows()
    console.log('search', search)
    return (
        <div>
            <Navbar />
            <PopupConfirm open={openConfirm} clickOpenFalse={clickOpenFalseConfirm} clickDelete={handleDelete} />
            <PopupData
                open={open}
                clickOpenFalse={clickOpenFalse}
                viewTitle={isAction == 1 ? 'Add Employee' : isAction == 2 ? 'Update Employee' : ''}
                viewContent={viewModalContent}
            />
            <div className="sm:ml-64 pt-20 h-screen bg-gray-50">
                <div className="px-12 py-6">
                    <h2 className="font-bold text-3xl mb-4"> Employee List </h2>
                    <div className="w-full mb-8 flex font-semibold items-center">
                        <IconBreadcrumbs data={dataBreadcrumbs} />
                        <div className="ml-auto uppercase">
                            <Button
                                onClick={handleClickOpenAdd}
                                startIcon={<AddIcon />}
                                variant="contained"
                                color="primary"
                                className=""
                            >
                                Add New
                            </Button>
                        </div>
                    </div>
                    <div className="bg-white p-4">
                        <div className="mb-5 flex items-center">
                            <Search parentCallback={callbackSearch} />
                            <div className="ml-auto md:mr-16 mr-4">
                                <FilterListIcon className="" />
                            </div>
                        </div>
                        <div>
                            <TableData
                                tableHeight={520}
                                rows={rows}
                                columns={columns}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
