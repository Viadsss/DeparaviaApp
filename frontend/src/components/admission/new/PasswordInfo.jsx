import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { initNewAdmissionForm } from "../../../utils/formUtils";
import axios from "axios";

export default function PasswordInfo({
  passwordFormData,
  setPasswordFormData,
  formData,
  setFormData,
  setNewUserData,
  handleBackStep,
  handleNextStep,
}) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedFormData = { ...formData, ...passwordFormData };
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading as="h3" size="md">
        IV. Password Information
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mt="12px">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              name="password"
              maxLength={20}
              value={passwordFormData.password}
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

PasswordInfo.propTypes = {
  passwordFormData: PropTypes.object.isRequired,
  setPasswordFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  setNewUserData: PropTypes.func.isRequired,
  handleBackStep: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};
