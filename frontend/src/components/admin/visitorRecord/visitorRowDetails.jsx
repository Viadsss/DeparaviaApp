import { Box, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import DeleteDialog from "./DeleteDialog";
import { IconTrashX } from "@tabler/icons-react";

export default function VisitorRowDetails({ data, handleDataUpdate }) {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const handleDelete = () => {
    onOpenDelete();
  };

  return (
    <>
      <Box py="12px">
        <Text>
          <strong>visitor ID:</strong> {data.visitorID}
        </Text>
        <Text>
          <strong>Patient ID:</strong> {data.patientID}
        </Text>
        <Text>
          <strong>Date of Visit:</strong>{" "}
          {format(data.visitorDate, "MMMM d, yyyy")}
        </Text>
        <Text>
          <strong>Visitor Name:</strong> {data.visitorName}
        </Text>
        <Text>
          <strong>Relationship:</strong> {data.visitorRelationship}
        </Text>
        <Text>
          <strong>Contact Number:</strong> {data.visitorContactNumber}
        </Text>
        <IconButton
          mt="12px"
          onClick={handleDelete}
          icon={<IconTrashX />}
          colorScheme="red"
        />
      </Box>
      <DeleteDialog
        data={data}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleDataUpdate={handleDataUpdate}
      />
    </>
  );
}

VisitorRowDetails.propTypes = {
  data: PropTypes.object.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
};
