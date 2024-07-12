import { Box, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { getMaritalDesc } from "../../../utils/funcUtils";

export default function PatientRowDetails({ data }) {
  return (
    <>
      <Box py="12px">
        <Text>
          <strong>Patient ID:</strong> {data.patientID}
        </Text>
        <Text>
          <strong>Name:</strong> {data.lastName}, {data.firstName}{" "}
          {data.middleName}
        </Text>
        <Text>
          <strong>Date of Birth:</strong>{" "}
          {format(data.dateOfBirth, "MMMM d, yyyy")}
        </Text>
        <Text>
          <strong>Sex:</strong> {data.sex === "M" ? "Male" : "Female"}
        </Text>
        <Text>
          <strong>Height:</strong> {data.height} m
        </Text>
        <Text>
          <strong>Weight:</strong> {data.weight} kg
        </Text>
        <Text>
          <strong>Marital Status:</strong> {getMaritalDesc(data.maritalStatus)}
        </Text>
        <Text>
          <strong>Contact Number:</strong> {data.contactNumber}
        </Text>
        <Text>
          <strong>Email Address:</strong> {data.emailAddress}
        </Text>
        <Text>
          <strong>Street Address:</strong> {data.streetAddress}
        </Text>
        <Text>
          <strong>City:</strong> {data.city}
        </Text>
        <Text>
          <strong>Province:</strong> {data.province}
        </Text>
        <Text>
          <strong>Zip Code:</strong> {data.zipCode}
        </Text>
        <Text>
          <strong>Emergency Contact Name:</strong> {data.emergencyName}
        </Text>
        <Text>
          <strong>Emergency Contact Relationship:</strong>{" "}
          {data.emergencyRelationship}
        </Text>
        <Text>
          <strong>Emergency Contact Number:</strong>{" "}
          {data.emergencyContactNumber}
        </Text>
      </Box>
    </>
  );
}

PatientRowDetails.propTypes = {
  data: PropTypes.object.isRequired,
};
