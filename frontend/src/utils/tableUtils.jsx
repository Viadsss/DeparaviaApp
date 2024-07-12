import { format } from "date-fns";
import { createTheme } from "react-data-table-component";

createTheme("chakraLight", {
  text: {
    primary: "#2D3748", // Chakra's default gray.800
    secondary: "#4A5568", // Chakra's default gray.600
  },
  background: {
    default: "#FFFFFF", // Chakra's default gray.50
  },
  context: {
    background: "#E2E8F0", // Chakra's default gray.200
    text: "#2D3748", // Chakra's default gray.800
  },
  divider: {
    default: "#CBD5E0", // Chakra's default gray.300
  },
  button: {
    default: "#3182CE", // Chakra's default blue.500
    hover: "rgba(49, 130, 206, 0.08)", // Chakra's blue.500 with opacity
    focus: "rgba(49, 130, 206, 0.24)", // Chakra's blue.500 with higher opacity
  },
  sortFocus: {
    default: "#3182CE", // Chakra's default blue.500
  },
});

createTheme("chakraDark", {
  text: {
    primary: "#E2E8F0", // Chakra's default gray.200
    secondary: "#A0AEC0", // Chakra's default gray.400
  },
  background: {
    default: "#1A202C", // Chakra's default gray.900
  },
  context: {
    background: "#2D3748", // Chakra's default gray.800
    text: "#E2E8F0", // Chakra's default gray.200
  },
  divider: {
    default: "#4A5568", // Chakra's default gray.600
  },
  button: {
    default: "#3182CE", // Chakra's default blue.500
    hover: "rgba(49, 130, 206, 0.08)", // Chakra's blue.500 with opacity
    focus: "rgba(49, 130, 206, 0.24)", // Chakra's blue.500 with higher opacity
  },
  sortFocus: {
    default: "#3182CE", // Chakra's default blue.500
  },
  selected: {
    default: "rgba(0, 0, 0, .7)",
    text: "#FFFFFF",
  },
  highlightOnHover: {
    default: "rgba(49, 130, 206, .5)",
    text: "#FFFFFF",
  },
});

const admissionColumns = [
  {
    name: "Admission ID",
    selector: (row) => row.admissionID,
    sortable: true,
    width: "250px",
  },
  {
    name: "Patient ID",
    selector: (row) => row.patientID,
    sortable: true,
  },
  {
    name: "Doctor ID",
    selector: (row) => (row.doctorID ? row.doctorID : ""),
    sortable: true,
  },
  {
    name: "Admission Date",
    selector: (row) => format(row.admissionDate, "yyyy-MM-dd"),
    sortable: true,
  },
  {
    name: "Discharge Date",
    selector: (row) =>
      row.dischargeDate ? format(row.dischargeDate, "yyyy-MM-dd") : "",
    sortable: true,
  },
  {
    name: "Complaints",
    selector: (row) => (row.complaints ? row.complaints : ""),
  },
  {
    name: "Medications",
    selector: (row) => (row.medications ? row.medications : ""),
  },
  {
    name: "Procedure",
    selector: (row) => (row.precdure ? row.procedure : ""),
  },
  {
    name: "Diagnosis",
    selector: (row) => (row.diagnosis ? row.diagnosis : ""),
  },
  // {
  //   name: "Status",
  //   selector: (row) =>
  //     row.doctorID ? (
  //       <Badge colorScheme="green">Discharged</Badge>
  //     ) : (
  //       <Badge>Admitted</Badge>
  //     ),
  //   sortable: true,
  //   width: "150px",
  // },
];

const doctorColumns = [
  {
    name: "Doctor ID",
    selector: (row) => row.doctorID,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.doctorName,
    sortable: true,
  },
  {
    name: "Start Time",
    selector: (row) => row.doctorStartTime,
    sortable: true,
  },
  {
    name: "End Time",
    selector: (row) => row.doctorEndTime,
    sortable: true,
  },
  { name: "Status", selector: (row) => row.doctorStatus, sortable: true },
];

