import { Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Output5() {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState([]);
  const theme = useColorModeValue("chakraLight", "chakraDark");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/problem/5");
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
            <b>visitorRelationship:</b> {data.visitorRelationship}
          </Text>
          <Text>
            <b>visitorCount:</b> {data.visitorCount}
          </Text>
        </>
      )}
    />
  );
}

const columns = [
  {
    name: "visitorRelationship",
    selector: (row) => row.visitorRelationship,
    sortable: true,
  },
  { name: "visitorCount", selector: (row) => row.visitorCount, sortable: true },
];
