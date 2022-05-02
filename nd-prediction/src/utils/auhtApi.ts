import axios from "axios";
import { LoginRequestData, RegistrationRequestData, UpdateEmailRequestData, UpdatePasswordRequestData } from "../types/auth";
import qs from 'qs';
import { Password } from "@mui/icons-material";


export const getTokenRequest = async (loginRequest: LoginRequestData) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/login`, qs.stringify(loginRequest), {
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}


export const getUserRequest = async (token: string) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    })
}


export const registrationRequest = async (registrationRequest: RegistrationRequestData) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, registrationRequest)
}


export const updateEmailRequest =async (token: string, updateEmailRequestData: UpdateEmailRequestData) => {
    return await axios.patch(`${process.env.REACT_APP_API_URL}/users/me`, updateEmailRequestData, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    })
}


export const updatePasswordRequest =async (token: string, updatePasswordRequestData: UpdatePasswordRequestData) => {
    return await axios.patch(`${process.env.REACT_APP_API_URL}/users/me`, updatePasswordRequestData, {
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    })
}