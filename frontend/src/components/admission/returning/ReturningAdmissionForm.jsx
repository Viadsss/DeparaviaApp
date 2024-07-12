import { Box, Heading, useColorModeValue, useSteps } from "@chakra-ui/react";
import FormSteps from "../FormSteps";
import {
  initMedicalInfo,
  initPatientLoginInfo,
  initReturningAdmissionForm,
  returningAdmissionSteps,
} from "../../../utils/formUtils";
import LoginInfo from "./LoginInfo";
import { useState } from "react";
import MedicalInfo from "./MedicalInfo";
import ReturningAdmissionMessage from "./ReturningAdmissionMessage";

export default function ReturningAdmissionForm() {
  const [formData, setFormData] = useState(initReturningAdmissionForm);
  const [loginFormData, setLoginFormData] = useState(initPatientLoginInfo);
  const [medicalFormData, setMedicalFormData] = useState(initMedicalInfo);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 2,
  });
  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.600");

  const handleNextStep = () => {
    if (activeStep < returningAdmissionSteps.length)
      setActiveStep(activeStep + 1);
  };

  const handleBackStep = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  return (
    <Box p="32px">
      <Box mb="24px" maxWidth="900px" mx="auto">
        <Heading as="h2" mb="12px" textAlign={"center"}>
          Returning Patient Admission Form
        </Heading>
        <FormSteps steps={returningAdmissionSteps} activeStep={activeStep} />
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
          <LoginInfo
            loginFormData={loginFormData}
            setLoginFormData={setLoginFormData}
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
        {activeStep == 2 && <ReturningAdmissionMessage />}
      </Box>
    </Box>
  );
}
