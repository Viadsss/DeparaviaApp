import { parse, format } from "date-fns";

const convertTimeString = (timeString) => {
  const date = parse(timeString, "HH:mm:ss", new Date());
  return format(date, "h:mm a");
};

const getMaritalDesc = (status) => {
  switch (status) {
    case "S":
      return "Single";
    case "M":
      return "Married";
    case "D":
      return "Divorced";
    case "L":
      return "Legally Separated";
    case "W":
      return "Widowed";
    default:
      return "Unknown";
  }
};

const filterDoctorData = (data, search) => {
  return data.filter((row) => {
    const doctorID =
      row.doctorID && row.doctorID.toLowerCase().includes(search);
    const doctorName =
      row.doctorName && row.doctorName.toLowerCase().includes(search);
    const doctorStartTime =
      row.doctorStartTime && row.doctorStartTime.toLowerCase().includes(search);
    const doctorEndTime =
      row.doctorEndTime && row.doctorEndTime.toLowerCase().includes(search);

    // Return true if any of the fields match the search term
    return doctorID || doctorName || doctorStartTime || doctorEndTime;
  });
};

const filterAdmissionData = (data, search) => {
  return data.filter((row) => {
    const admissionID =
      row.admissionID && row.admissionID.toLowerCase().includes(search);
    const patientID =
      row.patientID && row.patientID.toLowerCase().includes(search);
    const doctorID =
      row.doctorID && row.doctorID.toLowerCase().includes(search);
    const admissionDate =
      row.admissionDate &&
      format(row.admissionDate, "yyyy-MM-dd").toLowerCase().includes(search);
    const dischargeDate =
      row.dischargeDate &&
      format(row.dischargeDate, "yyyy-MM-dd").toLowerCase().includes(search);
    const complaints =
      row.complaints && row.complaints.toLowerCase().includes(search);
    const medications =
      row.medications && row.medications.toLowerCase().includes(search);
    const procedure =
      row.procedure && row.procedure.toLowerCase().includes(search);

    const diagnosis =
      row.diagnosis && row.diagnosis.toLowerCase().includes(search);

    // Return true if any of the fields match the search term
    return (
      admissionID ||
      patientID ||
      doctorID ||
      admissionDate ||
      dischargeDate ||
      complaints ||
      medications ||
      procedure ||
      diagnosis
    );
  });
};

const filterPatientData = (data, search) => {
  return data.filter((row) => {
    const patientID =
      row.patientID && row.patientID.toLowerCase().includes(search);
    const firstName =
      row.firstName && row.firstName.toLowerCase().includes(search);
    const lastName =
      row.lastName && row.lastName.toLowerCase().includes(search);
    const middleName =
      row.middleName && row.middleName.toLowerCase().includes(search);
    const dateOfBirth =
      row.dateOfBirth &&
      format(row.dateOfBirth, "yyyy-MM-dd").toLowerCase().includes(search);
    const sex = row.sex && row.sex.toLowerCase().includes(search);
    const height = row.height && row.height.toLowerCase().includes(search);
    const weight =
      row.weight && row.weight.toString().toLowerCase().includes(search);
    const maritalStatus =
      row.maritalStatus && row.maritalStatus.toLowerCase().includes(search);
    const contactNumber =
      row.contactNumber && row.contactNumber.toLowerCase().includes(search);
    const emailAddress =
      row.emailAddress && row.emailAddress.toLowerCase().includes(search);
    const streetAddress =
      row.streetAddress && row.streetAddress.toLowerCase().includes(search);
    const city = row.city && row.city.toLowerCase().includes(search);
    const province =
      row.province && row.province.toLowerCase().includes(search);
    const zipCode =
      row.zipCode && row.zipCode.toString().toLowerCase().includes(search);
    const emergencyName =
      row.emergencyName && row.emergencyName.toLowerCase().includes(search);
    const emergencyRelationship =
      row.emergencyRelationship &&
      row.emergencyRelationship.toLowerCase().includes(search);
    const emergencyContactNumber =
      row.emergencyContactNumber &&
      row.emergencyContactNumber.toLowerCase().includes(search);

    // Return true if any of the fields match the search term
    return (
      patientID ||
      firstName ||
      lastName ||
      middleName ||
      dateOfBirth ||
      sex ||
      height ||
      weight ||
      maritalStatus ||
      contactNumber ||
      emailAddress ||
      streetAddress ||
      city ||
      province ||
      zipCode ||
      emergencyName ||
      emergencyRelationship ||
      emergencyContactNumber
    );
  });
};

