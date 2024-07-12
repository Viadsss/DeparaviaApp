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
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { initDoctorShiftForm } from "../../../utils/formUtils";
import axios from "axios";

export default function EditDrawer({
  data,
  isOpen,
  onClose,
  handleDoctorUpdate,
}) {
  const [formData, setFormData] = useState(initDoctorShiftForm);
  const firstField = useRef();

  useEffect(() => {
    if (data) {
      setFormData({
        doctorStartTime: formatTime(data.doctorStartTime),
        doctorEndTime: formatTime(data.doctorEndTime),
        doctorStatus: data.doctorStatus || "A",
      });
    }
  }, [data]);

  const formatTime = (timeString) => {
    return timeString ? timeString.slice(0, 5) : ""; // Extract "08:30" (hour and minute)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:8080/api/admin/doctors/${data.doctorID}`,
      formData
    );
    setFormData(initDoctorShiftForm);
    handleDoctorUpdate(toastDetails);
    onClose();
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
          <DrawerHeader borderBottomWidth="1px">Edit Details</DrawerHeader>

          <DrawerBody>
            <FormControl isRequired>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="time"
                name="doctorStartTime"
                value={formData.doctorStartTime}
                onChange={handleChange}
                ref={firstField}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>End time</FormLabel>
              <Input
                type="time"
                name="doctorEndTime"
                value={formData.doctorEndTime}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Doctor Status</FormLabel>
              <Select
                name="doctorStatus"
                value={formData.doctorStatus}
                onChange={handleChange}
                fontFamily={"Lexend"}
              >
                <option value="A">Active</option>
                <option value="I">Inactive</option>
                <option value="L">On Leave</option>
              </Select>
            </FormControl>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}

EditDrawer.propTypes = {
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDoctorUpdate: PropTypes.func.isRequired,
};

const toastDetails = {
  success: {
    title: "Doctor Details Updated",
    description: "The selected doctor details has been successfully updated.",
  },
  error: {
    title: "Update Failed",
    description:
      "An error occurred while updating doctor details. Please try again.",
  },
  loading: {
    title: "Updating Doctor Shift...",
    description: "Please wait while the doctor details is being updated.",
  },
};
