import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { initVisitorForm } from "../utils/formUtils";
import { validateVisitorInfo } from "../utils/formErrorUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Visitor() {
  const [formData, setFormData] = useState(initVisitorForm);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initVisitorForm);
  const [idError, setIdError] = useState(null);
  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.600");
  const navigate = useNavigate("/");

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setIdError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validateVisitorInfo(formData);
    const hasError = Object.keys(newErrors).length > 0;
    setErrors(newErrors);

    if (hasError) {
      setIsLoading(false);
      return;
    }

    handleDoctorInsert();
  };

  const handleDoctorInsert = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/visitor",
        formData
      );
      const data = response.data;
      toast({
        title: data.title,
        description: data.description,
        status: "success",
      });
      setFormData(initVisitorForm);
      navigate("/");
    } catch (err) {
      const data = err.response.data;
      toast({
        title: data.title,
        description: data.description,
        status: "error",
      });
      setIdError(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p="32px">
      <Heading as="h2" mb="24px" maxWidth="900px" mx="auto">
        Visitor Form
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
        <FormControl isRequired>
          <FormLabel>Patient ID</FormLabel>
          <Input
            type="text"
            name="patientID"
            placeholder="PAT-XX-XXX"
            maxLength={10}
            value={formData.patientID}
            onChange={handleChange}
          />
          <FormHelperText mb="12px">
            Patient ID of the patient you want to visit
          </FormHelperText>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.visitorName}>
          <FormLabel>Name of Visitor</FormLabel>
          <Input
            type="text"
            name="visitorName"
            value={formData.visitorName}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.visitorName}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={!!errors.visitorRelationship}
          mt="12px"
        >
          <FormLabel>Relationship to the Patient</FormLabel>
          <Input
            type="text"
            name="visitorRelationship"
            value={formData.visitorRelationship}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.visitorRelationship}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={!!errors.visitorContactNumber}
          mt="12px"
        >
          <FormLabel>Contact Number</FormLabel>
          <Input
            type="text"
            name="visitorContactNumber"
            maxLength={11}
            value={formData.visitorContactNumber}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.visitorContactNumber}
          </FormErrorMessage>
        </FormControl>
        {idError && (
          <Alert status="error" mt="12px" rounded="md">
            <AlertIcon />
            <AlertTitle>{idError.title}</AlertTitle>
          </Alert>
        )}
        <Button
          isLoading={isLoading}
          type="submit"
          mt="12px"
          colorScheme="blue"
        >
          Visit
        </Button>
      </Box>
    </Box>
  );
}
