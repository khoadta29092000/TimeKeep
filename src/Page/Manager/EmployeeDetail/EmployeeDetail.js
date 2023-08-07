import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

//icon
import DashboardIcon from '@mui/icons-material/Dashboard'
import BadgeIcon from '@mui/icons-material/Badge'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import KeyIcon from '@mui/icons-material/Key'
import EventNoteIcon from '@mui/icons-material/EventNote'

//component
import IconBreadcrumbs from '../../../Components/Breadcrumbs'
import TabsData from '../../../Components/Tabs'
import General from './General'
import TimeEntries from './TimeEntries'

const breadcrumbIcons = () => {
    const data = [
        { title: 'Dashboard', icon: <DashboardIcon />, url: '/', status: true },
        { title: 'Employee', icon: <BadgeIcon />, url: '/Employee', status: true },
        { title: 'Detail', icon: <BadgeIcon />, url: '/Employee', status: false },
    ]
    return data
}

const dataBreadcrumbs = breadcrumbIcons()

export default function EmployeeDetail() {
    const tabsData = [
        {
            label: 'General',
            icon: <AccountBoxIcon />,
            view: <General />,
        },
        // {
        //     label: "Change Password", icon: <KeyIcon />, view: <div className='bg-white flex gap-10'>

        //     </div>
        // },
        {
            label: 'Time Entries',
            icon: <EventNoteIcon />,
            view: <TimeEntries />,
        },
    ]
    return (
        <div>
            <Navbar />
            <div className="sm:ml-64 pt-20 h-screen bg-gray-50">
                <div className="px-12 py-6">
                    <h2 className="font-bold text-3xl mb-4">Detail</h2>
                    <div className="mb-8 font-semibold">
                        <IconBreadcrumbs data={dataBreadcrumbs} />
                    </div>
                    <TabsData data={tabsData} />
                </div>
            </div>
        </div>
    )
}
