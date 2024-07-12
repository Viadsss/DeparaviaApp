import {
  FormControl,
  FormLabel,
  Button,
  Heading,
  Textarea,
  FormErrorMessage,
  FormErrorIcon,
  HStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { initMedicalInfo } from "../../../utils/formUtils";
import { validateMedicalInfo } from "../../../utils/formErrorUtils";

export default function MedicalInfo({
  medicalFormData,
  setMedicalFormData,
  formData,
  setFormData,
  handleBackStep,
  handleNextStep,
}) {
  const [errors, setErrors] = useState(initMedicalInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicalFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateMedicalInfo(medicalFormData);
    const hasError = Object.keys(newErrors).length > 0;
    setErrors(newErrors);
    if (hasError) return;

    const updatedFormData = { ...formData, ...medicalFormData };
    setFormData(updatedFormData);
    handleNextStep();
  };

  return (
    <>
      <Heading as="h3" size="md">
        II. Medical Information
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={!!errors.complaints} mt="12px">
          <FormLabel>Complaints</FormLabel>
          <Textarea
            name="complaints"
            value={medicalFormData.complaints}
            onChange={handleChange}
            resize="vertical"
            height="10rem"
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.complaints}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.medications} mt="12px">
          <FormLabel>Medications currently taking</FormLabel>
          <Textarea
            name="medications"
            value={medicalFormData.medications}
            onChange={handleChange}
            resize="vertical"
            height="10rem"
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.medications}
          </FormErrorMessage>
        </FormControl>
        <HStack mt="12px">
          <Button onClick={handleBackStep}>Back</Button>
          <Button type="submit" colorScheme="blue">Next</Button>
        </HStack>
      </form>
    </>
  );
}

MedicalInfo.propTypes = {
  medicalFormData: PropTypes.object.isRequired,
  setMedicalFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleBackStep: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};
