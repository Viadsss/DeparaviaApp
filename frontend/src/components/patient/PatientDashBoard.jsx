import {
  IconButton,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import AdmissionsTable from "./AdmissionsTable";
import VisitorsTable from "./VisitorsTable";
import {
  IconEdit,
  IconFriends,
  IconLogout,
  IconStethoscope,
  IconUser,
} from "@tabler/icons-react";
import Profile from "./Profile";
import Edit from "./Edit";

export default function PatientDashboard({
  patientData,
  setPatientData,
  handleLogOut,
}) {
  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.600");

  return (
    <Tabs
      variant="soft-rounded"
      isFitted={{ base: true, md: false }}
      h="100%"
      size={{ base: "sm", md: "md" }}
    >
      <TabList mb="24px">
        <Tab>
          <Tooltip label="Profile">
            <IconUser />
          </Tooltip>
        </Tab>
        <Tab>
          <Tooltip label="Edit">
            <IconEdit />
          </Tooltip>
        </Tab>
        <Tab>
          <Tooltip label="Admission History">
            <IconStethoscope />
          </Tooltip>
        </Tab>
        <Tab>
          <Tooltip label="Visit History">
            <IconFriends />
          </Tooltip>
        </Tab>
        <Spacer />
        <Tooltip label="Log Out">
          <IconButton onClick={handleLogOut} icon={<IconLogout />} />
        </Tooltip>
      </TabList>

      <TabPanels
        py="1rem"
        bg={bgCard}
        border="1px"
        borderColor={borderCard}
        rounded="lg"
      >
        <TabPanel>
          <Profile data={patientData} />
        </TabPanel>
        <TabPanel>
          <Edit patientData={patientData} setPatientData={setPatientData} />
        </TabPanel>
        <TabPanel>
          <AdmissionsTable patientID={patientData.patientID} />
        </TabPanel>
        <TabPanel>
          <VisitorsTable patientID={patientData.patientID} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

PatientDashboard.propTypes = {
  patientData: PropTypes.object.isRequired,
  setPatientData: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
};
