import * as React from "react";
import { Box, useTheme } from "@chakra-ui/react";
import { Routes } from "./routes";
import { Header } from "./components/Header";
import { StateContext } from "./providers/state";
import { useFirebaseContext } from "./providers/index";
import {
  ref,
  onValue,
  query,
  limitToLast,
  get,
  child,
} from "firebase/database";

export const App = () => {
  const [rooms, setRooms] = React.useState();
  const [roomsOverviewData, setRoomsOverviewData] = React.useState({});
  const [temperature, setTemperature] = React.useState([]);
  const [humidity, setHumidity] = React.useState([]);
  const [pressure, setPressure] = React.useState([]);

  const theme = useTheme();
  const { db } = useFirebaseContext();

  React.useEffect(() => {
    const roomRef = ref(db, `/rooms`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setRooms(Object.keys(data));
    });
  }, []);

  React.useEffect(() => {
    if (rooms) {
      rooms.map((room) => {
        const roomTemperatureRef = query(
          ref(db, `/${room}/temperature`),
          limitToLast(10)
        );

        onValue(
          roomTemperatureRef,
          (snapshot) => {
            const data = snapshot.val();
            const temperature = [
              {
                id: "temperature",
                color: "hsl(57, 70%, 50%)",
                data: Object.entries(data)?.reduce((collector, [, item]) => {
                  collector.push(item);
                  return collector;
                }, []),
              },
            ];

            setRoomsOverviewData({
              [room]: {
                temperature,
                name: room,
              },
            });
          },
          { onlyOnce: true }
        );
      });
    }
  }, [rooms]);

  if (!rooms) {
    return null;
  }

  console.log({ roomsOverviewData });

  return (
    <StateContext.Provider
      value={{
        temperature,
        setTemperature,
        humidity,
        setHumidity,
        pressure,
        setPressure,
        rooms,
        setRooms,
        roomsOverviewData,
      }}
    >
      <Box height={window.innerHeight} backgroundColor={theme.colors.white}>
        <Header />
        <Routes />
      </Box>
    </StateContext.Provider>
  );
};
