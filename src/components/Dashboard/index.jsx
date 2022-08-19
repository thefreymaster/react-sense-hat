import { Box, useTheme, Text, Button } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useStateContext } from "../../providers/state";
import { capitalizeFirstLetter } from "../RoomMenu/index";
import { Link, useHistory } from "react-router-dom";
import { Graph } from "../Graph";

const SquareCard = ({ children, name, room }) => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <Box
      className="card"
      display="flex"
      minWidth={isMobile ? "100%" : "25%"}
      maxHeight={isMobile ? "100%" : "200px"}
      flexDir="column"
      padding="4"
      margin="0px 0px 0px 16px"
      backgroundColor={theme.colors.gray[50]}
      _hover={{ cursor: "pointer" }}
      borderRadius={10}
      boxShadow={theme.shadows.base}
      onClick={() => history.push(`/${name}`)}
    >
      <Box display="flex" flexDir="row">
        <Text color={theme.colors.gray[500]}>
          {capitalizeFirstLetter(name)}
        </Text>
        <Box flex={1} />
        <Button size="sm">View</Button>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexDir="row"
        height="100%"
      >
        <Text fontSize={64} fontWeight={700}>
          {children}
        </Text>
        <Box flex={1} />
        <Box height={150} width={200}>
          <Graph
            color="#1A365D"
            min={50}
            max={90}
            data={room?.temperature}
            marginTop={4}
            marginLeft={0}
            height={100}
            suffix="°"
            containerMargin="16px 0px 0px 16px"
          />
        </Box>
      </Box>
    </Box>
  );
};

export const Dashboard = () => {
  const { roomsOverviewData } = useStateContext();

  return (
    <Box
      display="flex"
      flexDir={isMobile ? "column" : "row"}
      minHeight="calc(100% - 60px)"
    >
      {Object.values(roomsOverviewData)?.map((room) => {
        const currentTemp =
          room.temperature[room.temperature?.length - 1]?.data[
            room.temperature[0].data.length - 1
          ].y;
        return (
          <SquareCard room={room} name={room?.name}>
            {currentTemp.toFixed(0)}°
          </SquareCard>
        );
      })}
    </Box>
  );
};
