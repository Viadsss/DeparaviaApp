import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import PatientsTable from "./PatientsTable";
import { IconLogout } from "@tabler/icons-react";
import ChangePassModal from "./ChangePassModal";

export default function DoctorDashboard({ doctorData, handleLogOut }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Box>
          <Heading as="h2">Welcome Dr. {doctorData.doctorName}!</Heading>
          <Badge>{doctorData.doctorID}</Badge>
        </Box>
        <HStack>
          <Button leftIcon={<IconLogout />} onClick={handleLogOut} my="16px">
            Log out
          </Button>
          <Button onClick={onOpen}>Change Password</Button>
        </HStack>
        <PatientsTable doctorID={doctorData.doctorID} />
      </Box>
      <ChangePassModal
        doctorID={doctorData.doctorID}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

DoctorDashboard.propTypes = {
  doctorData: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
};
