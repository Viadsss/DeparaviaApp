import { useEffect, useState } from "react";
import { doctorDashboardColumns } from "../../utils/tableUtils";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import TableRowDetails from "./TableRowDetails";
import { filterDoctorTableData } from "../../utils/funcUtils";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";

export default function PatientsTable({ doctorID }) {
  const [isPending, setIsPending] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.600");
  const theme = useColorModeValue("chakraLight", "chakraDark");
  const toast = useToast();

  useEffect(() => {
    const getTableData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/doctor/${doctorID}`
        );
        const data = response.data;
        setTableData(data);
        setFilteredData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsPending(false);
      }
    };

    getTableData();
  }, [doctorID]);

  const handleDataUpdate = async (toastDetails) => {
    const fetchTableData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/doctor/${doctorID}`
      );
      const data = response.data;
      setTableData(data);
      setFilteredData(data);
      setSearchTerm("");
    };

    try {
      toast.promise(fetchTableData(), toastDetails);
    } catch (err) {
      console.error("Error fetching admissions:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const search = e.target.value.toLowerCase();
    const newRows = filterDoctorTableData(tableData, search);
    setFilteredData(newRows);
  };

  return (
    <Box
      p="1rem"
      bg={bgCard}
      border="1px"
      borderColor={borderCard}
      rounded="lg"
    >
      <DataTable
        theme={theme}
        columns={doctorDashboardColumns}
        data={filteredData}
        progressPending={isPending}
        fixedHeader
        pagination
        highlightOnHover
        pointerOnHover
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={({ data }) => (
          <TableRowDetails
            doctorID={doctorID}
            data={data}
            handleDataUpdate={handleDataUpdate}
          />
        )}
        subHeader
        subHeaderAlign="left"
        subHeaderComponent={
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
        }
      />
    </Box>
  );
}

PatientsTable.propTypes = {
  doctorID: PropTypes.string.isRequired,
};
