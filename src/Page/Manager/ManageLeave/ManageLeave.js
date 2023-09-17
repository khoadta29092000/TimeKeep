import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { NavLink } from 'react-router-dom'

//Mui
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Avatar } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { LoadingButton } from '@mui/lab'

//Icon
import DashboardIcon from '@mui/icons-material/Dashboard'
import BadgeIcon from '@mui/icons-material/Badge'
import FilterListIcon from '@mui/icons-material/FilterList'
import DeleteIcon from '@mui/icons-material/Delete'

//Component
import Search from '../../../Components/Search'
import TableData from '../../../Components/Table'
import IconBreadcrumbs from '../../../Components/Breadcrumbs'
import TabsData from '../../../Components/Tabs'
import PopupConfirm from '../../../Components/PopupConfirm'

//hooks
import { calculateDays, formatDate } from '../../../Hook/useFormatDate'
import { PutApplyLeaveAsyncApi, getApplyLeaveAsyncApi } from '../../../Redux/ApplyLeave/ApplyLeaveSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from '../../../Hook/useSnackbar'
import NavbarHR from '../NavbarHR'
import TableLoadData from '../../../Components/TableLoad'

const columnsPending = [
    { id: 'number', label: 'Number', minWidth: 50, align: 'center' },
    { id: 'info', label: 'Employee Name', minWidth: 250, align: 'left' },
    { id: 'leavePeriod', label: 'Leave Period', minWidth: 250, align: 'left' },
    { id: 'days', label: 'Days', minWidth: 100, align: 'center' },
    { id: 'type', label: 'Type', minWidth: 100, align: 'left' },
    { id: 'applied', label: 'Applied On', minWidth: 50, align: 'center' },
    { id: 'file', label: 'File', minWidth: 100, align: 'left' },
    { id: 'reason', label: 'Reason', minWidth: 50, align: 'center' },
    { id: 'action', label: 'Actions', minWidth: 50, maxWidth: 50, align: 'left' },
]

const columnsApprove = [
    { id: 'number', label: 'Number', minWidth: 50, align: 'center' },
    { id: 'info', label: 'Employee Name', minWidth: 250, align: 'left' },
    { id: 'leavePeriod', label: 'Leave Period', minWidth: 250, align: 'left' },
    { id: 'days', label: 'Days', minWidth: 100, align: 'left' },
    { id: 'type', label: 'Type', minWidth: 100, align: 'center' },

    { id: 'reason', label: 'Reason', minWidth: 50, align: 'center' },
]
const columnsReject = [
    { id: 'number', label: 'Number', minWidth: 50, align: 'center' },
    { id: 'info', label: 'Employee Name', minWidth: 250, align: 'left' },
    { id: 'leavePeriod', label: 'Leave Period', minWidth: 250, align: 'left' },
    { id: 'days', label: 'Days', minWidth: 100, align: 'center' },
    { id: 'type', label: 'Type', minWidth: 100, align: 'left' },

    { id: 'reason', label: 'Reason', minWidth: 50, align: 'center' },
]
const columnsAll = [
    { id: 'number', label: 'Number', minWidth: 50, align: 'center' },
    { id: 'info', label: 'Employee Name', minWidth: 250, align: 'left' },
    { id: 'leavePeriod', label: 'Leave Period', minWidth: 250, align: 'left' },
    { id: 'days', label: 'Days', minWidth: 100, align: 'center' },
    { id: 'type', label: 'Type', minWidth: 100, align: 'left' },

    { id: 'status', label: 'Status', minWidth: 50, align: 'left' },
    { id: 'reason', label: 'Reason', minWidth: 50, align: 'center' },
    { id: 'actionAll', label: 'Actions', minWidth: 50, maxWidth: 50, align: 'left' },
]

const breadcrumbIcons = () => {
    const data = [
        { title: 'Dashboard', icon: <DashboardIcon />, url: '/', status: true },
        { title: 'Manage Leave', icon: <BadgeIcon />, url: '/ManageLeave', status: false },
    ]
    return data
}

const dataBreadcrumbs = breadcrumbIcons()

