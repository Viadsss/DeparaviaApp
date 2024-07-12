import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { getMaritalDesc } from "../../utils/funcUtils";
import { format } from "date-fns";

export default function Profile({ data }) {
  return (
    <Box>
      <Box>
        <Heading mb="16px">
          Welcome {data.firstName}{" "}
          {data.middleName
            ? data.middleName.charAt(0).toUpperCase().concat(".")
            : null}{" "}
          {data.lastName}!
        </Heading>
        <Badge mb="32px">{data.patientID}</Badge>
      </Box>
      <Flex direction={{ base: "column", md: "row" }} columnGap="24px">
        <Box pb="24px" flex="1">
          <Heading size="md" pb="8px">
            Personal Information
          </Heading>
          <Box pl="16px">
            <Text>
              <strong>Date of Birth:</strong>{" "}
              {format(data.dateOfBirth, "MMMM d, yyyy")}
            </Text>
            <Text>
              <strong>Sex:</strong> {data.sex === "M" ? "Male" : "Female"}
            </Text>
            <Text>
              <strong>Height:</strong> {data.height}
            </Text>
            <Text>
              <strong>Weight:</strong> {data.weight}
            </Text>
            <Text>
              <strong>Marital Status:</strong>{" "}
              {getMaritalDesc(data.maritalStatus)}
            </Text>
            <Text>
              <strong>Contact Number:</strong> {data.contactNumber}
            </Text>
            <Text>
              <strong>Email Address:</strong> {data.emailAddress}
            </Text>
            <Text>
              <strong>Address:</strong> {data.streetAddress}, {data.city},{" "}
              {data.province}
            </Text>
          </Box>
        </Box>
        <Box flex="1">
          <Heading size="md" pb="8px">
            Emergency Information
          </Heading>
          <Box pl="16px">
            <Text>
              <strong>Name:</strong> {data.emergencyName}
            </Text>
            <Text>
              <strong>Relationship:</strong> {data.emergencyRelationship}
            </Text>
            <Text>
              <strong>Contact Number:</strong> {data.emergencyContactNumber}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

Profile.propTypes = {
  data: PropTypes.object.isRequired,
};
