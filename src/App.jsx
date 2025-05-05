import React, { Suspense } from "react";
import "./App.css";
import { router } from "./routes.jsx";
import { Box, CircularProgress, CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
function App() {
  const Loader = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      Loading
    </Box>
  );
  return (
    <div className="">
      <CssBaseline />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>{" "}
    </div>
  );
}

export default App;
