import { Text, useTheme, Box, Tooltip } from "@chakra-ui/react";
import { IoCaretUp } from "react-icons/io5";
import React from "react";

export const Metric = ({ children, label, collection, value, icon }) => {
  const theme = useTheme();
  const data = collection?.data;

  const fourHourAgoValue = data[48].y;
  const change = ((value - fourHourAgoValue) / value) * 100;

  const getColor = (value) => {
    if (value.toFixed(0) === "0" || value.toFixed(0) === "-0") {
      return theme.colors.gray[500];
    }
    if (change < 0) {
      return theme.colors.green[500];
    }
    return theme.colors.red[500];
  };

  return (
    <Box
      display="flex"
      flexDir="row"
      // minHeight={window.innerHeight / 3 - 56}
      padding="4"
      margin="16px 0px 0px 16px"
      backgroundColor={theme.colors.gray[50]}
      borderRadius={10}
      boxShadow={theme.shadows.base}
    >
      <Box display="flex" flex={1} />
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        {icon}
      </Box>
      <Box display="flex" flex={1} />
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Text color={theme.colors.gray[500]}>{label}</Text>
        <Text fontSize={28} fontWeight={700}>
          {children}
        </Text>
      </Box>
      <Box display="flex" flex={8} />
      <Box
        display="flex"
        flexDir="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        paddingBottom="2"
      >
        <Box
          display="flex"
          flexDir="row"
          justifyContent="center"
          alignItems="center"
        >
          <IoCaretUp
            color={getColor(change)}
            style={{
              transition: "transform 100ms ease-in-out",
              transform: `rotate(${change > 0 ? "0deg" : "180deg"})`,
            }}
          />
          <Tooltip label="As of four hours ago">
            <Text color={theme.colors.gray[500]}>
              {change.toFixed(0) === "-0" ? 0 : change.toFixed(0)}%
            </Text>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};
