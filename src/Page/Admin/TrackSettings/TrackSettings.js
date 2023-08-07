import React, { useState } from 'react'

//mui

//icon
import DashboardIcon from '@mui/icons-material/Dashboard'
import BadgeIcon from '@mui/icons-material/Badge'

//component
import IconBreadcrumbs from '../../../Components/Breadcrumbs'
import Navbar from '../Navbar'
import { Checkbox } from '@mui/material'

const breadcrumbIcons = () => {
    const data = [
        { title: 'Dashboard', icon: <DashboardIcon />, url: '/', status: true },
        { title: 'Track Settings', icon: <BadgeIcon />, url: '/Employee', status: false },
    ]
    return data
}

const dataBreadcrumbs = breadcrumbIcons()

export default function TrackSettings() {
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [checkedItems, setCheckedItems] = useState({})
    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [id]: checked,
        }))
    }
    console.log('che', checkedItems)
    return (
        <div>
            <Navbar />
            <div className="sm:ml-64 pt-20 h-screen bg-gray-50">
                <div className="px-12 py-6">
                    <h2 className="font-bold text-3xl mb-4">Track Settings</h2>
                    <div className="w-full mb-8 flex font-semibold items-center">
                        <IconBreadcrumbs data={dataBreadcrumbs} />
                    </div>
                    <div className="grid grid-cols-2 grid-rows-5 ">
                        <div className="bg-white col-span-1 row-span-2 p-4">
                            <h2 className="text-lg">Work Day Settings</h2>
                            <h2 className="text-gray-600 mb-5">Choose work days</h2>
                            <div className="grid grid-cols-3 gap-5">
                                {day.map((item, index) => {
                                    return (
                                        <div
                                            className="border-[1px] rounded-lg bg-gray-50  flex items-center"
                                            key={index}
                                        >
                                            <Checkbox
                                                id={item}
                                                //checked={false}
                                                onChange={handleCheckboxChange}
                                            />
                                            <p>{item}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
