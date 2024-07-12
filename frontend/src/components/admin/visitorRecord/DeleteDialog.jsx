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

export default function DeleteDialog({
  data,
  isOpen,
  onClose,
  handleDataUpdate,
}) {
  const cancelRef = useRef();

  const handleDelete = async () => {
    onClose();
    await axios.delete(
      `http://localhost:8080/api/admin/visitors/${data.visitorID}`
    );
    handleDataUpdate(toastDetails);
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
            Delete Visitor
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

DeleteDialog.propTypes = {
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
};

const toastDetails = {
  success: {
    title: "Visitor Deleted",
    description: "The visitor has been successfully deleted.",
  },
  error: {
    title: "Delete Failed",
    description:
      "An error occurred while deleting the visitor. Please try again.",
  },
  loading: {
    title: "Deleting Admission...",
    description: "Please wait while the visitor is being deleted.",
  },
};
