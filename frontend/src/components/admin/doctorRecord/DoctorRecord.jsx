import DataTable from "react-data-table-component";
import PropTypes from "prop-types";
import { doctorColumns } from "../../../utils/tableUtils";
import DoctorRowDetails from "./DoctorRowDetails";
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IconSearch, IconUserPlus } from "@tabler/icons-react";
import AddDrawer from "./AddDrawer";
import { useEffect, useState } from "react";
import axios from "axios";
import { filterDoctorData } from "../../../utils/funcUtils";

export default function DoctorRecord({ theme, updateAdmissionDoctors }) {
  const [isPending, setIsPending] = useState(true);
  const [doctorData, setDoctorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState(0);
  const [doctorState, setDoctorState] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    getDoctorsData();
    getDoctorsTotal();
  }, []);

  const handleGetDoctors = async () => {
    getDoctorsData();
    getDoctorsTotal();
    setDoctorState(1);
  };

  const handleGetOnDutyDoctors = async () => {
    getDoctorsOnDutyData();
    getDoctorsOnDutyTotal();
    setDoctorState(2);
  };

  const handleGetOffDutyDoctors = async () => {
    getDoctorsOffDutyData();
    getDoctorsOffDutyTotal();
    setDoctorState(3);
  };

  const handleGetActiveDoctors = async () => {
    getDoctorsActiveData();
    getDoctorsActiveTotal();
    setDoctorState(4);
  };

  const handleGetInactiveDoctors = async () => {
    getDoctorsInactiveData();
    getDoctorsInactiveTotal();
    setDoctorState(5);
  };

  const handleGetOnLeaveDoctors = async () => {
    getDoctorsOnLeaveData();
    getDoctorsOnLeaveTotal();
    setDoctorState(6);
  };

  const getDoctorsData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/doctors"
      );
      const data = response.data;
      setDoctorData(data);
      setFilteredData(data);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const getDoctorsOnDutyData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/doctors/onDuty"
      );
      const data = response.data;
      setDoctorData(data);
      setFilteredData(data);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const getDoctorsOffDutyData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/doctors/offDuty"
      );
      const data = response.data;
      setDoctorData(data);
      setFilteredData(data);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const getDoctorsActiveData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/doctors/active"
      );
      const data = response.data;
      setDoctorData(data);
      setFilteredData(data);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const getDoctorsInactiveData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/doctors/inactive"
      );
      const data = response.data;
      setDoctorData(data);
      setFilteredData(data);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const getDoctorsOnLeaveData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/doctors/onLeave"
      );
      const data = response.data;
      setDoctorData(data);
      setFilteredData(data);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const getDoctorsTotal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/doctors/total`
      );
      const data = response.data;
      const total = data.total;
      setTotal(total);
    } catch (err) {
      console.error(err);
    }
  };

  const getDoctorsOnDutyTotal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/doctors/onDuty/total`
      );
      const data = response.data;
      const total = data.total;
      setTotal(total);
    } catch (err) {
      console.error(err);
    }
  };

  const getDoctorsOffDutyTotal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/doctors/offDuty/total`
      );
      const data = response.data;
      const total = data.total;
      setTotal(total);
    } catch (err) {
      console.error(err);
    }
  };

  const getDoctorsActiveTotal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/doctors/active/total`
      );
      const data = response.data;
      const total = data.total;
      setTotal(total);
    } catch (err) {
      console.error(err);
    }
  };

  const getDoctorsInactiveTotal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/doctors/inactive/total`
      );
      const data = response.data;
      const total = data.total;
      setTotal(total);
    } catch (err) {
      console.error(err);
    }
  };

  const getDoctorsOnLeaveTotal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/doctors/onLeave/total`
      );
      const data = response.data;
      const total = data.total;
      setTotal(total);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDataUpdate = async (toastDetails) => {
    const fetchDoctorsData = async () => {
      switch (doctorState) {
        case 1:
          handleGetDoctors();
          break;
        case 2:
          handleGetOnDutyDoctors();
          break;
        case 3:
          handleGetOffDutyDoctors();
          break;
        case 4:
          handleGetActiveDoctors();
          break;
        case 5:
          handleGetInactiveDoctors();
          break;
        case 6:
          handleGetOnLeaveDoctors();
          break;
        default:
          break;
      }
      updateAdmissionDoctors();
    };

    // Refetch admission data after successful PUT request
    try {
      toast.promise(fetchDoctorsData(), toastDetails);
    } catch (err) {
      console.error("Error fetching admissions:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const search = e.target.value.toLowerCase();
    const newRows = filterDoctorData(doctorData, search);
    setFilteredData(newRows);
  };

  const handleClick = () => {
    onOpen();
  };

  return (
    <>
      <DataTable
        theme={theme}
        columns={doctorColumns}
        data={filteredData}
        progressPending={isPending}
        fixedHeader
        pagination
        highlightOnHover
        pointerOnHover
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={({ data }) => (
          <DoctorRowDetails data={data} handleDoctorUpdate={handleDataUpdate} />
        )}
        subHeader
        subHeaderAlign="left"
        subHeaderComponent={
          <>
            <Flex
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Flex gap="8px" flexWrap="wrap" mb="8px">
                <IconButton
                  onClick={handleClick}
                  colorScheme="green"
                  icon={<IconUserPlus />}
                  mb="12px"
                />
                <Button onClick={handleGetDoctors}>All Doctors</Button>
                <Button onClick={handleGetOnDutyDoctors}>On Duty</Button>
                <Button onClick={handleGetOffDutyDoctors}>Off Duty</Button>
                <Button onClick={handleGetActiveDoctors} colorScheme="green">
                  Active
                </Button>
                <Button onClick={handleGetInactiveDoctors} colorScheme="red">
                  Inactive
                </Button>
                <Button onClick={handleGetOnLeaveDoctors} colorScheme="yellow">
                  On Leave
                </Button>
              </Flex>
              <Text size="md" mb="4px">
                Total Doctors: <b>{total}</b>
              </Text>
            </Flex>
            <InputGroup>
              <InputLeftElement width="3rem">
                <IconSearch />
              </InputLeftElement>
              <Input
                pl="3rem"
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
          </>
        }
      />
      <AddDrawer
        isOpen={isOpen}
        onClose={onClose}
        handleDoctorUpdate={handleDataUpdate}
      />
    </>
  );
}

DoctorRecord.propTypes = {
  theme: PropTypes.string.isRequired,
  updateAdmissionDoctors: PropTypes.func.isRequired,
};
