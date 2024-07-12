import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { initDoctorForm } from "../../../utils/formUtils";
import PropTypes from "prop-types";
import { validateDoctorInfo } from "../../../utils/formErrorUtils";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import axios from "axios";

export default function AddDrawer({ isOpen, onClose, handleDoctorUpdate }) {
  const [formData, setFormData] = useState(initDoctorForm);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initDoctorForm);
  const [show, setShow] = useState(false);
  const firstField = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validateDoctorInfo(formData);
    const hasError = Object.keys(newErrors).length > 0;
    setErrors(newErrors);

    if (hasError) {
      setIsLoading(false);
      return;
    }

    setFormData(initDoctorForm);
    try {
      await axios.post("http://localhost:8080/api/admin/doctors", formData);
      handleDoctorUpdate(toastDetails);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <form onSubmit={handleSubmit}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add New Doctor</DrawerHeader>

          <DrawerBody>
            <FormControl isRequired isInvalid={!!errors.doctorName} mt="12px">
              <FormLabel>Doctor Name</FormLabel>
              <Input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                ref={firstField}
              />
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.doctorName}
              </FormErrorMessage>
              <FormControl isRequired mt="12px">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    name="doctorPassword"
                    maxLength={20}
                    value={formData.doctorPassword}
                    onChange={handleChange}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={show ? <IconEye /> : <IconEyeClosed />}
                      onClick={() => setShow(!show)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </FormControl>
            <FormControl isRequired mt="12px">
              <FormLabel>Start Time</FormLabel>
              <Input
                type="time"
                name="doctorStartTime"
                value={formData.doctorStartTime}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired mt="12px">
              <FormLabel>End time</FormLabel>
              <Input
                type="time"
                name="doctorEndTime"
                value={formData.doctorEndTime}
                onChange={handleChange}
              />
            </FormControl>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isLoading}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}

const toastDetails = {
  success: {
    title: "Doctor Added",
    description: "The new doctor has been successfully added!",
  },
  error: {
    title: "Failed to Add Doctor",
    description: "There was an error adding the doctor. Please try again.",
  },
  loading: {
    title: "Adding Doctor",
    description: "Please wait while the doctor is being added.",
  },
};

AddDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDoctorUpdate: PropTypes.func.isRequired,
};
