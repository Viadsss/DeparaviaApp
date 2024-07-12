import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftElement,
  Button,
  Heading,
  FormErrorMessage,
  FormErrorIcon,
  Wrap,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { validatePatientInfo } from "../../../utils/formErrorUtils";
import { initPatientInfo } from "../../../utils/formUtils";

export default function PatientInfo({
  patientFormData,
  setPatientFormData,
  formData,
  setFormData,
  handleNextStep,
}) {
  const [errors, setErrors] = useState(initPatientInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRadioChange = (name, value) => {
    setPatientFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleNumberChange = (name, valueString) => {
    setPatientFormData((prev) => ({ ...prev, [name]: valueString }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validatePatientInfo(patientFormData);
    const hasError = Object.keys(newErrors).length > 0;
    setErrors(newErrors);
    if (hasError) return;

    const updatedFormData = { ...formData, ...patientFormData };
    setFormData(updatedFormData);
    handleNextStep();
  };

  return (
    <>
      <Heading size="md" as="h3">
        I. Patient Information
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={!!errors.firstName} mt="12px">
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={patientFormData.firstName}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.firstName}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.lastName} mt="12px">
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={patientFormData.lastName}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.lastName}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.middleName} mt="12px">
          <FormLabel>Middle Name</FormLabel>
          <Input
            type="text"
            name="middleName"
            value={patientFormData.middleName}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.middleName}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired mt="12px">
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            name="dateOfBirth"
            value={patientFormData.dateOfBirth}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired mt="12px">
          <FormLabel>Sex</FormLabel>
          <RadioGroup
            name="sex"
            value={patientFormData.sex}
            onChange={(value) => handleRadioChange("sex", value)}
          >
            <Stack direction="row">
              <Radio value="M">Male</Radio>
              <Radio value="F">Female</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl isRequired mt="12px">
          <FormLabel>Height</FormLabel>
          <NumberInput
            min={0.01}
            max={9.99}
            precision={2}
            step={0.01}
            value={patientFormData.height}
            onChange={(valueString) =>
              handleNumberChange("height", valueString)
            }
          >
            <NumberInputField name="height" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>in meters (m)</FormHelperText>
        </FormControl>

        <FormControl isRequired mt="12px">
          <FormLabel>Weight</FormLabel>
          <NumberInput
            min={1}
            max={999}
            precision={0}
            value={patientFormData.weight}
            onChange={(valueString) =>
              handleNumberChange("weight", valueString)
            }
          >
            <NumberInputField name="weight" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>in kilograms (kg)</FormHelperText>
        </FormControl>

        <FormControl isRequired mt="12px">
          <FormLabel>Marital Status</FormLabel>
          <RadioGroup
            name="maritalStatus"
            value={patientFormData.maritalStatus}
            onChange={(value) => handleRadioChange("maritalStatus", value)}
          >
            <Wrap spacing="16px">
              <Radio value="S">Single</Radio>
              <Radio value="M">Married</Radio>
              <Radio value="D">Divorced</Radio>
              <Radio value="L">Legally Seperated</Radio>
              <Radio value="W">Widowed</Radio>
            </Wrap>
          </RadioGroup>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.contactNumber} mt="12px">
          <FormLabel>Contact Number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">#</InputLeftElement>
            <Input
              type="tel"
              name="contactNumber"
              value={patientFormData.contactNumber}
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.contactNumber}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.emailAddress} mt="12px">
          <FormLabel>Email Address</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">@</InputLeftElement>
            <Input
              type="email"
              name="emailAddress"
              value={patientFormData.emailAddress}
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.emailAddress}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={errors.streetAddress} mt="12px">
          <FormLabel>Street Address</FormLabel>
          <Input
            type="text"
            name="streetAddress"
            value={patientFormData.streetAddress}
            onChange={handleChange}
          />
          {!errors.streetAddress ? (
            <FormHelperText>
              Follow this format: (Street #, Street Name, Barangay)
            </FormHelperText>
          ) : (
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.streetAddress}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.city} mt="12px">
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            name="city"
            value={patientFormData.city}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.city}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.province} mt="12px">
          <FormLabel>Province</FormLabel>
          <Input
            type="text"
            name="province"
            value={patientFormData.province}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.province}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.zipCode} mt="12px">
          <FormLabel>Zip Code</FormLabel>
          <Input
            type="text"
            name="zipCode"
            value={patientFormData.zipCode}
            onChange={handleChange}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.zipCode}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit" mt="12px">
          Next
        </Button>
      </form>
    </>
  );
}

PatientInfo.propTypes = {
  patientFormData: PropTypes.object.isRequired,
  setPatientFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};
