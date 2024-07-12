import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Input,
  useToast,
  InputGroup,
  InputLeftElement,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { admissionColumns } from "../../../utils/tableUtils";
import PropTypes from "prop-types";
import AdmissionRowDetails from "./AdmissionRowDetails";
import { filterAdmissionData } from "../../../utils/funcUtils";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";

export default function AdmissionRecord({ theme, doctorData }) {
  const [isPending, setIsPending] = useState(true);
  const [admissionData, setAdmissionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState(0);
  const [admissionState, setAdmissionState] = useState(1);

  const toast = useToast();

  useEffect(() => {
    getAdmissionData();
    getAdmissionsTotal();
  }, []);

  const handleGetAdmissions = async () => {
    getAdmissionData();
    getAdmissionsTotal();
    setAdmissionState(1);
  };

  const handleGetAdmissionsNoDoctor = async () => {
    getAdmissionsNoDoctorData();
    getAdmissionsNoDoctorTotal();
    setAdmissionState(2);
  };

  const handleGetAdmissionsNotDischarge = async () => {
    getAdmissionsNotDischargeData();
    getAdmissionsNotDischargeTotal();
    setAdmissionState(3);
  };

  const getAdmissionData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/admissions"
      );
      const data = response.data;
      setAdmissionData(data);
      setFilteredData(data);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const getAdmissionsNoDoctorData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/admissions/noDoctor"
      );
      const data = response.data;
      setAdmissionData(data);
      setFilteredData(data);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const getAdmissionsNotDischargeData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/admissions/notDischarge"
      );
      const data = response.data;
      setAdmissionData(data);
      setFilteredData(data);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const getAdmissionsTotal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/admissions/total`
      );
      const data = response.data;
      const total = data.total;
      setTotal(total);
    } catch (err) {
      console.error(err);
    }
  };

  const getAdmissionsNoDoctorTotal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/admissions/noDoctor/total`
      );
      const data = response.data;
      const total = data.total;
      setTotal(total);
    } catch (err) {
      console.error(err);
    }
  };

  const getAdmissionsNotDischargeTotal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/admissions/notDischarge/total`
      );
      const data = response.data;
      const total = data.total;
      setTotal(total);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDataUpdate = async (toastDetails) => {
    const fetchAdmissionsData = async () => {
      switch (admissionState) {
        case 1:
          handleGetAdmissions();
          break;
        case 2:
          handleGetAdmissionsNoDoctor();
          break;
        case 3:
          handleGetAdmissionsNotDischarge();
          break;
        default:
          break;
      }
    };

    // Refetch admission data after successful PUT request
    try {
      toast.promise(fetchAdmissionsData(), toastDetails);
    } catch (err) {
      console.error("Error fetching admissions:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const search = e.target.value.toLowerCase();
    const newRows = filterAdmissionData(admissionData, search);
    setFilteredData(newRows);
  };

  return (
    <>
      <DataTable
        theme={theme}
        columns={admissionColumns}
        data={filteredData}
        progressPending={isPending}
        fixedHeader
        pagination
        highlightOnHover
        pointerOnHover
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={({ data }) => (
          <AdmissionRowDetails
            data={data}
            doctorData={doctorData}
            handleDataUpdate={handleDataUpdate}
          />
        )}
        subHeader
        subHeaderAlign="left"
        subHeaderComponent={
          <>
            <Flex direction="column">
              <Flex gap="8px" flexWrap="wrap" mb="8px">
                <Button onClick={handleGetAdmissions} colorScheme="blue">
                  All Admissions
                </Button>
                <Button
                  onClick={handleGetAdmissionsNoDoctor}
                  _active={{
                    bg: "#dddfe2",
                    transform: "scale(0.98)",
                    borderColor: "#bec3c9",
                  }}
                >
                  No Doctors
                </Button>
                <Button onClick={handleGetAdmissionsNotDischarge}>
                  Not Discharged
                </Button>
              </Flex>
              <Text size="md" mb="4px">
                Total Admissions: <b>{total}</b>
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
    </>
  );
}

AdmissionRecord.propTypes = {
  theme: PropTypes.string.isRequired,
  doctorData: PropTypes.array.isRequired,
};
