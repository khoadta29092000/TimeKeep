import React, { useState } from 'react'

//date-picker-range
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
//mui
import { Button, Stack, Avatar, Autocomplete, TextField } from '@mui/material'

//icon
import FilterListIcon from '@mui/icons-material/FilterList'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BadgeIcon from '@mui/icons-material/Badge'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

//component
import IconBreadcrumbs from '../../../Components/Breadcrumbs'
import Navbar from '../Navbar'
import PopupData from '../../../Components/Popup'
import { formattedDate } from '../../../Hook/useFormatDate'

//style
import './Style.css'

const breadcrumbIcons = () => {
    const data = [
        { title: 'Dashboard', icon: <DashboardIcon />, url: '/', status: true },
        { title: 'Time Sheet', icon: <BadgeIcon />, url: '/Employee', status: false },
    ]
    return data
}

const dataBreadcrumbs = breadcrumbIcons()

const dataList = [
    {
        name: 'Việt',
        working: [
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '3:00' },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '0:00' },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '0:00' },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '0:00' },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '3:00' },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '0:00' },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '3:00' },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '0:00' },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '0:00' },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '3:00' },
        ],
    },
    {
        name: 'Đạt',
        working: [
            { out: '00:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '0:00' },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: '2023/08/12', overTime: '3:00' },
        ],
    },
]

