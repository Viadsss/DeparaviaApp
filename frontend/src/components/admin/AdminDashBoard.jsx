import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdmissionRecord from "./admissionRecord/AdmissionRecord";
import DoctorRecord from "./doctorRecord/DoctorRecord";
import PatientRecord from "./patientRecord/PatientRecord";
import VisitorRecord from "./visitorRecord/VisitorRecord";
import { IconLogout } from "@tabler/icons-react";
import MonthModal from "./MonthModal";
import YearModal from "./YearModal";
import axios from "axios";

// Jhana

export default function AdminDashBoard({ setIsLogin }) {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    getDoctorsData();
  }, []);

  const {
    isOpen: isOpenMonth,
    onOpen: onOpenMonth,
    onClose: onCloseMonth,
  } = useDisclosure();
  const {
    isOpen: isOpenYear,
    onOpen: onOpenYear,
    onClose: onCloseYear,
  } = useDisclosure();

  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.600");
  const theme = useColorModeValue("chakraLight", "chakraDark");

  const getDoctorsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/doctors"
      );
      const data = response.data;
      setDoctorData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogOut = () => {
    setIsLogin(false);
  };

  return (
    <>
      <Box>
        <Flex rowGap="4px" columnGap="8px" mb="8px" flexWrap="wrap">
          <Button leftIcon={<IconLogout />} onClick={handleLogOut} mb="16px">
            Log out
          </Button>
          <Flex columnGap="8px" rowGap="4px" flexWrap="wrap">
            <Button onClick={onOpenMonth} colorScheme="blue">
              Monthly Overview
            </Button>
            <Button onClick={onOpenYear} colorScheme="blue">
              Yearly Overview
            </Button>
          </Flex>
        </Flex>
        <Box
          py="1rem"
          bg={bgCard}
          border="1px"
          borderColor={borderCard}
          rounded="lg"
        >
          <Tabs isFitted>
            <TabList flexWrap="wrap">
              <Tab>Admission Record</Tab>
              <Tab>Doctor Record</Tab>
              <Tab>Patient Record</Tab>
              <Tab>Visitor Record</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AdmissionRecord theme={theme} doctorData={doctorData} />
              </TabPanel>
              <TabPanel>  
                <DoctorRecord
                  theme={theme}
                  updateAdmissionDoctors={getDoctorsData}
                />
              </TabPanel>
              <TabPanel>
                <PatientRecord theme={theme} />
              </TabPanel>
              <TabPanel>
                <VisitorRecord theme={theme} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
      <MonthModal isOpen={isOpenMonth} onClose={onCloseMonth} />
      <YearModal isOpen={isOpenYear} onClose={onCloseYear} />
    </>
  );
}

AdminDashBoard.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};
