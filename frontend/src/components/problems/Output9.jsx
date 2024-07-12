import { Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Output9() {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState([]);
  const theme = useColorModeValue("chakraLight", "chakraDark");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/problem/9");
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
            <b>patientID:</b> {data.patientID}
          </Text>
          <Text>
            <b>firstName:</b> {data.firstName}
          </Text>
          <Text>
            <b>lastName:</b> {data.lastName}
          </Text>
          <Text>
            <b>total_admissions:</b> {data.total_admissions}
          </Text>
          <Text>
            <b>most_recent_admission:</b>{" "}
            {format(data.most_recent_admission, "yyyy-MM-dd")}
          </Text>
        </>
      )}
    />
  );
}

const columns = [
  {
    name: "patientID",
    selector: (row) => row.patientID,
    sortable: true,
  },
  {
    name: "firstName",
    selector: (row) => row.firstName,
    sortable: true,
  },
  {
    name: "lastName",
    selector: (row) => row.lastName,
    sortable: true,
  },
  {
    name: "total_admissions",
    selector: (row) => row.total_admissions,
    sortable: true,
  },
  {
    name: "most_recent_admission",
    selector: (row) => format(row.most_recent_admission, "yyyy-MM-dd"),
    sortable: true,
  },
];
