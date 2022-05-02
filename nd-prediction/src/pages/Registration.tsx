import React, { useState } from "react";

import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import logo from "../images/fores.png";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RegistrationRequestData } from "../types/auth";
import { registrationRequest } from "../utils/auhtApi";
import axios from "axios";

const Registration = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationRequestData>();
  
  const [error, setError] = useState<string | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const onSubmit: SubmitHandler<RegistrationRequestData> = async (data) => {
    setIsFetching(true)
    setError(null)
    setIsSuccess(false)
    try {
        await registrationRequest(data);
        setIsSuccess(true)
    } catch (error) {
        if ((axios.isAxiosError(error)) && ((error.response) && (error.response.status === 400))) {
            setError("Данный адрес эл. почты уже зарегистрирован")
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
        <Box width={"50%"} p={5}>
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
              name="email"
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
                Создать учетную запись
              </Button>
            </Box>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={"/login"} variant="body2">
                {"Уже зарегистрированы? Войти"}
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
        {isSuccess && (
            <Box width={'100%'} my={2}>
            <Alert variant="filled" severity="success">
                Учетная запись создана
            </Alert>
        </Box>
        )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Registration;