const filterVisitorData = (data, search) => {
  return data.filter((row) => {
    const visitorID =
      row.visitorID && row.visitorID.toString().toLowerCase().includes(search);
    const patientID =
      row.patientID && row.patientID.toLowerCase().includes(search);
    const visitorDate =
      row.visitorDate &&
      format(row.visitorDate, "yyyy-MM-dd").toLowerCase().includes(search);
    const visitorName =
      row.visitorName && row.visitorName.toLowerCase().includes(search);
    const visitorRelationship =
      row.visitorRelationship &&
      row.visitorRelationship.toLowerCase().includes(search);
    const visitorContactNumber =
      row.visitorContactNumber &&
      row.visitorContactNumber.toLowerCase().includes(search);

    // Return true if any of the fields match the search term
    return (
      visitorID ||
      patientID ||
      visitorDate ||
      visitorName ||
      visitorRelationship ||
      visitorContactNumber
    );
  });
};

const filterDoctorTableData = (data, search) => {
  return data.filter((row) => {
    const patientID =
      row.patientID && row.patientID.toLowerCase().includes(search);
    const fullName =
      row.fullName && row.fullName.toLowerCase().includes(search);
    const sex = row.sex && row.sex.toLowerCase().includes(search);
    const height = row.height && row.height.toLowerCase().includes(search);
    const weight = row.weight && row.weight.toLowerCase().includes(search);
    const complaints =
      row.complaints && row.complaints.toLowerCase().includes(search);
    const medications =
      row.medications && row.medications.toLowerCase().includes(search);
    const procedure =
      row.procedure && row.procedure.toLowerCase().includes(search);
    const diagnosis =
      row.diagnosis && row.diagnosis.toLowerCase().includes(search);

    return (
      patientID ||
      fullName ||
      sex ||
      height ||
      weight ||
      complaints ||
      medications ||
      procedure ||
      diagnosis
    );
  });
};

const filterPatientAdmissionsData = (data, search) => {
  return data.filter((row) => {
    const admissionID =
      row.admissionID && row.admissionID.toLowerCase().includes(search);
    const doctorName =
      row.doctorName && row.doctorName.toLowerCase().includes(search);
    const complaints =
      row.complaints && row.complaints.toLowerCase().includes(search);
    const medications =
      row.medications && row.medications.toLowerCase().includes(search);
    const procedure =
      row.procedure && row.procedure.toLowerCase().includes(search);
    const diagnosis =
      row.diagnosis && row.diagnosis.toLowerCase().includes(search);
    const admissionDate =
      row.admissionDate &&
      format(row.admissionDate, "yyyy-MM-dd").toLowerCase().includes(search);
    const dischargeDate =
      row.dischargeDate &&
      format(row.dischargeDate, "yyyy-MM-dd").toLowerCase().includes(search);

    return (
      admissionID ||
      doctorName ||
      complaints ||
      medications ||
      procedure ||
      diagnosis ||
      admissionDate ||
      dischargeDate
    );
  });
};

const filterPatientVisitorsData = (data, search) => {
  return data.filter((row) => {
    const visitorName =
      row.visitorName && row.visitorName.toLowerCase().includes(search);
    const visitorRelationship =
      row.visitorRelationship &&
      row.visitorRelationship.toLowerCase().includes(search);
    const visitorContactNumber =
      row.visitorContactNumber &&
      row.visitorContactNumber.toLowerCase().includes(search);
    const visitorDate =
      row.visitorDate &&
      format(row.visitorDate, "yyyy-MM-dd").toLowerCase().includes(search);
    // Return true if any of the fields match the search term
    return (
      visitorDate || visitorName || visitorRelationship || visitorContactNumber
    );
  });
};

export {
  convertTimeString,
  getMaritalDesc,
  filterAdmissionData,
  filterDoctorData,
  filterPatientData,
  filterVisitorData,
  filterDoctorTableData,
  filterPatientAdmissionsData,
  filterPatientVisitorsData,
};
