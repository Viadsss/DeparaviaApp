import { Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Output3() {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState([]);
  const theme = useColorModeValue("chakraLight", "chakraDark");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/problem/3");
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
            <b>firstName:</b> {data.firstname}
          </Text>
          <Text>
            <b>lastName:</b> {data.lastName}
          </Text>
          <Text>
            <b>middleName:</b> {data.middleName}
          </Text>
          <Text>
            <b>dateOfBirth:</b> {format(data.dateOfBirth, "yyyy-MM-dd")}
          </Text>
          <Text>
            <b>sex:</b> {data.sex}
          </Text>
          <Text>
            <b>height:</b> {data.height}
          </Text>
          <Text>
            <b>weight:</b> {data.weight}
          </Text>
          <Text>
            <b>maritalStatus:</b> {data.maritalStatus}
          </Text>
          <Text>
            <b>contactNumber:</b> {data.contactNumber}
          </Text>
          <Text>
            <b>emailAddress:</b> {data.emailAddress}
          </Text>
          <Text>
            <b>streetAddress:</b> {data.streetAddress}
          </Text>
          <Text>
            <b>city:</b> {data.city}
          </Text>
          <Text>
            <b>province:</b> {data.province}
          </Text>
          <Text>
            <b>zipCode:</b> {data.zipCode}
          </Text>
          <Text>
            <b>emergencyName:</b> {data.emergencyName}
          </Text>
          <Text>
            <b>emergencyRelationship:</b> {data.emergencyRelationship}
          </Text>
          <Text>
            <b>emergencyContactNumber:</b> {data.emergencyContactNumber}
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
  { name: "firstName", selector: (row) => row.firstName, sortable: true },
  {
    name: "lastName",
    selector: (row) => row.lastName,
    sortable: true,
  },
  {
    name: "middleName",
    selector: (row) => row.middleName,
    sortable: true,
  },
  {
    name: "dateOfBirth",
    selector: (row) => format(row.dateOfBirth, "yyyy-MM-dd"),
    sortable: true,
  },
  {
    name: "sex",
    selector: (row) => row.sex,
    sortable: true,
  },
  {
    name: "height",
    selector: (row) => row.height,
    sortable: true,
  },
  {
    name: "weight",
    selector: (row) => row.weight,
    sortable: true,
  },
  {
    name: "maritalStatus",
    selector: (row) => row.maritalStatus,
    sortable: true,
  },
  {
    name: "contactNumber",
    selector: (row) => row.contactNumber,
    sortable: true,
  },
  {
    name: "emailAddress",
    selector: (row) => row.emailAddress,
    sortable: true,
  },
  {
    name: "streetAddress",
    selector: (row) => row.streetAddress,
    sortable: true,
  },
  {
    name: "city",
    selector: (row) => row.city,
    sortable: true,
  },
  {
    name: "province",
    selector: (row) => row.province,
    sortable: true,
  },
  {
    name: "zipCode",
    selector: (row) => row.zipCode,
    sortable: true,
  },
  {
    name: "emergencyName",
    selector: (row) => row.emergencyName,
    sortable: true,
  },
  {
    name: "emergencyRelationship",
    selector: (row) => row.emergencyRelationship,
    sortable: true,
  },
  {
    name: "emergencyContactNumber",
    selector: (row) => row.emergencyContactNumber,
    sortable: true,
  },
];
