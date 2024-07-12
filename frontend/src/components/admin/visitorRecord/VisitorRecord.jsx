import DataTable from "react-data-table-component";
import { visitorColumns } from "../../../utils/tableUtils";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Flex,
  Button,
  useDisclosure,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { filterVisitorData } from "../../../utils/funcUtils";
import VisitorRowDetails from "./visitorRowDetails";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import DeleteMultiDialog from "./DeleteMultiDialog";
import DeleteTimeDialog from "./DeleteTimeDialog";
import DeleteAllDialog from "./DeleteAllDialog";

export default function VisitorRecord({ theme }) {
  const [isPending, setIsPending] = useState(true);
  const [visitorData, setVisitorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRowIDs, setSelectedRowIDs] = useState([]);
  const [deleteTimePick, setDeleteTimePick] = useState("");
  const {
    isOpen: isOpenMulti,
    onOpen: onOpenMulti,
    onClose: onCloseMulti,
  } = useDisclosure();
  const {
    isOpen: isOpenTime,
    onOpen: onOpenTime,
    onClose: onCloseTime,
  } = useDisclosure();
  const {
    isOpen: isOpenAll,
    onOpen: onOpenAll,
    onClose: onCloseAll,
  } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    getVisitorData();
    getVisitorTotal();
  }, []);

  const getVisitorTotal = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/visitors/total"
      );
      const data = response.data;
      const total = data.total;
      setTotal(total);
    } catch (err) {
      console.error(err);
    }
  };

  const getVisitorData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/visitors"
      );
      const data = response.data;
      setVisitorData(data);
      setFilteredData(data);
    } catch (err) {
      console.error(err.response.data);
    } finally {
      setIsPending(false);
    }
  };

  const handleDataUpdate = async (toastDetails) => {
    const fetchAdmissionsData = async () => {
      getVisitorData();
      getVisitorTotal();
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
    const newRows = filterVisitorData(visitorData, search);
    setFilteredData(newRows);
  };

  const handleSelectedRowsChange = ({ selectedRows }) => {
    const selectedRowIDs = selectedRows.map((row) => row.visitorID);
    setSelectedRowIDs(selectedRowIDs);
  };

  const handleDelete = () => {
    setIsDelete(true);
  };

  const handleCancel = () => {
    setIsDelete(false);
    setSelectedRowIDs([]);
  };

  const handleSaveDelete = () => {
    if (selectedRowIDs.length == 0) return;
    console.log(selectedRowIDs);
    onOpenMulti();
  };

  const onOpenDeleteDialog = (time) => {
    setDeleteTimePick(time);
    onOpenTime();
  };

  return (
    <DataTable
      theme={theme}
      columns={visitorColumns}
      data={filteredData}
      progressPending={isPending}
      fixedHeader
      pagination
      highlightOnHover
      pointerOnHover
      expandableRows
      expandOnRowClicked
      expandableRowsComponent={({ data }) => (
        <VisitorRowDetails data={data} handleDataUpdate={handleDataUpdate} />
      )}
      selectableRows={isDelete}
      selectableRowsNoSelectAll
      selectableRowsRadio="checkbox"
      onSelectedRowsChange={handleSelectedRowsChange}
      clearSelectedRows={isDelete}
      subHeader
      subHeaderAlign="left"
      subHeaderComponent={
        <>
          <Flex direction="column">
            <Flex gap="8px" flexWrap="wrap" mb="8px">
              {isDelete ? (
                <>
                  <Button colorScheme="red" onClick={handleSaveDelete}>
                    Delete
                  </Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </>
              ) : (
                <Button onClick={handleDelete}>Delete By Select</Button>
              )}
              <Menu>
                <MenuButton as={Button} rightIcon={<IconChevronDown />}>
                  Delete By Time
                </MenuButton>
                <MenuList zIndex={10}>
                  <MenuItem onClick={() => onOpenDeleteDialog("1month")}>
                    More than a Month Ago
                  </MenuItem>
                  <MenuItem onClick={() => onOpenDeleteDialog("3month")}>
                    More than 3 Months Ago
                  </MenuItem>
                  <MenuItem onClick={() => onOpenDeleteDialog("6month")}>
                    More than 6 months Ago
                  </MenuItem>
                  <MenuItem onClick={() => onOpenDeleteDialog("1year")}>
                    More than a Year Ago
                  </MenuItem>
                </MenuList>
              </Menu>
              <Button colorScheme="red" onClick={onOpenAll}>
                Delete All
              </Button>
            </Flex>
            <Text size="md" mb="4px">
              Total Visitors: <b>{total}</b>
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
          <DeleteMultiDialog
            isOpen={isOpenMulti}
            onClose={onCloseMulti}
            ids={selectedRowIDs}
            handleCancel={handleCancel}
            handleDataUpdate={handleDataUpdate}
          />
          <DeleteTimeDialog
            isOpen={isOpenTime}
            onClose={onCloseTime}
            deleteTimePick={deleteTimePick}
            handleDataUpdate={handleDataUpdate}
          />
          <DeleteAllDialog
            isOpen={isOpenAll}
            onClose={onCloseAll}
            handleDataUpdate={handleDataUpdate}
          />
        </>
      }
    />
  );
}

VisitorRecord.propTypes = {
  theme: PropTypes.string.isRequired,
};
