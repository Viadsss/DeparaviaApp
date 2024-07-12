import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

export default function LoginInfo({
  loginFormData,
  setLoginFormData,
  setFormData,
  handleNextStep,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormData((prevData) => ({ ...prevData, ...loginFormData }));
    try {
      await axios.post(
        "http://localhost:8080/api/admission/returning/login2",
        loginFormData
      );
      handleNextStep();
    } catch (err) {
      const message = err.response.data;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading size="md" as="h3">
        I. Login
      </Heading>
      <form onSubmit={handleSumbit}>
        <FormControl isRequired mt="12px" isInvalid={Boolean(error)}>
          <FormLabel>Patient ID</FormLabel>
          <Input
            type="text"
            name="patientID"
            placeholder="PAT-XX-XXX"
            maxLength={10}
            value={loginFormData.patientID}
            onChange={handleChange}
          />
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            name="dateOfBirth"
            value={loginFormData.dateOfBirth}
            onChange={handleChange}
            mb="12px"
          />
          <FormLabel>Contact Number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">#</InputLeftElement>
            <Input
              type="tel"
              name="contactNumber"
              maxLength={11}
              value={loginFormData.contactNumber}
              onChange={handleChange}
              mb="12px"
            />
          </InputGroup>
          <FormErrorMessage>
            <FormErrorIcon />
            {error}
          </FormErrorMessage>
        </FormControl>

        <Button
          isLoading={isLoading}
          type="submit"
          mt="12px"
          colorScheme="blue"
        >
          Next
        </Button>
      </form>
    </>
  );
}

LoginInfo.propTypes = {
  loginFormData: PropTypes.object.isRequired,
  setLoginFormData: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};
