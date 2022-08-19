import { Box, Text } from "@chakra-ui/react";
import { RoomMenu } from "../RoomMenu";
import { FiActivity } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Box p={4}>
      <Box display="flex" flexDir="row" alignItems="center">
        <Link to="/">
          <Box display="flex" flexDir="row" alignItems="center">
            <FiActivity />
            <Box display="flex" marginLeft={2} />
            <Text fontWeight={700}>SKYNET Conditions</Text>
          </Box>
        </Link>
        <Box display="flex" flex={100} />
        <RoomMenu />
      </Box>
    </Box>
  );
};
