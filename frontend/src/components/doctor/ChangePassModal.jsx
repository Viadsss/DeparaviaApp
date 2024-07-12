import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  FormErrorIcon,
  useToast,
  HStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import axios from "axios";

export default function ChangePassModal({ doctorID, isOpen, onClose }) {
  const [originalPassInput, setOriginalPassInput] = useState("");
  const [newPassInput, setNewPassInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [originalShow, setOriginalShow] = useState(false);
  const [newShow, setNewShow] = useState(false);
  const [error, setError] = useState("");

  const toast = useToast();

  const handleOrigChange = (e) => {
    setOriginalPassInput(e.target.value);
    setError("");
  };

  const handleNewChange = (e) => {
    setNewPassInput(e.target.value);
    setError("");
  };

  const handleClose = () => {
    setOriginalPassInput("");
    setNewPassInput("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassInput.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const request = {
        originalPassword: originalPassInput,
        newPassword: newPassInput,
      };
      const response = await axios.put(
        `http://localhost:8080/api/doctor/${doctorID}/password`,
        request
      );
      const message = response.data;
      toast({ title: message, status: "success" });
      onClose();
    } catch (err) {
      const message = err.response.data;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Diagnosis</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl isRequired mt="12px" isInvalid={Boolean(error)}>
              <FormLabel>Original Password</FormLabel>
              <InputGroup>
                <Input
                  type={originalShow ? "text" : "password"}
                  name="originalPass"
                  maxLength={20}
                  value={originalPassInput}
                  onChange={handleOrigChange}
                  mb="12px"
                />
                <InputRightElement>
                  <IconButton
                    icon={originalShow ? <IconEye /> : <IconEyeClosed />}
                    onClick={() => setOriginalShow(!originalShow)}
                  />
                </InputRightElement>
              </InputGroup>
              <FormLabel>New Password</FormLabel>
              <InputGroup>
                <Input
                  type={newShow ? "text" : "password"}
                  name="newPass"
                  maxLength={20}
                  value={newPassInput}
                  onChange={handleNewChange}
                  mb="12px"
                />
                <InputRightElement>
                  <IconButton
                    icon={newShow ? <IconEye /> : <IconEyeClosed />}
                    onClick={() => setNewShow(!newShow)}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                <FormErrorIcon />
                {error}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button onClick={handleClose}>Close</Button>
              <Button type="submit" isLoading={isLoading} colorScheme="blue">
                Change Password
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

ChangePassModal.propTypes = {
  doctorID: PropTypes.string.isRequired,
  isOpen: PropTypes.boolean,
  onClose: PropTypes.func.isRequired,
};
