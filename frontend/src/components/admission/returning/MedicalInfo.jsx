import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  ScaleFade,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  initMedicalInfo,
  initReturningAdmissionForm,
} from "../../../utils/formUtils";
import { validateMedicalInfo } from "../../../utils/formErrorUtils";
import axios from "axios";

export default function MedicalInfo({
  medicalFormData,
  setMedicalFormData,
  formData,
  setFormData,
  handleBackStep,
  handleNextStep,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initMedicalInfo);
  const [formErrMessage, setFormErrMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicalFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validateMedicalInfo(medicalFormData);
    const hasError = Object.keys(newErrors).length > 0;
    setErrors(newErrors);

    if (hasError) {
      setIsLoading(false);
      return;
    }

    const updatedFormData = { ...formData, ...medicalFormData };
    setFormData(updatedFormData);

    try {
      await axios.post(
        "http://localhost:8080/api/admission/returning",
        updatedFormData
      );
      setFormData(initReturningAdmissionForm);
      handleNextStep();
    } catch (err) {
      const message = err.response.data;
      setFormErrMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading as="h3" size="md">
        II. Medical Information
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
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
        </FormControl>
        {formErrMessage && (
          <ScaleFade initialScale={0.1} in={Boolean(formErrMessage)}>
            <Alert status="error" mt="12px">
              <AlertIcon />
              <AlertTitle>
                Multiple admissions in the same day is not allowed currently!
              </AlertTitle>
            </Alert>
          </ScaleFade>
        )}

        <HStack mt="12px">
          <Button onClick={handleBackStep}>Back</Button>
          <Button isLoading={isLoading} type="submit" colorScheme="blue">
            Next
          </Button>
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
