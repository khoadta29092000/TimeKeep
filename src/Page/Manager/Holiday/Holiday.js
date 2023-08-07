import React, { Fragment, useRef, useState } from 'react'
import Navbar from '../Navbar'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

//Firebase
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../Config/FirebaseConfig'

//Mui
import {
    Avatar,
    Tooltip,
    IconButton,
    TextField,
    Button,
    InputLabel,
    Box,
    MenuItem,
    FormControl,
    Select,
    DialogActions,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

//Icon
import DashboardIcon from '@mui/icons-material/Dashboard'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import BadgeIcon from '@mui/icons-material/Badge'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

//Component
import IconBreadcrumbs from '../../../Components/Breadcrumbs'
import TableData from '../../../Components/Table'
import PopupConfirm from '../../../Components/PopupConfirm'
import PopupData from '../../../Components/Popup'

//hooks
import { useSnackbar } from '../../../Hook/useSnackbar'
import { calculateDays, formatDate, formatDateToInputValue, getDayOfWeek } from '../../../Hook/useFormatDate'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { PostHolidayAsyncApi, PutHolidayAsyncApi, getHolidayAsyncApi } from '../../../Redux/Holiday/holidaySlice'

const columns = [
    { id: 'number', label: 'Number', maxWidth: 50, align: 'center' },
    { id: 'title', label: 'Holiday Title', minWidth: 500, align: 'left' },
    { id: 'date', label: 'Holiday Date', minWidth: 150, align: 'left' },
    { id: 'day', label: 'Day', minWidth: 150, align: 'left' },
    { id: 'sesion', label: 'Session', minWidth: 150, align: 'left' },
    { id: 'type', label: 'Holiday Type', minWidth: 150, align: 'left' },
    { id: 'action', label: 'Actions', minWidth: 50, align: 'center' },
]

const breadcrumbIcons = () => {
    const data = [
        { title: 'Dashboard', icon: <DashboardIcon />, url: '/', status: true },
        { title: 'Manage Holiday', icon: <BadgeIcon />, url: '/ManageLeave', status: false },
    ]
    return data
}

const dataBreadcrumbs = breadcrumbIcons()

export default function Holiday() {
    const showSnackbar = useSnackbar()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [search, setSearch] = useState('')
    const [holidayTypes, setHolidayTypes] = useState()
    const [isAction, setIsAction] = useState(0)
    const [open, setOpen] = useState(false)
    const [openImport, setOpenImport] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [selectedImage, setSelectedImage] = useState()
    const [click, SetClick] = useState(false)
    const [chosenFileName, setChosenFileName] = useState('Chosen file (.csv or .xlsx)')
    const fileInputRef = useRef(null)
    const dataHoliday = ['Public Holiday', 'Office Holiday']
    const dataHolidaySession = ['Full day', 'Half Day - 1st Half', 'Half Day - 2st Half']
    const today = new Date()
    const initialValues = {
        holidayDate: today.toISOString().split('T')[0],
        holidayDateEnd: today.toISOString().split('T')[0],
        holidayTitle: '',
        holidaySesion: 'Full day',
        holidayType: 'Public Holiday',
        holidayId: 0,
    }
    const { HolidayList } = useSelector((state) => state.holiday)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHolidayAsyncApi())
        return () => {}
    }, [])
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            holidayTitle: Yup.string().required(),
        }),
        onSubmit: (values) => {
            console.log('chay', values)
            if (isAction == 1) {
                let body = {
                    name: values.holidayTitle,
                    startDate: values.holidayDate + 'T00:00:00.000Z',
                    endDate: values.holidayDateEnd + 'T00:00:00.000Z',
                    description: '',
                }
                dispatch(PostHolidayAsyncApi(body))
                    .then((response) => {
                        if (response.meta.requestStatus == 'fulfilled') {
                            setOpen(false)
                            setIsAction(0)
                            formik.setTouched({})
                            formik.setErrors({})
                            showSnackbar({
                                severity: 'success',
                                children: 'Add Holiday successfully',
                            })
                            formik.setValues({
                                holidayDate: today.toISOString().split('T')[0],
                                holidayDateEnd: today.toISOString().split('T')[0],
                                holidayTitle: '',
                                holidaySesion: 'Full day',
                                holidayType: 'Public Holiday',
                                holidayId: 0,
                            })
                            dispatch(getHolidayAsyncApi())
                        }
                    })
                    .catch((error) => {})
            } else if (isAction == 2) {
                let body = {
                    holidayId: values.holidayId,
                    name: values.holidayTitle,
                    startDate: values.holidayDate + 'T00:00:00.000Z',
                    endDate: values.holidayDateEnd + 'T00:00:00.000Z',
                    description: '',
                }
                dispatch(PutHolidayAsyncApi(body))
                    .then((response) => {
                        if (response.meta.requestStatus == 'fulfilled') {
                            setOpen(false)
                            setIsAction(0)
                            formik.setTouched({})
                            formik.setErrors({})
                            showSnackbar({
                                severity: 'success',
                                children: 'Update Holiday successfully',
                            })
                            formik.setValues({
                                holidayDate: today.toISOString().split('T')[0],
                                holidayDateEnd: today.toISOString().split('T')[0],
                                holidayTitle: '',
                                holidaySesion: 'Full day',
                                holidayType: 'Public Holiday',
                                holidayId: 0,
                            })
                            dispatch(getHolidayAsyncApi())
                        }
                    })
                    .catch((error) => {})
            }
        },
    })
    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            setChosenFileName(selectedFile.name)
        }
    }

    const handleBrowseButtonClick = () => {
        fileInputRef.current.click()
    }
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
    const handleChangeHolidayType = (event) => {
        setHolidayTypes(event.target.value)
    }

    const handleButtonClick = () => {
        showSnackbar({
            severity: 'success',
            children: 'ngu233',
        })
    }
    const handleClickOpenConfirm = () => {
        setOpenConfirm(true)
    }
    const handleClickOpenAdd = () => {
        setOpen(true)
        setIsAction(1)
    }
    console.log('a', formik.values)
    const handleClickOpenUpdate = (data) => {
        setOpen(true)
        setIsAction(2)
        formik.setValues({
            holidayDate: data.startDate.slice(0, 10),
            holidayDateEnd: data.endDate.slice(0, 10),
            holidayTitle: data.name,
            holidaySesion: 'Full day',
            holidayType: 'Public Holiday',
            holidayId: data.holidayId,
        })
        console.log('1', formatDateToInputValue(data.startDate.slice(0, 10)), data.startDate.slice(0, 10))
    }
    const handleClickOpenImport = () => {
        setOpenImport(true)
        setIsAction(0)
    }
    const clickOpenFalseConfirm = (event) => {
        setOpenConfirm(false)
    }
    const clickOpenFalse = (event) => {
        setOpenImport(false)
        setOpen(false)
        //fileInputRef.current.value = null
        setChosenFileName('Chosen file (.csv or .xlsx)')
        formik.setValues({
            holidayDate: today.toISOString().split('T')[0],
            holidayDateEnd: today.toISOString().split('T')[0],
            holidayTitle: '',
            holidaySesion: 'Full day',
            holidayType: 'Public Holiday',
            holidayId: 0,
        })
    }
    function handleDownloadExcelTemplate() {
        const templateUrl = '/holiday-templates-import'
        const link = document.createElement('a')
        link.href = templateUrl
        link.download = 'holiday-templates-import.xlsx'
        link.click()
    }
    const createRows = () => {
        const data = [
            {
                id: '1',
                title: 'Giỗ tổ Hùng Vương',
                date: '2023/07/28',
                sesion: 'Full day',
                type: 'Public Holiday',
            },
            {
                id: '2',
                title: 'Quốc Khánh',
                date: '2023/09/02',
                sesion: 'Full day',
                type: 'Public Holiday',
            },
            {
                id: '3',
                title: 'Thánh Giống về trời',
                date: '2023/07/29',
                sesion: 'Full day',
                type: 'Office Holiday',
            },
        ]

        return HolidayList.map((item, index) => ({
            ...item,
            day: calculateDays(item.startDate.slice(0, 10), item.endDate.slice(0, 10)),
            date: formatDate(item.startDate.slice(0, 10)) + ' - ' + formatDate(item.endDate.slice(0, 10)),
            number: index + 1,
            action: (
                <div className="flex gap-2 justify-center">
                    <Tooltip onClick={() => handleClickOpenUpdate(item)} title="Edit">
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip onClick={handleClickOpenConfirm} title="Delete">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
            sesion: 'Full day',
            type: 'Public Holiday',
            title: item.name,
        }))
    }

    const rows = createRows()
    const viewModalContent = (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>
                <div className=" px-8 mb-5 lg:my-0">
                    <div className="my-4">
                        <div className="mb-2">
                            <strong className=" text-gray-500">Holiday Start Day</strong>
                        </div>
                        <TextField
                            id="outlined-basic"
                            size="small"
                            type="date"
                            error={formik.touched.holidayDate && formik.errors.holidayDate ? true : undefined}
                            onChange={formik.handleChange}
                            className="mt-2 w-full"
                            value={formik.values.holidayDate}
                            name="holidayDate"
                            variant="outlined"
                        />
                    </div>
                    <div className="my-4">
                        <div className="mb-2">
                            <strong className=" text-gray-500">Holiday End Date</strong>
                        </div>
                        <TextField
                            id="outlined-basic"
                            size="small"
                            type="date"
                            error={formik.touched.holidayDateEnd && formik.errors.holidayDateEnd ? true : undefined}
                            onChange={formik.handleChange}
                            className="mt-2 w-full"
                            value={formik.values.holidayDateEnd}
                            name="holidayDateEnd"
                            variant="outlined"
                        />
                    </div>
                    <div className="my-4">
                        <div className="mb-2">
                            <strong className=" text-gray-500">Holiday Title</strong>
                        </div>
                        <TextField
                            id="outlined-basic"
                            size="small"
                            error={formik.touched.holidayTitle && formik.errors.holidayTitle ? true : undefined}
                            onChange={formik.handleChange}
                            className="mt-2 w-full"
                            value={formik.values.holidayTitle}
                            name="holidayTitle"
                            variant="outlined"
                        />
                        {formik.errors.holidayTitle && formik.touched.holidayTitle && (
                            <div className="text mt-1 text-red-600 font-semibold">{formik.errors.holidayTitle}</div>
                        )}
                    </div>
                    <div className="my-4">
                        <div className="mb-2">
                            <strong className=" text-gray-500">Holiday Sesion</strong>
                        </div>
                        <FormControl fullWidth>
                            <Select
                                id="outlined-basic"
                                size="small"
                                error={formik.touched.holidaySesion && formik.errors.holidaySesion ? true : undefined}
                                onChange={formik.handleChange}
                                className="mt-2 w-full"
                                value={formik.values.holidaySesion}
                                name="holidaySesion"
                                variant="outlined"
                            >
                                {dataHolidaySession.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="my-4">
                        <div className="mb-2">
                            <strong className=" text-gray-500">Holiday Type</strong>
                        </div>
                        <FormControl fullWidth>
                            <Select
                                id="outlined-basic"
                                size="small"
                                type="date"
                                error={formik.touched.holidayType && formik.errors.holidayType ? true : undefined}
                                onChange={formik.handleChange}
                                className="mt-2 w-full"
                                value={formik.values.holidayType}
                                name="holidayType"
                                variant="outlined"
                            >
                                {dataHoliday.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <DialogActions>
                    <div className="flex gap-5">
                        <Button variant="contained" color="inherit" autoFocus>
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
    const viewModalContentImport = (
        <Fragment>
            <div className="bg-blue-100 rounded-md p-4">
                <h2 className="text-gray-600">How to import holidays?</h2>
                <p className="text-gray-400">
                    Download the excel template from{' '}
                    <strong onClick={handleDownloadExcelTemplate} className="text-blue-500 cursor-pointer">
                        here
                    </strong>{' '}
                    and edit the template.
                </p>
            </div>
            <div className="my-4 text-gray-900 font-medium">Import the edited template here</div>
            <div className="mb-5 relative">
                <input
                    className="hidden" // Ẩn input mặc định
                    type="file"
                    accept=".csv, .xlsx" // Chỉ chấp nhận các tệp .csv và .xlsx
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                />
                <button
                    onClick={handleBrowseButtonClick}
                    className="border-[1px] cursor-pointer rounded-sm h-8 bg-gray-300 px-4 absolute "
                >
                    Browse
                </button>
                <button
                    onClick={handleBrowseButtonClick}
                    className="cursor-pointer block rounded-sm h-8 text-left w-full pl-24 font-medium text-gray-600  border border-gray-300   bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    fullWidth
                    variant="contained"
                >
                    {chosenFileName}
                </button>
            </div>
            <div className="mb-5">
                <Button className="text-center " fullWidth variant="contained">
                    Import Holiday File
                </Button>
            </div>
        </Fragment>
    )
    return (
        <div>
            <Navbar />
            <PopupConfirm open={openConfirm} clickOpenFalse={clickOpenFalseConfirm} />
            <PopupData
                open={open}
                clickOpenFalse={clickOpenFalse}
                viewTitle={isAction == 1 ? 'Add Holiday' : isAction == 2 ? 'Update Holiday' : ''}
                viewContent={viewModalContent}
            />
            <PopupConfirm open={openConfirm} clickOpenFalse={clickOpenFalseConfirm} />
            <PopupData
                size="xs"
                open={openImport}
                clickOpenFalse={clickOpenFalse}
                viewTitle={'Holidays Import from File'}
                viewContent={viewModalContentImport}
            />
            <div className="sm:ml-64 pt-20 h-screen bg-gray-50">
                <div className="px-12 py-6">
                    <h2 className="font-bold text-3xl mb-4">Manage Holiday List </h2>
                    <div className="mb-8 font-semibold">
                        <IconBreadcrumbs data={dataBreadcrumbs} />
                    </div>
                    <div className="mb-5 flex items-center">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Year"
                                openTo="year"
                                views={['year']}
                                className="bg-white"
                                inputFormat="DD/MM/YYYY "
                                slotProps={{ textField: { size: 'small' } }}
                            />
                        </LocalizationProvider>
                        <Box sx={{ minWidth: 250, marginLeft: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel size="small" id="demo-simple-select-label">
                                    Holiday Type
                                </InputLabel>
                                <Select
                                    size="small"
                                    className="bg-white"
                                    value={holidayTypes}
                                    label="Holiday Type"
                                    onChange={handleChangeHolidayType}
                                >
                                    {dataHoliday.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        <div className="ml-auto flex items-center gap-4 mr-4">
                            <Button variant="contained" onClick={handleClickOpenAdd} startIcon={<AddIcon />}>
                                Add Holiday
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleClickOpenImport}
                                color="inherit"
                                startIcon={<FileUploadIcon />}
                            >
                                Import Holiday
                            </Button>
                        </div>
                    </div>
                    <div className="bg-white">
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
    )
}