export default function ManageLeave() {
    const [loadingButton, setLoadingButton] = useState(false)
    const [loadingRJButton, setLoadingRJButton] = useState(false)
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(0)
    const showSnackbar = useSnackbar()
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState(-1)
    const employeeId = '298f3fa4-4c63-11ee-be56-0242ac120002'
    const handleChangePage = (newPage) => {
        setPage(newPage)
    }
    //setting redux
    const { ApplyLeaveList, valueTabs, loading } = useSelector((state) => state.applyLeave)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getApplyLeaveAsyncApi({ name: search, status: valueTabs == 3 ? -1 : valueTabs }))
        return () => {}
    }, [search, valueTabs])

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    const callbackSearch = (childData) => {
        setSearch(childData)
    }
    const handleClickOpen = () => {
        setOpen(true)
    }
    const clickOpenFalse = (event) => {
        setOpen(false)
    }
    const searchData = (data) => {
        return (
            <div className="p-4">
                <div className="mb-5 flex items-center">
                    <Search parentCallback={callbackSearch} />
                    <div className="ml-auto md:mr-4 mr-4"></div>
                </div>
                {data}
            </div>
        )
    }
    const handleClickApprove = (data) => {
        setLoadingButton(true)
        const Updatedata = {
            id: data.id,
            status: 1,
        }
        dispatch(PutApplyLeaveAsyncApi({ id: data.employeeId, body: Updatedata }))
            .then((response) => {
                setLoadingButton(false)
                if (response.meta.requestStatus == 'fulfilled') {
                    dispatch(getApplyLeaveAsyncApi({ name: search, status: valueTabs == 3 ? -1 : valueTabs }))
                    showSnackbar({
                        severity: 'success',
                        children: 'Approved request',
                    })
                }
            })
            .catch((error) => {
                setLoadingButton(false)
            })
    }
    const handleClickReject = (data) => {
        setLoadingRJButton(true)
        const Updatedata = {
            id: data.id,
            status: 2,
        }
        dispatch(PutApplyLeaveAsyncApi({ id: data.employeeId, body: Updatedata }))
            .then((response) => {
                if (response.meta.requestStatus == 'fulfilled') {
                    setLoadingRJButton(false)
                    dispatch(getApplyLeaveAsyncApi({ name: search, status: valueTabs == 3 ? -1 : valueTabs }))
                    showSnackbar({
                        severity: 'success',
                        children: 'Reject request',
                    })
                }
            })
            .catch((error) => {
                setLoadingRJButton(false)
            })
    }
    const createRows = () => {
        const data = [
            {
                id: '1',
                email: 'VietDH16022000@gmail.com',
                name: 'Đặng Hoàng Việt',
                startTime: '2022/07/12',
                endTime: '2022/07/26',
                days: '14',
                type: 'Sick Leave',
                applied: '2022/07/09',
                reason: 'kaksdkaskdaskdaskdkasdkasdksakdaskdasd',
                aprrovedBy: 'Đạt',
                avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg',
                status: 'True',
                rejectReason: 'bla bla bla bla',
                rejectBy: 'Đạt',
            },

            {
                id: '3',
                email: 'VietDH16022000@gmail.com',
                name: 'Đặng Hoàng Việt',
                startTime: '2022/07/12',
                endTime: '2022/07/26',
                days: '14',
                type: 'Sick Leave',
                applied: '2022/07/09',
                reason: 'kaksdkaskdaskdaskdkasdkasdksakdaskdasd',
                aprrovedBy: 'Đạt',
                avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg',
                status: 'False',
                rejectReason: 'bla bla bla bla',
                rejectBy: 'Đạt',
            },

            {
                id: '5',
                email: 'VietDH16022000@gmail.com',
                name: 'Đặng Hoàng Việt',
                startTime: '2022/07/12',
                endTime: '2022/07/26',
                days: '14',
                type: 'Sick Leave',
                applied: '2022/07/09',
                reason: 'kaksdkaskdaskdaskdkasdkasdksakdaskdasd',
                aprrovedBy: 'Đạt',
                avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg',
                status: 'Pending',
                rejectReason: 'bla bla bla bla',
                rejectBy: 'Đạt',
            },

            {
                id: '7',
                email: 'VietDH16022000@gmail.com',
                name: 'Đặng Hoàng Việt',
                startTime: '2022/07/12',
                endTime: '2022/07/26',
                days: '14',
                type: 'Sick Leave',
                applied: '2022/07/09',
                reason: 'kaksdkaskdaskdaskdkasdkasdksakdaskdasd',
                aprrovedBy: 'Đạt',
                avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg',
                status: 'Pending',
                rejectReason: 'bla bla bla bla',
                rejectBy: 'Đạt',
            },

            {
                id: '9',
                email: 'VietDH16022000@gmail.com',
                name: 'Đặng Hoàng Việt',
                startTime: '2022/07/12',
                endTime: '2022/07/26',
                days: '14',
                type: 'Sick Leave',
                applied: '2022/07/09',
                reason: 'kaksdkaskdaskdaskdkasdkasdksakdaskdasd',
                aprrovedBy: 'Đạt',
                avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg',
                status: 'Pending',
                rejectReason: 'bla bla bla bla',
                rejectBy: 'Đạt',
            },

            {
                id: '11',
                email: 'VietDH16022000@gmail.com',
                name: 'Đặng Hoàng Việt',
                startTime: '2022/07/12',
                endTime: '2022/07/26',
                days: '14',
                type: 'Sick Leave',
                applied: '2022/07/09',
                reason: 'kaksdkaskdaskdaskdkasdkasdksakdaskdasd',
                aprrovedBy: 'Đạt',
                avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg',
                status: 'Pending',
                rejectReason: 'bla bla bla bla',
                rejectBy: 'Đạt',
            },
        ]

        return ApplyLeaveList.map((item, index) => ({
            ...item,
            reason: (
                <Tooltip title={item.reason}>
                    <div>{item.reason.length > 5 ? item.reason.slice(0, 5) + '...' : item.reason}</div>
                </Tooltip>
            ),
            file: (
                <a className="mt-2 text-blue-400 underline" href={item.linkFile} target="_blank">
                    Link
                </a>
            ),
            days: calculateDays(item.startDate, item.endDate),
            type: item.leaveType,
            leavePeriod: formatDate(item.startDate) + ' - ' + formatDate(item.endDate),
            applied: formatDate(item.submitDate),
            info: (
                <div className="flex gap-2 items-center ">
                    {' '}
                    {/* Added the class 'align-center' for centering */}
                    <p className="font-bold">{item.employeeName}</p>
                </div>
            ),
            number: index + 1,
            action: (
                <div className="flex gap-2">
                    <div className="border-[1px] border-green-500 text-green-500 px-4 py-1 rounded-3xl hover:bg-green-500 hover:text-white">
                        <LoadingButton
                            type="submit"
                            loading={loadingButton}
                            sx={{
                                textAlign: 'center',
                                color: 'rgb(34 197 94)',
                                '&:hover': {
                                    color: 'white',
                                },
                            }}
                            autoFocus
                            onClick={() => handleClickApprove(item)}
                        >
                            Approve
                        </LoadingButton>
                    </div>
                    <div className="border-[1px] border-red-500 text-red-500 px-4 py-1 rounded-3xl hover:bg-red-500 hover:text-white">
                        <LoadingButton
                            type="submit"
                            loading={loadingRJButton}
                            sx={{
                                textAlign: 'center',
                                color: 'rgb(239 68 68)',
                                '&:hover': {
                                    color: 'white',
                                },
                            }}
                            autoFocus
                            onClick={() => handleClickReject(item)}
                        >
                            Reject
                        </LoadingButton>
                    </div>
                </div>
            ),
            actionAll: (
                <Tooltip title="Delete">
                    <div>
                        <IconButton onClick={handleClickOpen}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Tooltip>
            ),
            status:
                item.status == 1 ? (
                    <p className="text-green-500">Approved</p>
                ) : item.status == 2 ? (
                    <p className="text-red-500">Reject</p>
                ) : (
                    <p className="text-yellow-500">Pending</p>
                ),
        }))
    }

    const rows = createRows()

    const tabsData = [
        {
            label: `Pending Leave`,
            view: searchData(
                loading == true ? (
                    <TableLoadData columns={columnsPending} tableHeight={540} />
                ) : (
                    <TableData
                        tableHeight={480}
                        rows={rows}
                        columns={columnsPending}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )
            ),
        },
        {
            label: `Approved Leave`,
            view: searchData(
                loading == true ? (
                    <TableLoadData columns={columnsPending} tableHeight={540} />
                ) : (
                    <TableData
                        tableHeight={480}
                        rows={rows}
                        columns={columnsApprove}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )
            ),
        },
        {
            label: `Reject Leave`,
            view: searchData(
                loading == true ? (
                    <TableLoadData columns={columnsPending} tableHeight={540} />
                ) : (
                    <TableData
                        tableHeight={480}
                        rows={rows}
                        columns={columnsReject}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )
            ),
        },
        {
            label: `All Leaves`,
            view: searchData(
                loading == true ? (
                    <TableLoadData columns={columnsPending} tableHeight={540} />
                ) : (
                    <TableData
                        tableHeight={480}
                        rows={rows}
                        columns={columnsAll}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )
            ),
        },
    ]
    return (
        <div>
            <NavbarHR />
            <PopupConfirm open={open} clickOpenFalse={clickOpenFalse} />
            <div className="sm:ml-64 pt-20 h-screen bg-gray-50">
                <div className="px-12 py-6">
                    <h2 className="font-bold text-3xl mb-4">Manage Leave List </h2>
                    <div className="mb-8 font-semibold">
                        <IconBreadcrumbs data={dataBreadcrumbs} />
                    </div>
                    <div className="bg-white">
                        <TabsData data={tabsData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