const patientColumns = [
  {
    name: "Patient ID",
    selector: (row) => row.patientID,
    sortable: true,
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
    sortable: true,
  },
  {
    name: "Middle Name",
    selector: (row) => (row.middleName ? row.middleName : ""),
    sortable: true,
  },
  {
    name: "Date of Birth",
    selector: (row) => format(row.dateOfBirth, "yyyy-MM-dd"),
    sortable: true,
  },
  {
    name: "Sex",
    selector: (row) => row.sex,
    sortable: true,
  },
  {
    name: "Height",
    selector: (row) => row.height,
    sortable: true,
  },
  {
    name: "Weight",
    selector: (row) => row.weight,
    sortable: true,
  },
  {
    name: "Marital Status",
    selector: (row) => row.maritalStatus,
    sortable: true,
  },
  {
    name: "Contact Number",
    selector: (row) => row.contactNumber,
    sortable: true,
  },
  {
    name: "Email Address",
    selector: (row) => (row.emailAddress ? row.emailAddress : ""),
    sortable: true,
  },
  {
    name: "Street Address",
    selector: (row) => row.streetAddress,
    sortable: true,
  },
  {
    name: "City",
    selector: (row) => row.city,
    sortable: true,
  },
  {
    name: "Province",
    selector: (row) => row.province,
    sortable: true,
  },
  {
    name: "Zip Code",
    selector: (row) => row.zipCode,
    sortable: true,
  },
  {
    name: "Emergency Name",
    selector: (row) => row.emergencyName,
  },
  {
    name: "Emergency Relationship",
    selector: (row) => row.emergencyRelationship,
  },
  {
    name: "Emergency Contact Number",
    selector: (row) => row.emergencyContactNumber,
  },
];

const visitorColumns = [
  { name: "Visitor ID", selector: (row) => row.visitorID, sortable: true },
  {
    name: "Patient ID",
    selector: (row) => row.patientID,
    sortable: true,
  },
  {
    name: "Date of Visit",
    selector: (row) => format(row.visitorDate, "yyyy-MM-dd"),
    sortable: true,
  },
  {
    name: "Visitor Name",
    selector: (row) => row.visitorName,
    sortable: true,
  },
  {
    name: "Relationship",
    selector: (row) => row.visitorRelationship,
  },
  { name: "Contact Number", selector: (row) => row.visitorContactNumber },
];

const doctorDashboardColumns = [
  {
    name: "Admission ID",
    selector: (row) => row.admissionID,
    sortable: true,
    width: "250px",
  },
  {
    name: "Patient ID",
    selector: (row) => row.patientID,
    sortable: true,
  },
  {
    name: "Full Name",
    selector: (row) => row.fullName,
    sortable: true,
  },
  {
    name: "Sex",
    selector: (row) => row.sex,
    sortable: true,
  },
  {
    name: "Height",
    selector: (row) => row.height,
    sortable: true,
  },
  {
    name: "Weight",
    selector: (row) => row.weight,
    sortable: true,
  },
  {
    name: "Complaints",
    selector: (row) => (row.complaints ? row.complaints : ""),
  },
  {
    name: "Medications",
    selector: (row) => (row.medications ? row.medications : ""),
  },
  {
    name: "Procedure",
    selector: (row) => (row.procedure ? row.procedure : ""),
  },
  {
    name: "Diagnosis",
    selector: (row) => (row.diagnosis ? row.diagnosis : ""),
  },
];

const patientDashBoardAdmissionsColumns = [
  {
    name: "Admission ID",
    selector: (row) => row.admissionID,
    sortable: true,
  },
  {
    name: "Doctor Name",
    selector: (row) => row.doctorName,
    sortable: true,
  },
  {
    name: "Complaints",
    selector: (row) => (row.complaints ? row.complaints : ""),
  },
  {
    name: "Medications",
    selector: (row) => (row.medications ? row.medications : ""),
  },
  {
    name: "Procedure",
    selector: (row) => (row.procedure ? row.procedure : ""),
  },
  {
    name: "Diagnosis",
    selector: (row) => (row.diagnosis ? row.diagnosis : ""),
  },
  {
    name: "Admission Date",
    selector: (row) =>
      row.admissionDate ? format(row.admissionDate, "yyyy-MM-dd") : "",
    sortable: true,
  },
  {
    name: "Discharge Date",
    selector: (row) =>
      row.dischargeDate ? format(row.dischargeDate, "yyyy-MM-dd") : "",
    sortable: true,
  },
];

const patientDashBoardVisitorColumns = [
  {
    name: "Visitor Name",
    selector: (row) => row.visitorName,
    sortable: true,
  },
  {
    name: "Relationship",
    selector: (row) => row.visitorRelationship,
    sortable: true,
  },
  {
    name: "Contact Number",
    selector: (row) => row.visitorContactNumber,
  },
  {
    name: "Date of Visit",
    selector: (row) => format(row.visitorDate, "yyyy-MM-dd"),
    sortable: true,
  },
];

export {
  admissionColumns,
  doctorColumns,
  patientColumns,
  visitorColumns,
  doctorDashboardColumns,
  patientDashBoardAdmissionsColumns,
  patientDashBoardVisitorColumns,
};
