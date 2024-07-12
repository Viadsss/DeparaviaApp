import { Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Output8() {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState([]);
  const theme = useColorModeValue("chakraLight", "chakraDark");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/problem/8");
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
            <b>visitorName:</b> {data.visitorName}
          </Text>
          <Text>
            <b>total_visits:</b> {data.total_visits}
          </Text>
        </>
      )}
    />
  );
}

const columns = [
  {
    name: "visitorName",
    selector: (row) => row.visitorName,
    sortable: true,
  },
  { name: "total_visits", selector: (row) => row.total_visits, sortable: true },
];
