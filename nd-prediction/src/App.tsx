import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LightAppbar from "./components/basic/LightAppbar";
import Box from "@mui/material/Box";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./store/slice/authSlice";

function App() {
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Box sx={{ width: "100%" }}>
      {user ? (
        <Box sx={{ flexGrow: 1 }}>
          <LightAppbar title="ND-Prediction System" />
        </Box>
      ) : null}

      <Routes>
        <Route
          path="/"
          element={
            <Box display="flex" m={5} justifyContent="center">
              <Home width="75%" />
            </Box>
          }
        />
        <Route
          path="/profile"
          element={
            <Box display="flex" m={5} justifyContent="center">
              <Profile email="korolkevich.i@yandex.ru" />
            </Box>
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;
