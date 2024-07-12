const initNewAdmissionForm = {
  firstName: "",
  lastName: "",
  middleName: "",
  dateOfBirth: "",
  sex: "",
  height: "",
  weight: "",
  maritalStatus: "",
  contactNumber: "",
  emailAddress: "",
  streetAddress: "",
  city: "",
  province: "",
  zipCode: "",
  complaints: "",
  medications: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyContactNumber: "",
};

const initReturningAdmissionForm = {
  patientID: "",
  complaints: "",
  medications: "",
};

const initPatientInfo = {
  firstName: "",
  lastName: "",
  middleName: "",
  dateOfBirth: "",
  sex: "",
  height: "",
  weight: "",
  maritalStatus: "",
  contactNumber: "",
  emailAddress: "",
  streetAddress: "",
  city: "",
  province: "",
  zipCode: "",
};

const initMedicalInfo = {
  complaints: "",
  medications: "",
};

const initEmergencyInfo = {
  emergencyName: "",
  emergencyRelationship: "",
  emergencyContactNumber: "",
};

const initPatientLoginInfo = {
  patientID: "",
  dateOfBirth: "",
  contactNumber: "",
};

const initDoctorLoginInfo = {
  doctorID: "",
  doctorPassword: "",
};

const newAdmissionSteps = [
  { title: "First", description: "Personal Information" },
  { title: "Second", description: "Medical Information" },
  { title: "Third", description: "Emergency Contact Information" },
];

const returningAdmissionSteps = [
  { title: "First", description: "Log in" },
  { title: "Second", description: "Medical Information" },
];

const initAdminLoginForm = {
  username: "",
  password: "",
};

const initDoctorForm = {
  doctorName: "",
  doctorPassword: "",
  doctorStartTime: "",
  doctorEndTime: "",
  doctorStatus: "A",
};

const initDoctorShiftForm = {
  doctorStartTime: "",
  doctorEndTime: "",
  doctorStatus: "",
};

const initVisitorForm = {
  patientID: "",
  visitorName: "",
  visitorRelationship: "",
  visitorContactNumber: "",
};

const initEditPatientForm = {
  height: "",
  weight: "",
  maritalStatus: "",
  contactNumber: "",
  emailAddress: "",
  streetAddress: "",
  city: "",
  province: "",
  zipCode: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyContactNumber: "",
};

const mockPatientData = {
  patientID: "PAT-JV-001",
  firstName: "John Paul",
  lastName: "Viado",
  middleName: "jd",
  dateOfBirth: "2003-11-20",
  sex: "M",
  height: "1.74",
  weight: "65",
  maritalStatus: "S",
  contactNumber: "09203031531",
  emailAddress: "johnpaulviado07@gmail.com",
  streetAddress: "#413 Sta. Monica St., Brgy. Bato",
  city: "Quezon City",
  province: "Metro Manila",
  zipCode: "1127",
  emergencyName: "Mother Name Viado",
  emergencyRelationship: "Mother",
  emergencyContactNumber: "09203031531",
};

const mockDoctorData = {
  doctorID: "DOC-WO-001",
  doctorName: "Willie Ong",
  doctorStartTime: "14:00:00",
  doctorEndTime: "22:00:00",
};

const mockPatientDataEdit = {
  patientID: "PAT-JV-001",
  firstName: "John Paul",
  lastName: "Viado",
  middleName: "jd",
  dateOfBirth: "2003-11-20",
  sex: "M",
  height: "2.50",
  weight: "61",
  maritalStatus: "M",
  contactNumber: "09203031531",
  emailAddress: "johnpaulviado07@gmail.com",
  streetAddress: "#413 Sta. Monica St., Brgy. Bato",
  city: "Quezon City",
  province: "Metro Manila",
  zipCode: "1127",
  emergencyName: "Name here Viado",
  emergencyRelationship: "Mother",
  emergencyContactNumber: "09203031531",
};

export {
  initNewAdmissionForm,
  initReturningAdmissionForm,
  initPatientInfo,
  initMedicalInfo,
  initEmergencyInfo,
  initPatientLoginInfo,
  initDoctorLoginInfo,
  newAdmissionSteps,
  returningAdmissionSteps,
  initAdminLoginForm,
  initDoctorForm,
  initDoctorShiftForm,
  initVisitorForm,
  mockPatientData,
  mockDoctorData,
  initEditPatientForm,
  mockPatientDataEdit,
};
