import { Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Output6() {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState([]);
  const theme = useColorModeValue("chakraLight", "chakraDark");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/problem/6");
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
            <b>city:</b> {data.city}
          </Text>
          <Text>
            <b>avg_weight:</b> {data.avg_weight}
          </Text>
        </>
      )}
    />
  );
}

const columns = [
  {
    name: "city",
    selector: (row) => row.city,
    sortable: true,
  },
  {
    name: "avg_weight",
    selector: (row) => row.avg_weight,
    sortable: true,
  },
];
