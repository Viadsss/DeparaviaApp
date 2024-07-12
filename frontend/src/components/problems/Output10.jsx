import { Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Output10() {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState([]);
  const theme = useColorModeValue("chakraLight", "chakraDark");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/problem/10");
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
            <b>doctorID:</b> {data.doctorID}
          </Text>
          <Text>
            <b>doctorName:</b> {data.doctorName}
          </Text>
          <Text>
            <b>avgStayDuration:</b> {data.avgStayDuration}
          </Text>
        </>
      )}
    />
  );
}

const columns = [
  {
    name: "doctorID",
    selector: (row) => row.doctorID,
    sortable: true,
  },
  {
    name: "doctorName",
    selector: (row) => row.doctorName,
    sortable: true,
  },
  {
    name: "avgStayDuration",
    selector: (row) => row.avgStayDuration,
    sortable: true,
  },
];
