import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  useTheme,
  Box,
} from "@chakra-ui/react";

export const Metric = ({ children, label, collection, value }) => {
  const theme = useTheme();
  const data = collection?.data;

  const hourAgoValue = data[12].y;
  const change = ((value - hourAgoValue) / value) * 100;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxHeight={window.innerHeight / 3 - 56}
      margin="4"
      padding="4"
      backgroundColor={theme.colors.white}
      borderRadius={10}
      boxShadow={theme.shadows.base}
    >
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>
          <Text fontSize={70} fontWeight={700}>
            {children}
          </Text>
        </StatNumber>
        <StatHelpText>
          <StatArrow type={change > 0 ? "increase" : "decrease"} />
          {change.toFixed(2)}%
        </StatHelpText>
      </Stat>
    </Box>
  );
};
