import * as React from "react";
import { Box, Text, useTheme } from "@chakra-ui/react";
import { Metric } from "./components/Metric/index";
import io from "socket.io-client";
import axios from "axios";
import { Graph } from "./components/Graph";
import { isMobile } from "react-device-detect";
import { IoWaterOutline, IoThermometerOutline } from "react-icons/io5";
import { WiBarometer } from "react-icons/wi";
import { FiActivity } from "react-icons/fi";

const socket = io("http://192.168.1.189:6700/");

export const App = () => {
  const [height, setHeight] = React.useState(window.innerHeight - 129);
  const [temperature, setTemperature] = React.useState([]);
  const [humidity, setHumidity] = React.useState([]);
  const [pressure, setPressure] = React.useState([]);

  const theme = useTheme();

  const inline = {
    zones: {
      height: height,
      width: window.innerWidth,
      display: "flex",
    },
  };

  React.useLayoutEffect(() => {
    socket.on("weather_update", (data) => {
      setTemperature([
        {
          id: "temperature",
          color: "hsl(57, 70%, 50%)",
          data: data.temperature,
        },
      ]);
      setHumidity([
        {
          id: "humidity",
          color: "hsl(266, 70%, 50%)",
          data: data.humidity,
        },
      ]);
      setPressure([
        {
          id: "pressure",
          color: "hsl(135, 70%, 50%)",
          data: data.pressure,
        },
      ]);
    });
    axios
      .get("/api/weather/history")
      .then((response) => {
        setTemperature([
          {
            id: "temperature",
            color: "hsl(57, 70%, 50%)",
            data: response.data.temperature,
          },
        ]);
        setHumidity([
          {
            id: "humidity",
            color: "hsl(266, 70%, 50%)",
            data: response.data.humidity,
          },
        ]);
        setPressure([
          {
            id: "pressure",
            color: "hsl(135, 70%, 50%)",
            data: response.data.pressure,
          },
        ]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  console.log({ temperature });

  if (
    temperature.length === 0 ||
    humidity.length === 0 ||
    pressure.length === 0
  ) {
    return null;
  }

  const currentTemp = temperature[0].data[temperature[0].data.length - 1].y;
  const currentHumidity = humidity[0].data[humidity[0].data.length - 1].y;
  const currentPressure = pressure[0].data[pressure[0].data.length - 1].y;
console.log(theme.colors)
  return (
    <Box height={window.innerHeight} backgroundColor={theme.colors.blackAlpha[50]}>
      <Box p={4}>
        <Text fontWeight={700} display="flex" flexDir="row" alignItems="center">
          <FiActivity />
          <Box display="flex" flex={1} />
          SKYNET Basement Conditions
          <Box display="flex" flex={100} />
        </Text>
      </Box>

      <Box
        display="flex"
        flexDir={isMobile ? "column" : "row"}
        minHeight="calc(100%)"
      >
        <Box
          display="flex"
          minWidth={isMobile ? "100%" : "25%"}
          flexDir="column"
        >
          <Metric
            icon={<IoThermometerOutline fontSize={32} />}
            value={currentTemp}
            collection={temperature[0]}
            label="Temperature"
          >
            {currentTemp.toFixed(0)}°
          </Metric>
          <Metric
            icon={<IoWaterOutline fontSize={32} />}
            value={currentHumidity}
            collection={humidity[0]}
            label="Humidity"
          >
            {currentHumidity.toFixed(0)}%
          </Metric>
          <Metric
            icon={<WiBarometer fontSize={42} />}
            value={currentPressure}
            collection={pressure[0]}
            label="Pressure"
          >
            {currentPressure.toFixed(0)}mb
          </Metric>
        </Box>
        <Box
          display="flex"
          minWidth={isMobile ? "100%" : "75%"}
          flexDir="column"
        >
          <Graph
            suffix="°"
            color="#1A365D"
            data={temperature}
            yAxis="Temperature"
            min={50}
            max={90}
          />
          <Graph
            suffix="%"
            color="#1C4532"
            data={humidity}
            yAxis="Humidity"
            min={0}
            max={100}
          />
          <Graph
            suffix="mb"
            color="#652B19"
            data={pressure}
            yAxis="Pressure"
            min={800}
            max={1200}
          />
        </Box>
      </Box>
    </Box>
  );
};
