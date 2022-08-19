import React from "react";
import { Box } from "@chakra-ui/react";
import { Graph } from "../Graph";
import { isMobile } from "react-device-detect";
import { IoWaterOutline, IoThermometerOutline } from "react-icons/io5";
import { WiBarometer } from "react-icons/wi";
import { Metric } from "../Metric";
import { ref, onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import { useFirebaseContext } from "../../providers";

export const Conditions = () => {
  const [temperature, setTemperature] = React.useState([]);
  const [humidity, setHumidity] = React.useState([]);
  const [pressure, setPressure] = React.useState([]);

  const { db } = useFirebaseContext();
  const params = useParams();

  React.useEffect(() => {
    const roomRef = ref(db, `/${params?.room_id}`);

    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      const temperature = Object.entries(data.temperature).reduce(
        (collector, [, item]) => {
          collector.push(item);
          return collector;
        },
        []
      );
      const humidity = Object.entries(data.humidity).reduce(
        (collector, [, item]) => {
          collector.push(item);
          return collector;
        },
        []
      );
      const pressure = Object.entries(data.pressure).reduce(
        (collector, [, item]) => {
          collector.push(item);
          return collector;
        },
        []
      );

      setTemperature([
        {
          id: "temperature",
          color: "hsl(57, 70%, 50%)",
          data: temperature,
        },
      ]);
      setHumidity([
        {
          id: "humidity",
          color: "hsl(266, 70%, 50%)",
          data: humidity,
        },
      ]);
      setPressure([
        {
          id: "pressure",
          color: "hsl(135, 70%, 50%)",
          data: pressure,
        },
      ]);
    });
  }, [params?.room_id]);

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
    <>
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
    </>
  );
};
