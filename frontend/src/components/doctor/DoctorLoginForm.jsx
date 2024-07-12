import { useState } from "react";
import { initDoctorLoginInfo } from "../../utils/formUtils";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import axios from "axios";

export default function DoctorLoginForm({ setDoctorData }) {
  const [formData, setFormData] = useState(initDoctorLoginInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.600");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/doctor/login",
        formData
      );
      const data = response.data;
      setDoctorData(data);
    } catch (err) {
      const message = err.response.data;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Heading as="h2" textAlign="center" mb="24px">
        Log in
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmit}
        bg={bgCard}
        border="1px"
        borderColor={borderCard}
        p={"24px"}
        rounded="lg"
        maxWidth="900px"
        mx="auto"
      >
        <FormControl isRequired isInvalid={Boolean(error)}>
          <FormLabel>Doctor ID</FormLabel>
          <Input
            type="text"
            name="doctorID"
            placeholder="DOC-XX-XXX"
            maxLength={10}
            value={formData.doctorID}
            onChange={handleChange}
            mb="12px"
          />
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              name="doctorPassword"
              maxLength={20}
              value={formData.doctorPassword}
              onChange={handleChange}
              mb="12px"
            />
            <InputRightElement>
              <IconButton
                icon={show ? <IconEye /> : <IconEyeClosed />}
                onClick={() => setShow(!show)}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage mb="12px">
            <FormErrorIcon />
            {error}
          </FormErrorMessage>
        </FormControl>

        <Box textAlign="center">
          <Button
            isLoading={isLoading}
            loadingText="Logging in"
            type="submit"
            colorScheme="blue"
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

DoctorLoginForm.propTypes = {
  setDoctorData: PropTypes.func.isRequired,
};