export default function TimeSheet() {
    const [open, setOpen] = useState()
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })

    const handleDateRangeChange = (ranges) => {
        setSelectedDateRange(ranges.selection)
    }

    const clickOpenFalse = (event) => {
        setOpen(false)
        setSelectedDateRange({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        })
    }
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClickSave = () => {
        setOpen(false)
    }
    const topName = ['khoa', 'việt', 'tài']
    const viewModalContent = (
        <DateRangePicker ranges={[selectedDateRange]} onChange={handleDateRangeChange} minDate={new Date()} />
    )
    const viewModalAction = (
        <Button autoFocus onClick={handleClickSave}>
            Save changes
        </Button>
    )
    console.log('selectedDateRange', selectedDateRange)
    return (
        <div>
            <PopupData
                open={open}
                clickOpenFalse={clickOpenFalse}
                viewTitle="Pick Date"
                viewContent={viewModalContent}
                viewAction={viewModalAction}
            />
            <Navbar />
            <div className="sm:ml-64 h-screen pt-20 bg-gray-50">
                <div className="px-12 py-6">
                    <h2 className="font-bold text-3xl mb-4">Time Sheet List </h2>
                    <div className="mb-8 font-semibold">
                        <IconBreadcrumbs data={dataBreadcrumbs} />
                    </div>
                    <div className="bg-white p-4">
                        <div className="mb-5 md:flex items-center">
                            <Stack direction="row" spacing={2}>
                                <Button
                                    onClick={handleClickOpen}
                                    variant="outlined"
                                    sx={{
                                        color: 'black',
                                        borderColor: '#f3f4f6',
                                        borderRadius: '200px',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            color: '#2196f3',
                                        },
                                    }}
                                    startIcon={<EventAvailableIcon />}
                                >
                                    {selectedDateRange.startDate.getTime() == selectedDateRange.endDate.getTime()
                                        ? formattedDate(selectedDateRange.startDate)
                                        : formattedDate(selectedDateRange.startDate) +
                                          ' - ' +
                                          formattedDate(selectedDateRange.endDate)}
                                </Button>
                            </Stack>
                            <div className="ml-auto my-4 md:my-0 flex items-center gap-4 mr-4">
                                <Button variant="contained" size="small" startIcon={<FileDownloadIcon />}>
                                    Export
                                </Button>
                                <FilterListIcon className="" />
                            </div>
                        </div>
                        <div className="my-4">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={topName}
                                size="small"
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} label="Search Employee" />}
                            />
                        </div>
                        <div className="overflow-x-auto ">
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr className="border-b-2 text-gray-400">
                                        <th className="font-normal pb-5 px-2 border-r-2 uppercase w-[200px] text-left">
                                            Employee
                                        </th>
                                        <th className="font-normal pb-5 border-r-2 uppercase w-[700px]">
                                            {/* Content for the middle column header */}
                                            {selectedDateRange.startDate.getTime() ===
                                            selectedDateRange.endDate.getTime()
                                                ? formattedDate(selectedDateRange.startDate)
                                                : formattedDate(selectedDateRange.startDate) +
                                                  ' - ' +
                                                  formattedDate(selectedDateRange.endDate)}
                                        </th>
                                        <th className="font-normal pb-5 px-2 uppercase w-[200px] text-left">
                                            TOTAL WORK SUMMARY
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="py-5 border-r-2 px-2">
                                                    <div className="flex gap-2 items-center ">
                                                        <Avatar
                                                            src={item.avatar}
                                                            alt={item.name}
                                                            sx={{ width: 40, height: 40 }}
                                                        />
                                                        <p className="">{item.name}</p>
                                                    </div>
                                                </td>
                                                <td id="scroll" className="py-5 px-2 border-r-2">
                                                    <div className="scrollbar pb-5 overflow-x-auto">
                                                        <div className="flex gap-5">
                                                            {item.working.map((working, index) => {
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        id="cha"
                                                                        className="min-w-[190px] border-[2px] border-red-300 border-dashed truncate"
                                                                    >
                                                                        <div className="flex mx-2 mt-1">
                                                                            <div>Jun</div>
                                                                            <div className="text-gray-400 ml-auto">
                                                                                23
                                                                            </div>
                                                                        </div>
                                                                        <div className="transition ease-in-out hover:scale-110 m-2 delay-150 py-1 px-2 bg-red-100">
                                                                            <div className="flex items-center">
                                                                                <div className="text-gray-400 font-medium">
                                                                                    {working.in}
                                                                                </div>
                                                                                <div
                                                                                    id="in"
                                                                                    className="uppercase text-xs text-gray-400 ml-auto"
                                                                                >
                                                                                    in
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center">
                                                                                <div className="text-gray-400 font-medium">
                                                                                    {working.out}
                                                                                </div>
                                                                                <div
                                                                                    id="out"
                                                                                    className="uppercase text-xs text-gray-400 ml-auto"
                                                                                >
                                                                                    out
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center">
                                                                                <div className="text-gray-400 font-medium">
                                                                                    {working.work}
                                                                                </div>
                                                                                <div
                                                                                    id="work"
                                                                                    className="uppercase text-xs text-gray-400 ml-auto"
                                                                                >
                                                                                    work
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center">
                                                                                <div className="text-gray-400 font-medium">
                                                                                    {working.active}
                                                                                </div>
                                                                                <div
                                                                                    id="active"
                                                                                    className="uppercase text-xs text-gray-400 ml-auto"
                                                                                >
                                                                                    active
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-5 px-2 min-w-[300px]">
                                                    <div
                                                        id="total"
                                                        className="transition ease-in-out hover:scale-110 m-2 w-[200px] delay-150 py-1 px-2 bg-yellow-100"
                                                    >
                                                        <div className="flex items-center">
                                                            <div className="text-gray-400 font-medium">00hh 00mm</div>
                                                            <div
                                                                id="out"
                                                                className="uppercase text-xs text-gray-400 ml-auto"
                                                            >
                                                                Worked hour
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="text-gray-400 font-medium">00hh 00mm</div>
                                                            <div
                                                                id="in"
                                                                className="uppercase text-xs text-gray-400 ml-auto"
                                                            >
                                                                Active time
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="text-gray-400 font-medium">00hh 00mm</div>
                                                            <div
                                                                id="work"
                                                                className="uppercase text-xs text-gray-400 ml-auto"
                                                            >
                                                                Worked days
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
