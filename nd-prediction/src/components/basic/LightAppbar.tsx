import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slice/authSlice";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

type LightAppbarProps = {
  title: string;
};

const LightAppbar: React.FC<LightAppbarProps> = (props) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate()

  const toPage = (to: string) => {
      navigate(to)
  }
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => toPage('/')} style={{cursor: 'pointer'}}>
          {props.title}
        </Typography>
        {user && (
          <Typography component="div" onClick={() => toPage('/profile')} style={{cursor: 'pointer'}}>
            {user?.email}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default LightAppbar;
