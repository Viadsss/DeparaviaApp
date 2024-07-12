import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function DischargeDialog({
  admissionID,
  doctorID,
  isOpen,
  onClose,
  handleDataUpdate,
}) {
  const cancelRef = useRef();

  const handleDischarge = async () => {
    const request = {
      admissionID: admissionID,
    };

    try {
      await axios.put(
        `http://localhost:8080/api/doctor/${doctorID}/discharge`,
        request
      );
      handleDataUpdate(toastDetails);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontWeight="bold">
            Discharge Patient
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleDischarge} ml={3}>
              Discharge
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

DischargeDialog.propTypes = {
  admissionID: PropTypes.string.isRequired,
  doctorID: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
};

const toastDetails = {
  success: {
    title: "Patient Discharged",
    description: "The patient has been successfully discharged.",
  },
  error: {
    title: "Failed to Discharge Patient",
    description:
      "There was an error discharging the patient. Please try again.",
  },
  loading: {
    title: "Discharging Patient",
    description: "Please wait while the patient is being discharged.",
  },
};
