import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

//mui
import { FormControl, IconButton, InputLabel, TextField, InputAdornment, OutlinedInput, Button } from '@mui/material'

//icon
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function ChangePassword() {
    const [error, setError] = useState()
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const initialValues = {
        userName: 'VietDh21102000@gmail.com',
        oldPassword: '',
        confirmPassword: '',
        newPassword: '',
    }
    const frmUser = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            oldPassword: Yup.string().required(),
            newPassword: Yup.string().min(5, 'Too Short!').max(20, 'Too Long!').required(),
            confirmPassword: Yup.string()
                .required()
                .oneOf([Yup.ref('newPassword')], 'Password not same!'),
        }),
        onSubmit: (values) => {},
    })
    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show)
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show)
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return (
        <div className="bg-white h-[550px] p-4">
            <form onSubmit={frmUser.handleSubmit}>
                {error && <div className="text-center text-xl text-red-500 font-semibold mb-2">{error}</div>}
                <div className=" my-5">
                    {error && (
                        <div className="text mt-1 text-center text-xl text-red-600 my-3 font-semibold">{error}</div>
                    )}
                    <TextField
                        id="outlined-basic"
                        error={frmUser.touched.userName && frmUser.errors.userName ? true : undefined}
                        className="w-full"
                        name="userName"
                        disabled
                        onChange={frmUser.handleChange}
                        onBlur={frmUser.handleBlur}
                        label="Email"
                        variant="outlined"
                        value={initialValues.userName}
                    />
                </div>
                <div className="w-full mt-5 mb-1">
                    <FormControl
                        error={frmUser.touched.oldPassword && frmUser.errors.oldPassword ? true : undefined}
                        className="w-full"
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                        <OutlinedInput
                            className="w-full"
                            name="oldPassword"
                            id="outlined-adornment-password 1"
                            type={showOldPassword ? 'text' : 'password'}
                            onChange={frmUser.handleChange}
                            onBlur={frmUser.handleBlur}
                            label="Old Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowOldPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {frmUser.errors.oldPassword && frmUser.touched.oldPassword && (
                        <div className="text mt-1 text-red-600 font-semibold">{frmUser.errors.oldPassword}</div>
                    )}
                </div>
                <div className="w-full mt-5 mb-1">
                    <FormControl
                        error={frmUser.touched.newPassword && frmUser.errors.newPassword ? true : undefined}
                        className="w-full"
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            className="w-full"
                            name="newPassword"
                            id="outlined-adornment-password 2"
                            type={showNewPassword ? 'text' : 'password'}
                            onChange={frmUser.handleChange}
                            onBlur={frmUser.handleBlur}
                            label="New Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {frmUser.errors.newPassword && frmUser.touched.newPassword && (
                        <div className="text mt-1 text-red-600 font-semibold">{frmUser.errors.newPassword}</div>
                    )}
                </div>
                <div className="w-full mt-5 mb-5">
                    <FormControl
                        error={frmUser.touched.confirmPassword && frmUser.errors.confirmPassword ? true : undefined}
                        className="w-full"
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            className="w-full"
                            name="confirmPassword"
                            id="outlined-adornment-password 3"
                            type={showConfirmPassword ? 'text' : 'password'}
                            onChange={frmUser.handleChange}
                            onBlur={frmUser.handleBlur}
                            label="Confirm Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {frmUser.errors.confirmPassword && frmUser.touched.confirmPassword && (
                        <div className="text mt-1 text-red-600 font-semibold">{frmUser.errors.confirmPassword}</div>
                    )}
                </div>
                <Button className="float-right" variant="contained" type="submit">
                    Save
                </Button>
            </form>
        </div>
    )
}
