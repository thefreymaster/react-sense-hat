import { Box } from "@chakra-ui/react";
import React from "react";

export const Temperature = (props: { temperature: string }) => {
  return <Box>{props.temperature}</Box>;
};
