import { useState } from "react";
import PropTypes from "prop-types";
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
  FormErrorMessage,
  FormErrorIcon,
  useToast,
  HStack,
  Flex,
  Wrap,
  Box,
  Heading,
} from "@chakra-ui/react";
import { initEditPatientForm } from "../../utils/formUtils";
import { validatePatientEditInfo } from "../../utils/formErrorUtils";
import axios from "axios";

export default function Edit({ patientData, setPatientData }) {
  const [formData, setFormData] = useState(patientData);
  const [errors, setErrors] = useState(initEditPatientForm);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleRestore = () => {
    setFormData(patientData);
    setErrors(initEditPatientForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleNumberChange = (name, valueString) => {
    setFormData((prev) => ({ ...prev, [name]: valueString }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData) setIsLoading(true);
    const newErrors = validatePatientEditInfo(formData);
    const hasError = Object.keys(newErrors).length > 0;
    setErrors(newErrors);

    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/patient/${patientData.patientID}/details`,
        formData
      );
      const data = response.data;
      setPatientData(data);
      setFormData(data);
      toast({
        title: "Edit successful",
        description: "The patient information has been successfully updated.",
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Edit Failed",
        description:
          "An error occurred while updating the patient information.",
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ margin: "0" }}>
        <Flex direction={{ base: "column", md: "row" }} gap="24px">
          <Box flex="1">
            <Heading fontSize={"x-large"}>Personal Information</Heading>
            <FormControl isRequired isInvalid={!!errors.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                isDisabled
              />
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.firstName}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                isDisabled
              />
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.lastName}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.middleName}>
              <FormLabel>Middle Name</FormLabel>
              <Input
                type="text"
                name="middleName"
                value={formData.middleName}
                isDisabled
              />
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.middleName}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                isDisabled
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Sex</FormLabel>
              <RadioGroup isDisabled name="sex" value={formData.sex}>
                <Stack direction="row">
                  <Radio value="M">Male</Radio>
                  <Radio value="F">Female</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Height</FormLabel>
              <NumberInput
                min={0.01}
                max={9.99}
                precision={2}
                step={0.01}
                value={formData.height}
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

            <FormControl isRequired>
              <FormLabel>Weight</FormLabel>
              <NumberInput
                min={1}
                max={999}
                precision={0}
                value={formData.weight}
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

            <FormControl isRequired>
              <FormLabel>Marital Status</FormLabel>
              <RadioGroup
                name="maritalStatus"
                value={formData.maritalStatus}
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

            <FormControl isRequired isInvalid={!!errors.contactNumber}>
              <FormLabel>Contact Number</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">#</InputLeftElement>
                <Input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </InputGroup>
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.contactNumber}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.emailAddress}>
              <FormLabel>Email Address</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">@</InputLeftElement>
                <Input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                />
              </InputGroup>
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.emailAddress}
              </FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.streetAddress}>
              <FormLabel>Street Address</FormLabel>
              <Input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
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

            <FormControl isRequired isInvalid={!!errors.city}>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.city}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.province}>
              <FormLabel>Province</FormLabel>
              <Input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
              />
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.province}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.zipCode}>
              <FormLabel>Zip Code</FormLabel>
              <Input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.zipCode}
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Box flex="1">
            <Heading fontSize={"x-large"}>Emergency Information</Heading>
            <FormControl isRequired isInvalid={!!errors.emergencyName}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
              />
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.emergencyName}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.emergencyRelationship}>
              <FormLabel>Relationship</FormLabel>
              <Input
                type="text"
                name="emergencyRelationship"
                value={formData.emergencyRelationship}
                onChange={handleChange}
              />
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.emergencyRelationship}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.emergencyContactNumber}>
              <FormLabel>Contact Number</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">#</InputLeftElement>
                <Input
                  type="tel"
                  name="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={handleChange}
                />
              </InputGroup>
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.emergencyContactNumber}
              </FormErrorMessage>
            </FormControl>
            <HStack marginTop={"16px"}>
              <Button onClick={handleRestore}>Restore</Button>
              <Button type="submit" isLoading={isLoading} colorScheme="blue">
                Save Changes
              </Button>
            </HStack>
          </Box>
        </Flex>
      </form>
    </>
  );
}

Edit.propTypes = {
  patientData: PropTypes.object.isRequired,
  setPatientData: PropTypes.func.isRequired,
};
