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

export default function DeleteAllDialog({ isOpen, onClose, handleDataUpdate }) {
  const cancelRef = useRef();

  const handleDelete = async () => {
    await axios.delete("http://localhost:8080/api/admin/visitors");
    handleDataUpdate(toastDetails);
    onClose();
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
            Delete All Visitors
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

DeleteAllDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
};

const toastDetails = {
  success: {
    title: "All Visitors Deleted",
    description: "All visitors has been successfully deleted.",
  },
  error: {
    title: "Delete Failed",
    description:
      "An error occurred while deleting all visitors. Please try again.",
  },
  loading: {
    title: "Deleting All Admission...",
    description: "Please wait while all visitors is being deleted.",
  },
};
