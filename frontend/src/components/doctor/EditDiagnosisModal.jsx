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
  Textarea,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

export default function EditDiagnosisModal({
  admissionID,
  doctorID,
  diagnosis,
  isOpen,
  onClose,
  handleDataUpdate,
}) {
  const [input, setInput] = useState(diagnosis || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      admissionID: admissionID,
      diagnosis: input,
    };

    try {
      await axios.put(
        `http://localhost:8080/api/doctor/${doctorID}/diagnosis`,
        request
      );
      handleDataUpdate(toastDetails);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Diagnosis</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl isRequired>
              <Textarea
                type="text"
                maxLength={100}
                value={input}
                resize="vertical"
                height="10rem"
                onChange={(e) => setInput(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button onClick={onClose}>Close</Button>
              <Button type="submit" colorScheme="blue">
                Update
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

EditDiagnosisModal.propTypes = {
  admissionID: PropTypes.string.isRequired,
  doctorID: PropTypes.string.isRequired,
  diagnosis: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
};

const toastDetails = {
  success: {
    title: "Diagnosis Updated",
    description: "The patient's diagnosis has been successfully updated.",
  },
  error: {
    title: "Failed to Update Diagnosis",
    description: "There was an error updating the diagnosis. Please try again.",
  },
  loading: {
    title: "Updating Diagnosis",
    description: "Please wait while the diagnosis is being updated.",
  },
};
