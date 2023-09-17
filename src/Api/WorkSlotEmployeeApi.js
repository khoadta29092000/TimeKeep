import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL



export const GetWorkedSlotByIdEmployeeApi = async (id) => {
    try {
        const response = await axios.get(
            `${API_URL}/WorkSlotEmployee/get-workslot-employee-by-employee-id?employeeId=${id}`
        )
        return response.data
    } catch (error) {
        throw error
    }
}