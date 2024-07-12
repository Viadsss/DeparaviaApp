import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ReturningAdmissionMessage() {
  const navigate = useNavigate("/");

  const handleClick = () => {
    navigate("/patient");
  };

  return (
    <Box textAlign={"center"}>
      <Heading size="lg">New Admission Added</Heading>
      <Button colorScheme="blue" mr={3} onClick={handleClick} mt="32px">
        Go Back
      </Button>
    </Box>
  );
}
