import { Box, Heading, useColorModeValue, useSteps } from "@chakra-ui/react";
import { useState } from "react";
import FormSteps from "../FormSteps";
import PatientInfo from "./PatientInfo";
import MedicalInfo from "./MedicalInfo";
import {
  initEmergencyInfo,
  initMedicalInfo,
  initNewAdmissionForm,
  initPatientInfo,
  newAdmissionSteps,
} from "../../../utils/formUtils";
import EmergencyInfo from "./EmergencyInfo";
import NewAdmissionMessage from "./NewAdmissionMessage";

export default function NewAdmissisonForm() {
  const [formData, setFormData] = useState(initNewAdmissionForm);
  const [patientFormData, setPatientFormData] = useState(initPatientInfo);
  const [medicalFormData, setMedicalFormData] = useState(initMedicalInfo);
  const [emergencyFormData, setEmergencyFormData] = useState(initEmergencyInfo);
  const [newUserData, setNewUserData] = useState(null);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3,
  });
  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.600");

  const handleNextStep = () => {
    if (activeStep < newAdmissionSteps.length) setActiveStep(activeStep + 1);
  };

  const handleBackStep = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  return (
    <Box p="32px">
      <Box mb="24px" maxWidth="900px" mx="auto">
        <Heading as="h2" mb="12px" textAlign={"center"}>
          Patient Admission Form
        </Heading>
        <FormSteps steps={newAdmissionSteps} activeStep={activeStep} />
      </Box>
      <Box
        rounded="lg"
        maxWidth="900px"
        mx="auto"
        p={"24px"}
        bg={bgCard}
        border="1px"
        borderColor={borderCard}
      >
        {activeStep == 0 && (
          <PatientInfo
            patientFormData={patientFormData}
            setPatientFormData={setPatientFormData}
            formData={formData}
            setFormData={setFormData}
            handleNextStep={handleNextStep}
          />
        )}
        {activeStep == 1 && (
          <MedicalInfo
            medicalFormData={medicalFormData}
            setMedicalFormData={setMedicalFormData}
            formData={formData}
            setFormData={setFormData}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
          />
        )}
        {activeStep == 2 && (
          <EmergencyInfo
            emergencyFormData={emergencyFormData}
            setEmergencyFormData={setEmergencyFormData}
            formData={formData}
            setFormData={setFormData}
            setNewUserData={setNewUserData}
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
          />
        )}

        {activeStep == 3 && <NewAdmissionMessage newUserData={newUserData} />}
      </Box>
    </Box>
  );
}
