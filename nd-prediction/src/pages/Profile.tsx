import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  List,
  ListItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/system";
import { Controller } from "react-hook-form";
import {
  UpdateEmailRequestData,
  UpdatePasswordRequestData,
} from "../types/auth";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import {
  getUserRequest,
  updateEmailRequest,
  updatePasswordRequest,
} from "../utils/auhtApi";
import { useSelector, useDispatch } from "react-redux";
import { logOut, selectUser, setUser } from "../store/slice/authSlice";
import { checkUser } from "../utils/helpers";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";

export type ProfileProps = {
  email: string;
};

const Profile: React.FC<ProfileProps> = (props) => {
  const [isEditEmail, setIsEditEmail] = useState<boolean>(false);
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false);

  const toggleEditEmail = () => {
    setIsEditEmail(!isEditEmail);
  };

  const toggleEditPassword = () => {
    setIsEditPassword(!isEditPassword);
  };

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const updateEmailForm = useForm<UpdateEmailRequestData>();
  const updatePasswordForm = useForm<UpdatePasswordRequestData>();

  const token = localStorage.getItem("token");

  useEffect(() => {
    checkUser(dispatch, navigate, location.pathname);
  }, []);

  const [emailUpdateError, setEmailUpdateError] = useState<string | null>(null);
  const [passwordUpdateError, setPasswordUpdateError] = useState<string | null>(
    null
  );

  const runLogOut = async () => {
    dispatch(logOut())
    navigate('/')
  }

  const onSubmitUpdateEmailForm: SubmitHandler<UpdateEmailRequestData> = async (
    data
  ) => {
    try {
      if (token) {
        await updateEmailRequest(token, data);
        const user = await getUserRequest(token);
        dispatch(setUser(user.data));
        setIsEditEmail(false);
        updateEmailForm.reset();
        setEmailUpdateError(null);
      } else {
        console.error("token not set");
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        setEmailUpdateError("Данный адрес эл. почты уже зарегистрирован");
      } else {
        console.error(error);
      }
    }
  };

  const onSubmitUpdatePasswordForm: SubmitHandler<
    UpdatePasswordRequestData
  > = async (data) => {
    try {
      if (token) {
        await updatePasswordRequest(token, data);
        const user = await getUserRequest(token);
        dispatch(setUser(user.data));
        setIsEditPassword(false);
        updatePasswordForm.reset();
        setPasswordUpdateError(null);
      } else {
        console.error("token not set");
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        setPasswordUpdateError("Ошибка изменения пароля");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item xs={12} md={4}>
        <Box my={3}>
          <Typography variant="h5">Учетная запись</Typography>
        </Box>
        <Box width={"100%"}>
          <Box width={"100%"} display={"flex"} flexDirection={"row"} my={2}>
            <Box px={1}>
              <PersonIcon />
            </Box>
            <Box px={1} display={"flex"} flexDirection={"column"}>
              <Box>
                <Typography variant="subtitle1">Электронная почта</Typography>
              </Box>
              <Box>
                <Typography>{user?.email}</Typography>
              </Box>
              {isEditEmail ? (
                <Box width={"100%"}>
                  <form
                    onSubmit={updateEmailForm.handleSubmit(
                      onSubmitUpdateEmailForm
                    )}
                  >
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
                      control={updateEmailForm.control}
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
                    <Button type="submit" fullWidth={true}>
                      Обновить
                    </Button>
                  </form>
                </Box>
              ) : (
                <Box>
                  <Typography
                    variant="body2"
                    onClick={toggleEditEmail}
                    component="span"
                    color={"secondary"}
                    style={{ cursor: "pointer" }}
                  >
                    Изменить эл. почту
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Divider />
          <Box width={"100%"} display={"flex"} flexDirection={"row"} my={2}>
            <Box px={1}>
              <LockIcon />
            </Box>
            <Box px={1} display={"flex"} flexDirection={"column"}>
              <Box>
                <Typography variant="subtitle1">Пароль</Typography>
              </Box>
              {isEditPassword ? (
                <Box width={"100%"}>
                  <form
                    onSubmit={updatePasswordForm.handleSubmit(
                      onSubmitUpdatePasswordForm
                    )}
                  >
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
                      control={updatePasswordForm.control}
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
                    <Button type="submit" fullWidth={true}>
                      Обновить
                    </Button>
                  </form>
                </Box>
              ) : (
                <Box>
                  <Typography
                    variant="body2"
                    color={"secondary"}
                    style={{ cursor: "pointer" }}
                    onClick={toggleEditPassword}
                  >
                    Изменить пароль
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Box width={"100%"} display={"flex"} flexDirection={"row"} my={5}>
            <Box px={1}>
              <LogoutIcon color="error" />
            </Box>
            <Box px={1} display={"flex"} flexDirection={"column"}>
              <Box>
                <Typography variant="subtitle1" component='div' style={{ cursor: "pointer" }} onClick={runLogOut}>
                  Выйти из системы
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {passwordUpdateError && (
          <Box width={"100%"} my={2}>
            <Alert variant="filled" severity="error">
              {passwordUpdateError}
            </Alert>
          </Box>
        )}
        {emailUpdateError && (
          <Box width={"100%"} my={2}>
            <Alert variant="filled" severity="error">
              {emailUpdateError}
            </Alert>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Profile;
