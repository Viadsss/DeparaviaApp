const alphabetRegex = /^[a-zA-Z\s]+$/;
const nameRegex = /^[a-zA-Z\s.,]+$/;
const numberRegex = /^\d+$/;

// Admission Page
function validatePatientInfo(formData) {
  const errors = {};

  if (!formData.firstName.match(alphabetRegex)) {
    errors.firstName = "Only alphabetic characters allowed";
  } else if (formData.firstName.length > 30) {
    errors.firstName = `First name must have 30 characters or less, current length: ${formData.firstName.length}`;
  }

  if (!formData.lastName.match(alphabetRegex)) {
    errors.lastName = "Only alphabetic characters allowed";
  } else if (formData.lastName.length > 30) {
    errors.lastName = `Last name must have 30 characters or less, current length: ${formData.lastName.length}`;
  }

  if (formData.middleName) {
    if (!formData.middleName.match(alphabetRegex)) {
      errors.middleName = "Only alphabetic characters allowed";
    } else if (formData.middleName.length > 30) {
      errors.middleName = `Middle name must have 30 characters or less, current length: ${formData.middleName.length}`;
    }
  }

  if (!formData.contactNumber.match(numberRegex)) {
    errors.contactNumber = "Only numbers are allowed";
  } else if (formData.contactNumber.length != 11) {
    errors.contactNumber = "Contact number must be 11 digits long";
  }

  if (formData.emailAddress.length > 100) {
    errors.emailAddress = `Email address must have 100 characters or less, current length: ${formData.emailAddress.length}`;
  }

  if (formData.streetAddress.length > 100) {
    errors.streetAddress = `Email address must have 100 characters or less, current length: ${formData.streetAddress.length}`;
  }

  if (!formData.city.match(alphabetRegex)) {
    errors.city = "Only alphabetic characters allowed";
  } else if (formData.city.length > 30) {
    errors.city = `City must have 30 characters or less, current length: ${formData.city.length}`;
  }

  if (!formData.province.match(alphabetRegex)) {
    errors.province = "Only alphabetic characters allowed";
  } else if (formData.province.length > 30) {
    errors.province = `Province must have 30 characters or less, current length: ${formData.province.length}`;
  }

  if (!formData.zipCode.match(numberRegex)) {
    errors.zipCode = "Only numbers are allowed";
  } else if (formData.zipCode.length != 4) {
    errors.zipCode = "Zip code must be 4 digits long";
  }

  return errors;
}

function validateMedicalInfo(formData) {
  const errors = {};

  if (formData.complaints.length > 150) {
    errors.complaints = `Complaints must have 150 characters or less, current length: ${formData.complaints.length}`;
  }

  if (formData.medications.length > 150) {
    errors.medications = `Complaints must have 150 characters or less, current length: ${formData.medications.length}`;
  }

  return errors;
}

function validateEmergencyInfo(formData) {
  const errors = {};

  if (!formData.emergencyName.match(nameRegex)) {
    errors.emergencyName =
      "Only alphabetic characters, period (.), and comma (,) are allowed";
  } else if (formData.emergencyName.length > 60) {
    errors.emergencyName = `Name must have 60 characters or less, current length: ${formData.emergencyName.length}`;
  }

  if (!formData.emergencyRelationship.match(alphabetRegex)) {
    errors.emergencyRelationship = "Only alphabetic characters allowed";
  } else if (formData.emergencyRelationship.length > 30) {
    errors.emergencyRelationship = `Relationship must have 30 characters or less, current length: ${formData.emergencyRelationship.length}`;
  }

  if (!formData.emergencyContactNumber.match(numberRegex)) {
    errors.emergencyContactNumber = "Only numbers are allowed";
  } else if (formData.emergencyContactNumber.length != 11) {
    errors.emergencyContactNumber = "Contact number must be 11 digits long";
  }

  return errors;
}

