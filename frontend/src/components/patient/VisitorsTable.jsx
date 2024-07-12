import { useEffect, useState } from "react";
import { patientDashBoardVisitorColumns } from "../../utils/tableUtils";
import { filterPatientVisitorsData } from "../../utils/funcUtils";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";
import VisitorRowDetails from "./VisitorRowDetails";
import axios from "axios";

export default function VisitorsTable({ patientID }) {
  const [isPending, setIsPending] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalVisitors, setTotalVisitors] = useState(0);

  const theme = useColorModeValue("chakraLight", "chakraDark");

  useEffect(() => {
    getTableData(patientID);
    getTotalVisitors(patientID);
  }, [patientID]);

  const getTableData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/patient/${id}/visitors`
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

  const getTotalVisitors = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/patient/${id}/visitors/total`
      );
      const data = response.data;
      const total = data.total;
      setTotalVisitors(total);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const search = e.target.value.toLowerCase();
    const newRows = filterPatientVisitorsData(tableData, search);
    setFilteredData(newRows);
  };

  return (
    <DataTable
      theme={theme}
      columns={patientDashBoardVisitorColumns}
      data={filteredData}
      progressPending={isPending}
      title="Visit History"
      fixedHeader
      pagination
      highlightOnHover
      pointerOnHover
      expandableRows
      expandOnRowClicked
      expandableRowsComponent={({ data }) => <VisitorRowDetails data={data} />}
      subHeader
      subHeaderAlign="left"
      subHeaderComponent={
        <>
          <Text size="md" mb="4px">
            Total Visitors: <b>{totalVisitors}</b>
          </Text>
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
  );
}

VisitorsTable.propTypes = {
  patientID: PropTypes.string.isRequired,
};
