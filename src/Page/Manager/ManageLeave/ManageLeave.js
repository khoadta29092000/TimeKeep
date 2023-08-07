import React, { useState } from 'react'
import Navbar from '../Navbar'
import { NavLink } from 'react-router-dom'

//Mui
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Avatar } from '@mui/material'

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
import { formatDate } from '../../../Hook/useFormatDate'

const columnsPending = [
    { id: 'number', label: 'Number', minWidth: 50, align: 'center' },
    { id: 'info', label: 'Employee Name', minWidth: 250, align: 'left' },
    { id: 'leavePeriod', label: 'Leave Period', minWidth: 250, align: 'left' },
    { id: 'days', label: 'Days', minWidth: 100, align: 'center' },
    { id: 'type', label: 'Type', minWidth: 100, align: 'left' },
    { id: 'applied', label: 'Applied On', minWidth: 50, align: 'center' },
    { id: 'reason', label: 'Reason', minWidth: 50, align: 'center' },
    { id: 'action', label: 'Actions', minWidth: 50, maxWidth: 50, align: 'left' },
]

const columnsApprove = [
    { id: 'number', label: 'Number', minWidth: 50, align: 'center' },
    { id: 'info', label: 'Employee Name', minWidth: 250, align: 'left' },
    { id: 'leavePeriod', label: 'Leave Period', minWidth: 250, align: 'left' },
    { id: 'days', label: 'Days', minWidth: 100, align: 'left' },
    { id: 'type', label: 'Type', minWidth: 100, align: 'center' },
    { id: 'applied', label: 'Applied On', minWidth: 50, align: 'center' },
    { id: 'aprrovedBy', label: 'Aprroved By', minWidth: 50, align: 'center' },
    { id: 'reason', label: 'Reason', minWidth: 50, align: 'center' },
]
const columnsReject = [
    { id: 'number', label: 'Number', minWidth: 50, align: 'center' },
    { id: 'info', label: 'Employee Name', minWidth: 250, align: 'left' },
    { id: 'leavePeriod', label: 'Leave Period', minWidth: 250, align: 'left' },
    { id: 'days', label: 'Days', minWidth: 100, align: 'center' },
    { id: 'type', label: 'Type', minWidth: 100, align: 'left' },
    { id: 'applied', label: 'Applied On', minWidth: 50, align: 'center' },
    { id: 'aprrovedBy', label: 'Reject By', minWidth: 50, align: 'center' },
    { id: 'reason', label: 'Reason', minWidth: 50, align: 'center' },
]
const columnsAll = [
    { id: 'number', label: 'Number', minWidth: 50, align: 'center' },
    { id: 'info', label: 'Employee Name', minWidth: 250, align: 'left' },
    { id: 'leavePeriod', label: 'Leave Period', minWidth: 250, align: 'left' },
    { id: 'days', label: 'Days', minWidth: 100, align: 'center' },
    { id: 'type', label: 'Type', minWidth: 100, align: 'left' },
    { id: 'applied', label: 'Applied On', minWidth: 50, align: 'center' },
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
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [search, setSearch] = useState('')
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
                    <div className="ml-auto md:mr-4 mr-4">
                        <FilterListIcon className="" />
                    </div>
                </div>
                {data}
            </div>
        )
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

        return data.map((item, index) => ({
            ...item,
            reason: (
                <Tooltip title={item.reason}>
                    {item.reason.length > 5 ? item.reason.slice(0, 5) + '...' : item.reason}
                </Tooltip>
            ),
            leavePeriod: formatDate(item.startTime) + ' - ' + formatDate(item.endTime),
            applied: formatDate(item.applied),
            info: (
                <div className="flex gap-2 items-center ">
                    {' '}
                    {/* Added the class 'align-center' for centering */}
                    <Avatar src={item.avatar} alt={item.name} style={{ width: 40, height: 40 }} />
                    <p className="font-bold">{item.name}</p>
                </div>
            ),
            number: index + 1,
            action: (
                <div className="flex gap-2">
                    <button className="border-[1px] border-green-500 text-green-500 px-4 py-1 rounded-3xl hover:bg-green-500 hover:text-white">
                        Approve
                    </button>
                    <button className="border-[1px] border-red-500 text-red-500 px-4 py-1 rounded-3xl hover:bg-red-500 hover:text-white">
                        Reject
                    </button>
                </div>
            ),
            actionAll: (
                <Tooltip onClick={handleClickOpen} title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ),
            status: (
                <Tooltip
                    title={
                        item.status == 'True'
                            ? `Approved by ${item.aprrovedBy}`
                            : item.status == 'False'
                            ? `Reject by ${item.rejectBy}`
                            : `Pending...`
                    }
                >
                    {item.status == 'True' ? (
                        <p className="text-green-500">{item.status}</p>
                    ) : item.status == 'False' ? (
                        <p className="text-red-500">{item.status}</p>
                    ) : (
                        <p className="text-yellow-500">{item.status}</p>
                    )}
                </Tooltip>
            ),
        }))
    }

    const rows = createRows()

    const tabsData = [
        {
            label: 'Pending Leave',
            view: searchData(
                <TableData
                    tableHeight={500}
                    rows={rows}
                    columns={columnsPending}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            ),
        },
        {
            label: 'Approved Leave',
            view: searchData(
                <TableData
                    tableHeight={500}
                    rows={rows}
                    columns={columnsApprove}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            ),
        },
        {
            label: 'Reject Leave',
            view: searchData(
                <TableData
                    tableHeight={500}
                    rows={rows}
                    columns={columnsReject}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            ),
        },
        {
            label: 'All Leaves',
            view: searchData(
                <TableData
                    tableHeight={500}
                    rows={rows}
                    columns={columnsAll}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            ),
        },
    ]
    return (
        <div>
            <Navbar />
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
