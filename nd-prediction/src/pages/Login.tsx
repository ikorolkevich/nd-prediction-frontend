import React, { useState, useEffect } from "react";

import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import logo from "../images/forest5.png";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { LoginRequestData } from "../types/auth";
import { getTokenRequest, getUserRequest } from "../utils/auhtApi";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/slice/authSlice";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkUser } from '../utils/helpers';

const Login = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginRequestData>();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [error, setError] = useState<string | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(()=>{
    checkUser(dispatch, navigate, location.pathname)
  }, [])

  const onSubmit: SubmitHandler<LoginRequestData> = async (data) => {
    setError(null)
    setIsFetching(true)
    try {
      const token = await getTokenRequest(data);
      if (token.data.access_token) {
          dispatch(setToken(token.data.access_token))
          const user = await getUserRequest(token.data.access_token)
          dispatch(setUser(user.data))
          navigate('/')
      } else {
        setError('Неверный формат')
      }
    } catch (error) {
      if (axios.isAxiosError(error) && (error.response && error.response.status === 400)) {
        setError('Неверный эл. адрес и/или пароль')
      } else {
        console.error(error);
      }
    }
    setIsFetching(false)
  };

  return (
    <Grid xs={12} container sx={{ height: "100vh" }}>
      <Grid
        item
        md={6}
        sx={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" },
        }}
      ></Grid>
      <Grid
        xs={12}
        md={6}
        sm={12}
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
        direction={"column"}
        sx={{ height: "100vh" }}
        container
        component={Paper}
        elevation={6}
        square
      >
        <Box width={'50%'} p={5}>
          <Typography></Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              rules={{
                required: "Поле не может быть пустым",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Неверный адрес",
                },
              }}
              name="username"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  hiddenLabel
                  variant="outlined"
                  size="small"
                  label="Эл. Почта"
                  margin="normal"
                  fullWidth={true}
                  error={error?.message !== undefined}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              rules={{
                required: "Поле не может быть пустым",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                  message:
                    "Пароль должен составлять от 8 до 15 символов, содержать по крайней мере одну строчную букву, одну прописную букву, одну цифру и один специальный символ",
                },
              }}
              name="password"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  hiddenLabel
                  variant="outlined"
                  size="small"
                  label="Пароль"
                  margin="normal"
                  fullWidth={true}
                  type="password"
                  error={error?.message !== undefined}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
            <Box mt={5} mb={2}>
              <Button variant="contained" type="submit" fullWidth={true} disabled={isFetching}>
                Войти
              </Button>
            </Box>
          </form>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/registration" variant="body2">
                {"Еще не зарегистрированы? Создать аккаунт"}
              </Link>
            </Grid>
          </Grid>
          {error && (
            <Box width={'100%'} my={2}>
            <Alert variant="filled" severity="error">
                {error}
            </Alert>
        </Box>
        )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
