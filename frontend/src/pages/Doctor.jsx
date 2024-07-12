import { useState } from "react";
import DoctorLoginForm from "../components/doctor/DoctorLoginForm";
import DoctorDashboard from "../components/doctor/DoctorDashBoard";
import { Box } from "@chakra-ui/react";

export default function Doctor() {
  const [doctorData, setDoctorData] = useState(null);

  const handleLogOut = () => {
    setDoctorData(null);
  };

  return (
    <Box p="32px">
      {doctorData ? (
        <DoctorDashboard doctorData={doctorData} handleLogOut={handleLogOut} />
      ) : (
        <DoctorLoginForm setDoctorData={setDoctorData} />
      )}
    </Box>
  );
}
