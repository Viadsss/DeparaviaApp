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
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

export default function EditProcedureModal({
  admissionID,
  doctorID,
  procedure,
  isOpen,
  onClose,
  handleDataUpdate,
}) {
  const [input, setInput] = useState(procedure || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      admissionID: admissionID,
      procedure: input,
    };

    try {
      await axios.put(
        `http://localhost:8080/api/doctor/${doctorID}/procedure`,
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
        <ModalHeader>Update Procedure</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl isRequired>
              <Textarea
                type="text"
                maxLength={150}
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

EditProcedureModal.propTypes = {
  admissionID: PropTypes.string.isRequired,
  doctorID: PropTypes.string.isRequired,
  procedure: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
};

const toastDetails = {
  success: {
    title: "Procedure Updated",
    description: "The procedure has been successfully updated.",
  },
  error: {
    title: "Failed to Update Procedure",
    description: "There was an error updating the procedure. Please try again.",
  },
  loading: {
    title: "Updating Procedure",
    description: "Please wait while the procedure is being updated.",
  },
};
