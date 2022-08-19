import * as React from "react";
import { Box, useTheme } from "@chakra-ui/react";
import { Routes } from "./routes";
import { Header } from "./components/Header";
import { StateContext } from "./providers/state";
import { useFirebaseContext } from "./providers/index";
import { ref, onValue } from "firebase/database";

export const App = () => {
  const theme = useTheme();
  const { db } = useFirebaseContext();

  React.useEffect(() => {
    // const roomRef = ref(db, `/`);

    // onValue(roomRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data)
    // })
  }, []);

  const [temperature, setTemperature] = React.useState([]);
  const [humidity, setHumidity] = React.useState([]);
  const [pressure, setPressure] = React.useState([]);

  return (
    <StateContext.Provider
      value={{
        temperature,
        setTemperature,
        humidity,
        setHumidity,
        pressure,
        setPressure,
      }}
    >
      <Box height={window.innerHeight} backgroundColor={theme.colors.white}>
        <Header />
        <Routes />
      </Box>
    </StateContext.Provider>
  );
};
