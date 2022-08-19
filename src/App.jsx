import * as React from "react";
import { Box, useTheme } from "@chakra-ui/react";
import { Routes } from "./routes";
import { Header } from './components/Header';

export const App = () => {
  const theme = useTheme();

  console.log(theme);

  return (
    <Box height={window.innerHeight} backgroundColor={theme.colors.white}>
      <Header />
      <Routes />
    </Box>
  );
};
