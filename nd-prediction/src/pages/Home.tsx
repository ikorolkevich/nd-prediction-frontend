import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import CompressIcon from "@mui/icons-material/Compress";
import GrainIcon from "@mui/icons-material/Grain";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import CircularProgressWithLabel from "../components/home/CircularProgressWithLabel";
import FixedSizeGrid from "../components/home/FixedSizeGrid";
import ChartSpline, { ChartSplineProps } from "../components/home/ChartSpline";
import {
  CURRENT_SITUATION,
  TEMPERATURE,
  HUMIDITY,
  WIND_SPEED,
  PRESSURE,
  DAYS_WITHOUT_RAIN,
  DYNAMIC_LINE,
} from "../constants/home";
import CurrentStatisticItem from "../components/home/CurrentStatisticItem";
import Item from "../components/basic/Item";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slice/authSlice";
import {
  getCurrentSituationRequest,
  getDynamicDataRequest,
  getWeatherDataRequest,
} from "../utils/weatherApi";
import { CurrentSituation, DynamicPoint, WeatherData } from "../types/weather";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "../components/basic/Loader";
import { fetchCurrentSituation, checkUser } from "../utils/helpers";

export type HomeProps = {
  width: string;
};

const Home: React.FC<HomeProps> = (props) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const [currentSituation, setCurrentSituation] =
    useState<CurrentSituation | null>(null);
  const [currentSituationError, setCurrentSituationError] = useState<
    string | null
  >(null);
  const [currentSituationIsFetching, setCurrentSituationIsFetching] =
    useState<boolean>(false);
  const [dynamicData, setDynamicData] = useState<Array<DynamicPoint> | null>(
    null
  );
  const [dynamicDataError, setDynamicDataError] = useState<string | null>(null);
  const [dynamicDataIsFetching, setDynamicDataIsFetching] =
    useState<boolean>(false);

  const [weatherData, setWeatherData] = useState<Array<WeatherData> | null>(
    null
  );
  const [weatherDataError, setWeatherDataError] = useState<string | null>(null);
  const [weatherDataIsFetching, setWeatherDataIsFetching] =
    useState<boolean>(false);

  useEffect(() => {
    checkUser(dispatch, navigate, location.pathname)
    fetchCurrentSituation({setIsFetching: setCurrentSituationIsFetching, setCurrentSituation, setError: setCurrentSituationError});
  }, []);

  // TODO 
  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        setDynamicDataIsFetching(true);
        const token = localStorage.getItem("token");
        const data = await getDynamicDataRequest(token as string);
        setDynamicData(data.data.dynamic_data);
        setDynamicDataIsFetching(false);
      } catch (error) {
        console.error(error);
        setDynamicDataError(error as string);
        setDynamicDataIsFetching(false);
      }
    };
    fetchDynamicData();
  }, []);


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setWeatherDataIsFetching(true);
        const token = localStorage.getItem("token");
        const data = await getWeatherDataRequest(token as string);
        setWeatherData(data.data.weather_data);
        setWeatherDataIsFetching(false);
      } catch (error) {
        console.error(error);
        setWeatherDataError(error as string);
        setWeatherDataIsFetching(false);
      }
    };
    fetchWeatherData();
  }, []);


  return (
    <Grid container spacing={2} width={props.width}>
      <Grid item md={4} xs={12}>
        <Item>
          <Box minHeight={450} width={"100%"}>
            <Box>
              <Typography variant="h5">{CURRENT_SITUATION}</Typography>
            </Box>
            {currentSituationError && (
              <Box m={5} p={5}>
                Что-то пошло не так...
              </Box>
            )}
            {currentSituation && (
              <Box m={2}>
                <CircularProgressWithLabel
                  value={currentSituation.fire_probability}
                />
                <CurrentStatisticItem
                  icon={<ThermostatIcon />}
                  value={`${currentSituation.temp} \u2103`}
                  title={TEMPERATURE}
                />
                <CurrentStatisticItem
                  icon={<OpacityIcon />}
                  value={`${currentSituation.humidity} %`}
                  title={HUMIDITY}
                />
                <CurrentStatisticItem
                  icon={<AirIcon />}
                  value={`${currentSituation.wind_speed} м/с`}
                  title={WIND_SPEED}
                />
                <CurrentStatisticItem
                  icon={<CompressIcon />}
                  value={`${currentSituation.pressure} мм.рт.ст.`}
                  title={PRESSURE}
                />
                <CurrentStatisticItem
                  icon={<GrainIcon />}
                  value={`${currentSituation.days_without_rain}`}
                  title={DAYS_WITHOUT_RAIN}
                />
              </Box>
            )}
            {currentSituationIsFetching && <Loader size={50} />}
          </Box>
        </Item>
      </Grid>
      <Grid item md={8} xs={12}>
        <Item>
          <Box minHeight={450} width={"100%"}>
            <Box>
              <Typography mx={1} variant="h5" noWrap={true}>
                {DYNAMIC_LINE}
              </Typography>
            </Box>
            {dynamicDataError && (
              <Box m={5} p={5}>
                Что-то пошло не так...
              </Box>
            )}

            {dynamicDataIsFetching && <Loader size={50} />}
            {dynamicData && (
              <Box>
                <ChartSpline
                  height={400}
                  data={dynamicData}
                  valueField={"value"}
                  argumentField={"dt"}
                />
              </Box>
            )}
          </Box>
        </Item>
      </Grid>
      <Grid item md={12} xs={12}>
        <Item>
        {weatherDataError && (
          <Box m={5} p={5}>
            Что-то пошло не так...
          </Box>
        )}
        {weatherDataIsFetching && <Loader size={50}/>}
        {weatherData && (
          <FixedSizeGrid rows={weatherData} />
        )}
        </Item>
      </Grid>
    </Grid>
  );
};

export default Home;
