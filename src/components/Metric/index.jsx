import { Box } from "@chakra-ui/react";
import React from "react";
import io from "socket.io-client";
import axios from "axios";
const socket = io("http://192.168.1.189:6700/");

export const Metric = ({children}) => {

  return <Box>{children}</Box>;
};
