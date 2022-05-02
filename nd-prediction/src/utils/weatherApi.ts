import axios from "axios";


export const getCurrentSituationRequest = async (token: string) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/weather/current_situation`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    })
}


export const getDynamicDataRequest = async (token: string) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/weather/ff_probabilities_dynamic`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    })
}


export const getWeatherDataRequest = async (token: string) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/weather`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    })
}