// Admin
function validateDoctorInfo(formData) {
  const errors = {};

  if (!formData.doctorName.match(nameRegex)) {
    errors.doctorName =
      "Only alphabetic characters, period (.), and comma (,) are allowed";
  } else if (formData.doctorName.length > 60) {
    errors.doctorName = `Name must have 60 characters or less, current length: ${formData.doctorName.length}`;
  }

  return errors;
}

// Visitor
function validateVisitorInfo(formData) {
  const errors = {};

  if (!formData.visitorName.match(nameRegex)) {
    errors.visitorName =
      "Only alphabetic characters, period (.), and comma (,) are allowed";
  } else if (formData.visitorName.length > 60) {
    errors.visitorName = `Name must have 60 characters or less, current length: ${formData.visitorName.length}`;
  }

  if (!formData.visitorRelationship.match(alphabetRegex)) {
    errors.visitorRelationship = "Only alphabetic characters allowed";
  } else if (formData.visitorRelationship.length > 30) {
    errors.visitorRelationship = `Relationship must have 30 characters or less, current length: ${formData.visitorRelationship.length}`;
  }

  if (!formData.visitorContactNumber.match(numberRegex)) {
    errors.visitorContactNumber = "Only numbers are allowed";
  } else if (formData.visitorContactNumber.length != 11) {
    errors.visitorContactNumber = "Contact number must be 11 digits long";
  }

  return errors;
}

function validatePatientEditInfo(formData) {
  const errors = {};

  if (!formData.contactNumber.match(numberRegex)) {
    errors.contactNumber = "Only numbers are allowed";
  } else if (formData.contactNumber.length != 11) {
    errors.contactNumber = "Contact number must be 11 digits long";
  }

  if (formData.emailAddress.length > 100) {
    errors.emailAddress = `Email address must have 100 characters or less, current length: ${formData.emailAddress.length}`;
  }

  if (formData.streetAddress.length > 100) {
    errors.streetAddress = `Email address must have 100 characters or less, current length: ${formData.streetAddress.length}`;
  }

  if (!formData.city.match(alphabetRegex)) {
    errors.city = "Only alphabetic characters allowed";
  } else if (formData.city.length > 30) {
    errors.city = `City must have 30 characters or less, current length: ${formData.city.length}`;
  }

  if (!formData.province.match(alphabetRegex)) {
    errors.province = "Only alphabetic characters allowed";
  } else if (formData.province.length > 30) {
    errors.province = `Province must have 30 characters or less, current length: ${formData.province.length}`;
  }

  if (!formData.zipCode.toString().match(numberRegex)) {
    errors.zipCode = "Only numbers are allowed";
  } else if (formData.zipCode.toString().length != 4) {
    errors.zipCode = "Zip code must be 4 digits long";
  }

  if (!formData.emergencyName.match(nameRegex)) {
    errors.emergencyName = "Only alphabetic characters allowed";
  } else if (formData.emergencyName.length > 60) {
    errors.emergencyName = `Name must have 60 characters or less, current length: ${formData.emergencyName.length}`;
  }

  if (!formData.emergencyRelationship.match(alphabetRegex)) {
    errors.emergencyRelationship = "Only alphabetic characters allowed";
  } else if (formData.emergencyRelationship.length > 30) {
    errors.emergencyRelationship = `Relationship must have 30 characters or less, current length: ${formData.emergencyRelationship.length}`;
  }

  if (!formData.emergencyContactNumber.match(numberRegex)) {
    errors.emergencyContactNumber = "Only numbers are allowed";
  } else if (formData.emergencyContactNumber.length != 11) {
    errors.emergencyContactNumber = "Contact number must be 11 digits long";
  }

  return errors;
}

export {
  validatePatientInfo,
  validateMedicalInfo,
  validateEmergencyInfo,
  validateDoctorInfo,
  validateVisitorInfo,
  validatePatientEditInfo,
};
