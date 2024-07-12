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

export default function DeleteMultiDialog({
  isOpen,
  onClose,
  ids,
  handleCancel,
  handleDataUpdate,
}) {
  const cancelRef = useRef();

  const handleDelete = async () => {
    onClose();

    await axios.delete(`http://localhost:8080/api/admin/visitors/multiple`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        visitorIDs: ids,
      },
    });
    handleDataUpdate(toastDetails);
    handleCancel();
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
            Delete Multiple Visitors
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

DeleteMultiDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ids: PropTypes.array.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
};

const toastDetails = {
  success: {
    title: "Multiple Visitor Deleted",
    description: "Multiple visitors has been successfully deleted.",
  },
  error: {
    title: "Delete Failed",
    description:
      "An error occurred while deleting multiple visitors. Please try again.",
  },
  loading: {
    title: "Deleting Multiple Admission...",
    description: "Please wait while the visitors is being deleted.",
  },
};
