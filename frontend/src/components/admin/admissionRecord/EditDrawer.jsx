import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function EditDrawer({
  data,
  isOpen,
  onClose,
  doctorData,
  handleDataUpdate,
}) {
  const [selectedDoctor, setSelectedDoctor] = useState(data.doctorID || "");
  const firstField = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    if (selectedDoctor != data.doctorID && selectedDoctor != "") {
      await axios.put(
        `http://localhost:8080/api/admin/admissions/${data.admissionID}`,
        { doctorID: selectedDoctor }
      );
      handleDataUpdate(toastDetails);
    }
  };

  const onDutyDoctors = doctorData.filter(
    (doctor) => doctor.doctorStatus === "A" && doctor.dutyStatus === "On Duty"
  );

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
          <DrawerHeader borderBottomWidth="1px">Assign Doctor</DrawerHeader>

          <DrawerBody>
            <Select
              placeholder="Select a doctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              ref={firstField}
              fontFamily={"Lexend"}
            >
              {onDutyDoctors.map((doctor) => (
                <option
                  key={doctor.doctorID}
                  value={doctor.doctorID}
                  style={{ fontFamily: "Lexend" }}
                >
                  {doctor.doctorName}
                </option>
              ))}
            </Select>
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
  doctorData: PropTypes.array.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
};

const toastDetails = {
  success: {
    title: "Doctor Assigned",
    description: "The doctor has been successfully assigned to the patient.",
  },
  error: {
    title: "Assignment Failed",
    description:
      "An error occurred while assigning the doctor. Please try again.",
  },
  loading: {
    title: "Assigning Doctor",
    description: "The doctor is being assigned. Please wait...",
  },
};
