import React from "react";
import { Box, Text, useTheme } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";

export const Graph = ({ data, yAxis, min, max, color, suffix }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDir="column"
      height={window.innerHeight / 3 - 56}
      margin="16px 16px 0px 16px"
      backgroundColor={theme.colors.gray[50]}
      borderRadius={10}
      position="relative"
      boxShadow={theme.shadows.base}
    >
      <Text
        position="absolute"
        left="12"
        top="2"
        color={theme.colors.gray[500]}
      >
        {yAxis}
      </Text>
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 0, bottom: 0, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min, max, stacked: false, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        enableArea
        enableGridY={false}
        xFormat={(data) => {
          const date = new Date(data);
          const time = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return time;
        }}
        yFormat={(data) => {
          return data.toFixed(0) + suffix;
        }}
        colors={[color]}
        enablePoints={false}
        enableGridX={false}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        curve={"monotoneX"}
        crosshairType="cross"
      />
    </Box>
  );
};
