import { Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Output2() {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState([]);
  const theme = useColorModeValue("chakraLight", "chakraDark");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/problem/2");
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.error(err.response.data);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <DataTable
      theme={theme}
      columns={columns}
      data={data}
      progressPending={isPending}
      pagination
      highlightOnHover
      pointerOnHover
      expandableRows
      expandOnRowClicked
      expandableRowsComponent={({ data }) => (
        <>
          <Text>
            <b>doctorName:</b> {data.doctorName}
          </Text>
          <Text>
            <b>doctorStartTime:</b> {data.doctorStartTime}
          </Text>
        </>
      )}
    />
  );
}

const columns = [
  {
    name: "doctorName",
    selector: (row) => row.doctorName,
    sortable: true,
  },
  {
    name: "doctorStartTime",
    selector: (row) => row.doctorStartTime,
    sortable: true,
  },
];
