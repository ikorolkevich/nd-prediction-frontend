import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export type LoaderProps = {
  size: number;
};

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <Box m={5} p={5}>
      <CircularProgress size={props.size} />
    </Box>
  );
};

export default Loader;
