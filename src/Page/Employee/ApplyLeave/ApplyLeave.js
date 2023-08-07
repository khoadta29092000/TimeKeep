import React, { Fragment, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

//date-picker-range
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './DateRangePickerCustomStyles.css'
import { addDays, startOfDay } from 'date-fns'
//Firebase
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../Config/FirebaseConfig'

//Mui
import {
    Popover,
    InputAdornment,
    TextField,
    OutlinedInput,
    Select,
    Button,
    FormControl,
    MenuItem,
    DialogActions,
    Tooltip,
    IconButton,
} from '@mui/material'

//Icon
import EventNoteIcon from '@mui/icons-material/EventNote'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BadgeIcon from '@mui/icons-material/Badge'
import FilterListIcon from '@mui/icons-material/FilterList'
import DeleteIcon from '@mui/icons-material/Delete'
import EmailIcon from '@mui/icons-material/Email'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

//Component
import TableData from '../../../Components/Table'
import IconBreadcrumbs from '../../../Components/Breadcrumbs'
import PopupData from '../../../Components/Popup'
import PopupConfirm from '../../../Components/PopupConfirm'
import Navbar from '../../Manager/Navbar'
import { calculateDays, formatDate, getDateRangeArray } from '../../../Hook/useFormatDate'

const columns = [
    { id: 'number', label: 'Number', minWidth: 50, align: 'center' },
    { id: 'date', label: 'Date', minWidth: 200, align: 'left' },
    { id: 'day', label: 'Day', maxWidth: 100, align: 'right' },
    { id: 'type', label: 'Leave Type', minWidth: 150, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 150, align: 'center' },
    { id: 'reason', label: 'Reason', minWidth: 150, align: 'center' },
    { id: 'action', label: 'Actions', minWidth: 100, align: 'center' },
]

const breadcrumbIcons = () => {
    const data = [
        { title: 'Dashboard', icon: <DashboardIcon />, url: '/', status: true },
        { title: 'Apply Leave', icon: <BadgeIcon />, url: '/Employee', status: false },
    ]
    return data
}

const dataBreadcrumbs = breadcrumbIcons()

export default function ApplyLeave() {
    //popover
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const openPopover = Boolean(anchorEl)
    const id = openPopover ? 'simple-popover' : undefined
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [open, setOpen] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [isAction, setIsAction] = useState(0)
    const [search, setSearch] = useState('')
    const [selectedImage, setSelectedImage] = useState()
    const [click, SetClick] = useState(false)
    const [leaveDays, setLeaveDays] = useState(0)
    const [leaveDaysDate, setLeaveDaysDate] = useState([])
    const today = new Date()
    const threeDaysLater = addDays(today, 3)

    const [dateRange, setDateRange] = useState([
        {
            startDate: threeDaysLater,
            endDate: threeDaysLater,
            key: 'selection',
        },
    ])
    const minDate = startOfDay(threeDaysLater)
    const dataLeaveType = ['Casual Leave', 'Sick Leave']
    const initialValues = {
        leaveReason: '',
        leaveType: 'Casual Leave',
        leaveDate: '',
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            leaveReason: Yup.string().required(),
        }),
        onSubmit: (values) => {
            console.log('chay')
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
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {})
                }
            )
        },
    })

    const handleDateChange = (ranges) => {
        setDateRange([ranges.selection])
        if (ranges.selection.startDate && ranges.selection.endDate) {
            setLeaveDays(calculateDays(ranges.selection.startDate, ranges.selection.endDate))
            const newDate = []
            const daysToAdd = calculateDays(ranges.selection.startDate, ranges.selection.endDate)

            const dateArray = getDateRangeArray(ranges.selection.startDate, ranges.selection.endDate)
            console.log('dateArray', dateArray[1])
            for (let i = 0; i < daysToAdd; i++) {
                newDate.push({ title: dateArray[i], type: 'Full Day' })
            }

            setLeaveDaysDate(newDate)
        }
    }
    console.log('day', leaveDays)
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
            leaveReason: data.leaveReason,
            leaveType: 'Casual Leave',
            leaveDate: '',
        })
    }

    const clickOpenFalse = (event) => {
        setOpen(false)
        setIsAction(0)
        formik.setValues({
            leaveReason: '',
            leaveType: 'Casual Leave',
            leaveDate: '',
        })
        setDateRange([
            {
                startDate: threeDaysLater,
                endDate: threeDaysLater,
                key: 'selection',
            },
        ])
        setLeaveDays(0)
        setLeaveDaysDate([])
    }
    const handleClickOpenConfirm = () => {
        setOpenConfirm(true)
    }
    const clickOpenFalseConfirm = (event) => {
        setOpenConfirm(false)
    }
    const handleClickSave = () => {
        setOpen(false)
    }
    const viewModalContent = (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-5 py-4 px-8 mb-5 lg:my-0">
                    <div>
                        <div className="my-2">
                            <div className="mb-1">
                                <strong className=" text-gray-500">Leave Type</strong>
                            </div>
                            <FormControl fullWidth>
                                <Select
                                    id="outlined-basic"
                                    size="small"
                                    type="date"
                                    error={formik.touched.leaveType && formik.errors.leaveType ? true : undefined}
                                    onChange={formik.handleChange}
                                    className="mt-2 w-full"
                                    value={formik.values.leaveType}
                                    name="leaveType"
                                    variant="outlined"
                                >
                                    {dataLeaveType.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="my-2">
                            <div className="mb-1">
                                <strong className=" text-gray-500">Leave Dates</strong>
                            </div>
                            <div>
                                <OutlinedInput
                                    type="text"
                                    aria-describedby={id}
                                    placeholder="Select Date Range"
                                    size="small"
                                    fullWidth
                                    onClick={handleClick}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" edge="end">
                                                <EventNoteIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    value={
                                        dateRange[0].startDate.toDateString() +
                                        ' - ' +
                                        dateRange[0].endDate?.toDateString()
                                    }
                                    readOnly
                                />

                                {openPopover && (
                                    <Popover
                                        id={id}
                                        open={openPopover}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <DateRange
                                            ranges={dateRange}
                                            onChange={handleDateChange}
                                            showSelectionPreview={false} // Ẩn chức năng filter
                                            editableDateInputs={true} // Cho phép người dùng nhập trực tiếp ngày
                                            moveRangeOnFirstSelection={false} // Không di chuyển khoảng ngày khi chọn ngày đầu tiên
                                            minDate={minDate}
                                        />
                                    </Popover>
                                )}
                            </div>
                            <div className="my-2">
                                <div className="mb-1">
                                    <strong className=" text-gray-500">Leave Reason</strong>
                                </div>
                                <FormControl fullWidth>
                                    <TextField
                                        multiline
                                        rows={6}
                                        id="outlined-basic"
                                        size="small"
                                        error={
                                            formik.touched.leaveReason && formik.errors.leaveReason ? true : undefined
                                        }
                                        onChange={formik.handleChange}
                                        className="mt-2 w-full"
                                        value={formik.values.leaveReason}
                                        name="leaveReason"
                                        variant="outlined"
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-100 relative">
                        <h2 className="font-medium m-4 text-lg text-gray-500">Your Leave Details</h2>
                        <div className="h-[240px] p-4  overflow-auto">
                            {leaveDaysDate.map((item, index) => {
                                return (
                                    <div className="flex mb-5 ">
                                        <div className="font-bold text-gray-400">{item.title}</div>
                                        <div className="flex gap-3 text-blue-600 font-bold ml-auto">
                                            {item.type} <ArrowDropDownIcon />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="absolute font-medium text-gray-500 bottom-0 p-4 text-lg  w-full flex ">
                            <div>Total Leave</div>
                            <div className="ml-auto">{leaveDays}</div>
                        </div>
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
        const data = [
            {
                id: '1',
                startDate: '2022/06/12',
                endDate: '2022/07/10',
                leaveType: 'Sick Leave',
                status: 'Approved',
                reason: 'nghỉ ốm',
            },
            {
                id: '2',
                startDate: '2022/09/08',
                endDate: '2022/09/12',
                leaveType: 'Casual Leave',
                status: 'Reject',
                reason: 'nghỉ phép',
            },
            {
                id: '3',
                startDate: '2022/11/12',
                endDate: '2022/11/14',
                leaveType: 'Sick Leave',
                status: 'Pending',
                reason: 'nghỉ ốm',
            },
        ]

        return data.map((item, index) => ({
            ...item,
            type: item.leaveType,
            date: (
                <div className="text-blue-600 font-medium">
                    {formatDate(item.startDate)} ~ {formatDate(item.endDate)}
                </div>
            ),
            day: calculateDays(item.startDate, item.endDate),
            status:
                item.status == 'Approved' ? (
                    <Tooltip title="Approved by Đạt">
                        <button className="bg-green-300 w-24 text-green-600 font-semibold py-1 px-2 rounded-xl">
                            Approved
                        </button>
                    </Tooltip>
                ) : item.status == 'Reject' ? (
                    <Tooltip title="Reject by Đạt ">
                        <button className="bg-red-300  w-24 font-semibold py-1 px-2 rounded-xl">Reject</button>
                    </Tooltip>
                ) : (
                    <button className="bg-orange-300  w-24 font-semibold py-1 px-2 rounded-xl">Pending</button>
                ),
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
        }))
    }
    const rows = createRows()
    console.log('search', search)
    return (
        <div>
            <Navbar />
            <PopupConfirm open={openConfirm} clickOpenFalse={clickOpenFalseConfirm} />
            <PopupData
                open={open}
                clickOpenFalse={clickOpenFalse}
                viewTitle={isAction == 1 ? 'Apply Leave' : isAction == 2 ? 'Edit Leave' : ''}
                viewContent={viewModalContent}
                size="md"
            />
            <div className="sm:ml-64 pt-20 h-screen bg-gray-50">
                <div className="px-12 py-6">
                    <h2 className="font-bold text-3xl mb-4"> Apply Leave List </h2>
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
