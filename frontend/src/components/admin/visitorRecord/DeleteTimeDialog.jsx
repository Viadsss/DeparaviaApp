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

export default function DeleteTimeDialog({
  isOpen,
  onClose,
  deleteTimePick,
  handleDataUpdate,
}) {
  const cancelRef = useRef();

  const handleDelete = async () => {
    let toastDetails = {
      success: {
        title: "",
        description: "",
      },
      error: {
        title: "Delete Failed",
        description:
          "An error occurred while deleting visitors. Please try again.",
      },
      loading: {
        title: "Deleting Visitors...",
        description: "Please wait while visitors are being deleted.",
      },
    };

    switch (deleteTimePick) {
      case "1month":
        toastDetails.success.title =
          "Visitors from More than a Month Ago Deleted";
        toastDetails.success.description =
          "Visitors from more than a month ago have been successfully deleted.";
        break;
      case "3month":
        toastDetails.success.title =
          "Visitors from More than 3 Months Ago Deleted";
        toastDetails.success.description =
          "Visitors from more than 3 months ago have been successfully deleted.";
        break;
      case "6month":
        toastDetails.success.title =
          "Visitors from More than 6 Months Ago Deleted";
        toastDetails.success.description =
          "Visitors from more than 6 months ago have been successfully deleted.";
        break;
      case "1year":
        toastDetails.success.title =
          "Visitors from More than a Year Ago Deleted";
        toastDetails.success.description =
          "Visitors from more than a year ago have been successfully deleted.";
        break;
      default:
        return;
    }

    await axios.delete(
      `http://localhost:8080/api/admin/visitors/time/${deleteTimePick}`
    );
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
          <AlertDialogHeader fontWeight="bold" textAlign={"center"}>
            Delete Visitors from More than{" "}
            {deleteTimePick === "1month"
              ? "a Month Ago"
              : deleteTimePick === "3month"
              ? "3 Months Ago"
              : deleteTimePick === "6month"
              ? "6 Months Ago"
              : deleteTimePick === "1year"
              ? "a Year Ago"
              : ""}
          </AlertDialogHeader>
          <AlertDialogBody textAlign={"center"}>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter mt="16px">
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

DeleteTimeDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteTimePick: PropTypes.string.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
};
