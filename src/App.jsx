import * as React from "react";
import { Box, ChakraProvider, theme, Text } from "@chakra-ui/react";
import { Metric } from "./components/Metric/index";
import io from "socket.io-client";
import axios from "axios";
const socket = io("http://192.168.1.189:6700/");

export const App = () => {
  const [height, setHeight] = React.useState(window.innerHeight - 129);
  const [temperature, setTemperature] = React.useState([]);
  const [humidity, setHumidity] = React.useState([]);
  const [pressure, setPressure] = React.useState([]);

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

  return (
    <Box height={window.innerHeight}>
      <Box p={4}>
        <Text fontWeight={700}>SKYNET Basement</Text>
      </Box>

      <Box display="flex" flexDir="row" minHeight="calc(100%)">
        <Box
          minWidth="66.6%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100%"
        >
          <Text fontSize={100} fontWeight={700}>
            {currentTemp}
          </Text>
        </Box>
        <Box width="33.3%" flexDir="column">
          <Box>
            <Metric>Temp: {currentTemp}</Metric>
          </Box>
          <Box>
            <Metric>Humidity: {currentHumidity}</Metric>
          </Box>
          <Box>
            <Metric>Pressure: {currentPressure}</Metric>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
