import React, { useEffect, useState } from 'react'
import BadgeIcon from '@mui/icons-material/Badge'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material'
import Settings from '@mui/icons-material/Settings'
import { Link, NavLink } from 'react-router-dom'
import TuneIcon from '@mui/icons-material/Tune'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import KeyIcon from '@mui/icons-material/Key'
import General from '../Manager/EmployeeDetail/General'
import ChangePassword from '../Manager/Profile/ChangePassword'
import TabsData from '../../Components/Tabs'
import PopupData from '../../Components/Popup'
const tabsData = [
    {
        label: 'General',
        icon: <AccountBoxIcon />,
        view: <General />,
    },
    {
        label: 'Change Password',
        icon: <KeyIcon />,
        view: <ChangePassword />,
    },
    // {
    //     label: 'Time Entries',
    //     icon: <EventNoteIcon />,
    //     view: <TimeEntries />,
    // },
]
export default function NavbarAdmin() {
    const [openModal, setOpenModal] = useState(false)
    const clickOpenFalse = (event) => {
        setOpenModal(false)
    }
    const handleClickOpenAdd = () => {
        setOpenModal(true)
    }
    const [anchorEl, setAnchorEl] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const open = Boolean(anchorEl)
    const userStringRole = localStorage.getItem('role')
    const role = JSON.parse(userStringRole)
    const userStringAvatar = localStorage.getItem('avatar')
    const avatar = JSON.parse(userStringAvatar)
    const userStringEmployeeName = localStorage.getItem('employeeName')
    const employeeName = JSON.parse(userStringEmployeeName)
    const userString = localStorage.getItem('role')
    const userObject = JSON.parse(userString)
    useEffect(() => {
        if (userObject && userObject == 'Manager') {
            history.push('/Manager/Employee')
        } else if (userObject && userObject == 'User') {
            history.push('/Employee/Dashboard')
        } else if (userObject && userObject == 'HR') {
            history.push('/Hr/ManageLeave')
        } else if (userObject && userObject == 'Admin') {
        } else {
            history.push('')
        }
    }, [])
    let history = useHistory()
    const handleCloseOut = () => {
        setAnchorEl(null)
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        localStorage.removeItem('employeeId')
        history.push('/')
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }
    const handleClickOut = (event) => {
        // Check if the click event target is not inside the modal content (the modal itself)
        if (!event.target.closest('.bg-white')) {
            handleModalClose() // Close the modal when clicking outside
        }
    }
    let MobiUi = (
        <>
            <div onClick={handleClickOut} className="fixed  top-0 left-0 z-40 w-full h-full flex  bg-overlay">
                <div className="bg-white w-48 mt-12 rounded-lg  h-screen overflow-y-auto dark:bg-gray-800">
                    <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
                    <button
                        onClick={handleModalClose}
                        type="button"
                        data-drawer-hide="drawer-navigation"
                        aria-controls="drawer-navigation"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    <ul className="space-y-2 font-medium cursor-pointer">
                        {/* <li className="cursor-pointer p-2">
                            <Link
                                to="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                            >
                                <DashboardIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li> */}
                        <li className="cursor-pointer p-2">
                            <Link
                                to="/Admin/Team"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                            >
                                <GroupOutlinedIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Department</span>
                            </Link>
                        </li>
                        <li className="cursor-pointer p-2">
                            <Link
                                to="/Admin/Employee"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                            >
                                <BadgeIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Employee</span>
                            </Link>
                        </li>
                        {/* <li className="cursor-pointer p-2">
                            <Link
                                to="/Admin/RiskEmployeeSettings"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                            >
                                <NotificationsNoneOutlinedIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Risk Settings</span>
                            </Link>
                        </li> */}
                        <li className="cursor-pointer p-2">
                            <Link
                                to="/Admin/TrackSettings"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                            >
                                <TuneIcon className="rotate-90 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Track Settings</span>
                            </Link>
                        </li>
                        {/* <li className="cursor-pointer p-2">
                            <Link
                                to="/Admin/LeaveSettings"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                            >
                                <AutoAwesomeOutlinedIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Leave Settings</span>
                            </Link>
                        </li> */}
                        <li className="cursor-pointer p-2">
                            <Link
                                to="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                            >
                                <LogoutIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
    let viewModalContent = <TabsData data={tabsData} />
    return (
        <div>
            <PopupData
                size={'lg'}
                viewTitle="Profile"
                open={openModal}
                clickOpenFalse={clickOpenFalse}
                viewContent={viewModalContent}
            />
            {isModalOpen && MobiUi}
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={handleModalOpen}
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <Link to="/" className="flex ml-2 md:mr-24 cursor-pointer">
                                <img
                                    src="https://t4.ftcdn.net/jpg/03/14/20/15/360_F_314201503_drLthBSHdqSBwBOGo8AHreHIGnfLEUJi.jpg"
                                    className="h-12 mr-3"
                                    alt="FlowBite Logo"
                                />
                                <span className="self-center text-lg font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    Time Keeping
                                </span>
                            </Link>
                            <div className="hidden lg:block ">
                                <label htmlFor="topbar-search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative mt-1 lg:w-96">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="email"
                                        id="topbar-search"
                                        className="bg-gray-50 outline-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Search Page"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 48, height: 48 }}>{avatar && avatar.charAt(0)}</Avatar>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <div className="grid grid-rows-2 px-5 py-2 cursor-default">
                                        <p>{employeeName && employeeName}</p>
                                        <strong>({role && role})</strong>
                                    </div>
                                    <hr className="mb-2" />

                                    <MenuItem>
                                        <NavLink to="/Profile" className="flex items-center">
                                            {' '}
                                            <Avatar /> Profile
                                        </NavLink>
                                    </MenuItem>
                                    <Divider />

                                    <MenuItem onClick={handleCloseOut}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className=" fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li className="m-4">
                            <button
                                onClick={handleClickOpenAdd}
                                className="flex gap-5 bg-gray-100 py-3 px-4 rounded-xl w-full"
                            >
                                <div className="w-full text-center">
                                    <strong>{employeeName && employeeName}</strong>
                                    <div className="mx-auto text-center">({role && role})</div>
                                </div>
                            </button>
                        </li>
                        {/* <li className="cursor-pointer text-center mx-auto justify-center items-center">
                            <Link
                                to="/"
                                className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                            >
                                <DashboardIcon className=" ml-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="ml-3 text-lg">Dashboard</span>
                            </Link>
                        </li> */}
                        <li className="cursor-pointer text-center mx-auto justify-center items-center">
                            <NavLink
                                to="/Admin/Team"
                                className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                                activeStyle={{
                                    background: '#dbeafe',
                                }}
                            >
                                <GroupOutlinedIcon className="ml-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="ml-3">Department</span>
                            </NavLink>
                        </li>
                        <li className="cursor-pointer text-center mx-auto justify-center items-center">
                            <NavLink
                                to="/Admin/Employee"
                                className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                                activeStyle={{
                                    background: '#dbeafe',
                                }}
                            >
                                <BadgeIcon className="ml-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="ml-3">Employee</span>
                            </NavLink>
                        </li>
                        {/* <li className="cursor-pointer text-center mx-auto justify-center items-center">
                            <NavLink
                                to="/Admin/RiskEmployeeSettings"
                                className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                                activeStyle={{
                                    background: '#dbeafe',
                                }}
                            >
                                <NotificationsNoneOutlinedIcon className="ml-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="ml-3">Risk Settings</span>
                            </NavLink>
                        </li> */}
                        <li className="cursor-pointer text-center mx-auto justify-center items-center">
                            <NavLink
                                to="/Admin/TrackSettings"
                                className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                                activeStyle={{
                                    background: '#dbeafe',
                                }}
                            >
                                <TuneIcon className="rotate-90 ml-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="ml-3">Track Settings</span>
                            </NavLink>
                        </li>
                        {/* <li className="cursor-pointer text-center mx-auto justify-center items-center">
                            <NavLink
                                to="/Admin/LeaveSettings"
                                className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
                                activeStyle={{
                                    background: '#dbeafe',
                                }}
                            >
                                <AutoAwesomeOutlinedIcon className="rotate-90 ml-7 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " />
                                <span className="ml-3">Leave Settings</span>
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </aside>
        </div>
    )
}
