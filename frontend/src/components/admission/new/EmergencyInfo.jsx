import { useState } from "react";
import {
  initEmergencyInfo,
  initNewAdmissionForm,
} from "../../../utils/formUtils";
import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { validateEmergencyInfo } from "../../../utils/formErrorUtils";
import axios from "axios";

export default function EmergencyInfo({
  emergencyFormData,
  setEmergencyFormData,
  formData,
  setFormData,
  setNewUserData,
  handleBackStep,
  handleNextStep,
}) {
  const [errors, setErrors] = useState(initEmergencyInfo);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergencyFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateEmergencyInfo(emergencyFormData);
    const hasError = Object.keys(newErrors).length > 0;
    setErrors(newErrors);
    if (hasError) return;

    const updatedFormData = { ...formData, ...emergencyFormData };
    console.log(updatedFormData);
    setFormData(updatedFormData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admission/new",
        updatedFormData
      );
      const data = response.data;
      setFormData(initNewAdmissionForm);
      setNewUserData(data);
      handleNextStep();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading as="h3" size="md">
        III. Emergency Contact Information
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={!!errors.emergencyName} mt="12px">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="emergencyName"
            value={emergencyFormData.emergencyName}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.emergencyName}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={!!errors.emergencyRelationship}
          mt="12px"
        >
          <FormLabel>Relationship</FormLabel>
          <Input
            type="text"
            name="emergencyRelationship"
            value={emergencyFormData.emergencyRelationship}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.emergencyRelationship}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={!!errors.emergencyContactNumber}
          mt="12px"
        >
          <FormLabel>Contact Number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">#</InputLeftElement>
            <Input
              type="tel"
              name="emergencyContactNumber"
              value={emergencyFormData.emergencyContactNumber}
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.emergencyContactNumber}
          </FormErrorMessage>
        </FormControl>
        <HStack mt="12px">
          <Button onClick={handleBackStep}>Back</Button>
          <Button isLoading={isLoading} type="submit" colorScheme="green">
            Submit
          </Button>
        </HStack>
      </form>
    </>
  );
}

EmergencyInfo.propTypes = {
  emergencyFormData: PropTypes.object.isRequired,
  setEmergencyFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  setNewUserData: PropTypes.func.isRequired,
  handleBackStep: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};
