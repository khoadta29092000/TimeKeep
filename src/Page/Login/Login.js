import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

function Login() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [error, setError] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    let history = useHistory()
    const handleSubmit = () => {
        history.push('/Employee')
    }
    // const userString = localStorage.getItem("user");
    // const userObject = JSON.parse(userString);
    // useEffect(() => {

    //   if (userObject && userObject.role == "admin") {
    //     navigate("/admin")
    //   }
    //   if (userObject && userObject.role == "sale") {
    //     navigate("/product")
    //   }
    //   if (userObject && userObject.role == "cashier") {
    //     navigate("/SettingCashier")
    //   }

    // }, []);
    const dispatch = useDispatch()
    //const { user } = useSelector((state) => state.login)
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values, formikHelpers) => {
            history.push('/Employee')
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Please Enter your Username'),
            password: Yup.string().required('Please Enter your Password'),
        }),
    })

    return (
        <div className="md:grid grid-cols-2 bg-gray-50">
            <div className="md:shadow-2xl md:border-[1px] bg-[url('https://data.designervn.net/2019/09/9676_3c1b0f70d986fd4e324cb43331b33b81.png')]  m-12 rounded-2xl grid grid-rows-3 "></div>
            <section className="bg-gray-50 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to Time Keeping System
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required=""
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <Link
                                        to="/"
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{' '}
                                    <Link
                                        to="/"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
