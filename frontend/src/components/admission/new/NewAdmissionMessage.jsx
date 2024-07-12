import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function NewAdmissionMessage({ newUserData }) {
  const navigate = useNavigate("/");

  const handleClick = () => {
    navigate("/patient");
  };

  return (
    <>
      <Box textAlign={"center"}>
        <Text fontSize={"xl"}>
          Hello {newUserData.lastName}, {newUserData.firstName}{" "}
          {newUserData.middleName}!
        </Text>
        <Text mt="6px">
          Your patient ID is <b>{newUserData.patientID}</b>
        </Text>
        <Button colorScheme="blue" onClick={handleClick} mt="24px">
          I will remember it
        </Button>
      </Box>
    </>
  );
}

NewAdmissionMessage.propTypes = {
  newUserData: PropTypes.object.isRequired,
};
