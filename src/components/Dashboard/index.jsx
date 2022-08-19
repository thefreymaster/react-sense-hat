import { Box, useTheme } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";

const SquareCard = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      minWidth={isMobile ? "100%" : "25%"}
      maxHeight={isMobile ? "100%" : "200px"}
      flexDir="column"
      padding="4"
      margin="0px 0px 0px 16px"
      backgroundColor={theme.colors.gray[50]}
      borderRadius={10}
      boxShadow={theme.shadows.base}
    >
      {children}
    </Box>
  );
};

export const Dashboard = () => {
  return (
    <Box
      display="flex"
      flexDir={isMobile ? "column" : "row"}
      minHeight="calc(100% - 60px)"
    >
      <SquareCard>dashboard</SquareCard>
    </Box>
  );
};
