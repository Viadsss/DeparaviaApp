import { useState } from "react";
import PatientLoginForm from "../components/patient/PatientLoginForm";
import PatientDashboard from "../components/patient/PatientDashBoard";
import { Box } from "@chakra-ui/react";

export default function Patient() {
  const [patientData, setPatientData] = useState(null);

  const handleLogOut = () => {
    setPatientData(null);
  };

  return (
    <Box p="32px">
      {patientData ? (
        <PatientDashboard
          patientData={patientData}
          handleLogOut={handleLogOut}
          setPatientData={setPatientData}
        />
      ) : (
        <PatientLoginForm setPatientData={setPatientData} />
      )}
    </Box>
  );
}
