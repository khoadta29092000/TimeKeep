import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const GetEmployeeApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/Employees`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const GetEmployeeByIdApi = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/Employees/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const PostEmployeeApi = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/Employees`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export const PutEmployeeApi = async (body) => {
    try {
        const response = await axios.put(`${API_URL}/Employees`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export const DeleteEmployeeApi = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Employees/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export default GetEmployeeApi
