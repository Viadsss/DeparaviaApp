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
import { useState } from "react";
import { initAdminLoginForm } from "../../utils/formUtils";
import PropTypes from "prop-types";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

const USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminLoginForm({ setIsLogin }) {
  const [formData, setFormData] = useState(initAdminLoginForm);
  const [isInvalid, setIsInvalid] = useState(false);
  const [show, setShow] = useState(false);
  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.600");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setIsInvalid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === USERNAME && formData.password === PASSWORD) {
      setIsLogin(true);
    } else {
      setIsInvalid(true);
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
        <FormControl isRequired isInvalid={isInvalid}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            mb="12px"
          />
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              name="password"
              maxLength={20}
              value={formData.password}
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
          <FormErrorMessage>
            <FormErrorIcon />
            Wrong Credentials
          </FormErrorMessage>
        </FormControl>
        <Box textAlign="center">
          <Button type="submit" colorScheme="blue">
            Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

AdminLoginForm.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};
