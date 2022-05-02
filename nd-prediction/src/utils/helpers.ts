import { setUser } from '../store/slice/authSlice';
import { CurrentSituation } from '../types/weather';
import { getUserRequest } from './auhtApi';
import { getCurrentSituationRequest } from './weatherApi';
import axios from 'axios';
import { Location } from 'react-router-dom';


export type fetchCurrentSituationParams = {
    setIsFetching: (isFetching: boolean)=>void, 
    setCurrentSituation: (currentSituation: CurrentSituation) => void, 
    setError: (error: string|null)=>void
}


export const fetchCurrentSituation = async ({setIsFetching, setCurrentSituation, setError} : fetchCurrentSituationParams) => {
    setIsFetching(true);
    try {
      const token = localStorage.getItem("token");
      const situation = await getCurrentSituationRequest(token as string);
      setCurrentSituation(situation.data);
    } catch (error) {
      console.error(error);
      setError(error as string);
    } finally {
        setIsFetching(false);
    }
  };


export const checkUser = async (dispatch: any, navigate: any, pathname: string) => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const user = await getUserRequest(token)
            dispatch(setUser(user.data))
            if (["/login", "/registration"].includes(pathname)) {
                navigate('/')
            }
        } catch (error) {
            if (axios.isAxiosError(error) && (error.response && error.response.status === 401)) {
                navigate('/login')            
            }
            console.error(error)
        }
    } 
    else {
        navigate("/login")
    }
}