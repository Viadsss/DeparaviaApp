import {
  Badge,
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import EditProcedureModal from "./EditProcedureModal";
import EditDiagnosisModal from "./EditDiagnosisModal";
import DischargeDialog from "./DischargeDialog";

export default function TableRowDetails({ doctorID, data, handleDataUpdate }) {
  const {
    isOpen: isOpenProcedure,
    onOpen: onOpenProcedure,
    onClose: onCloseProcedure,
  } = useDisclosure();

  const {
    isOpen: isOpenDiagnosis,
    onOpen: onOpenDiagnosis,
    onClose: onCloseDiagnosis,
  } = useDisclosure();

  const {
    isOpen: isOpenDischarge,
    onOpen: onOpenDischarge,
    onClose: onCloseDischarge,
  } = useDisclosure();
  return (
    <>
      <Box py="12px">
        <HStack mb="8px">
          <Button onClick={onOpenProcedure}>Update Procedure</Button>
          <Button onClick={onOpenDiagnosis}>Update Diagnosis</Button>
          <Button
            onClick={onOpenDischarge}
            isDisabled={!data.procedure || !data.diagnosis}
            colorScheme="green"
          >
            Discharge
          </Button>
        </HStack>
        <Badge>{data.admissionID}</Badge>
        <Text>
          <strong>Patient ID:</strong> {data.patientID}
        </Text>
        <Text>
          <strong>Full Name:</strong> {data.fullName}
        </Text>
        <Text>
          <strong>Sex:</strong> {data.sex == "M" ? "Male" : "Female"}
        </Text>
        <Text>
          <strong>Height:</strong> {data.height}
        </Text>
        <Text>
          <strong>Weight:</strong> {data.weight}
        </Text>
        <Box>
          <strong>Complaints:</strong>
          <Text whiteSpace="preserve-breaks" marginLeft="1.5rem">
            {data.complaints}
          </Text>
        </Box>
        <Box>
          <strong>Medications:</strong>
          <Text whiteSpace="preserve-breaks" marginLeft="1.5rem">
            {data.medications ? data.medications : "No medications"}
          </Text>
        </Box>
        <Box>
          <strong>Procedure:</strong>
          <Text whiteSpace="preserve-breaks" marginLeft="1.5rem">
            {data.procedure ? data.procedure : "No Procedure yet"}
          </Text>
        </Box>
        <Box>
          <strong>Diagnosis:</strong>
          <Text whiteSpace="preserve-breaks" marginLeft="1.5rem">
            {data.diagnosis ? data.diagnosis : "No Diagnosis yet"}
          </Text>
        </Box>
      </Box>
      <EditProcedureModal
        admissionID={data.admissionID}
        doctorID={doctorID}
        procedure={data.procedure}
        isOpen={isOpenProcedure}
        onClose={onCloseProcedure}
        handleDataUpdate={handleDataUpdate}
      />
      <EditDiagnosisModal
        admissionID={data.admissionID}
        doctorID={doctorID}
        diagnosis={data.diagnosis}
        isOpen={isOpenDiagnosis}
        onClose={onCloseDiagnosis}
        handleDataUpdate={handleDataUpdate}
      />
      <DischargeDialog
        admissionID={data.admissionID}
        doctorID={doctorID}
        isOpen={isOpenDischarge}
        onClose={onCloseDischarge}
        handleDataUpdate={handleDataUpdate}
      />
    </>
  );
}

TableRowDetails.propTypes = {
  doctorID: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
};
