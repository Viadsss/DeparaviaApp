CREATE DATABASE DeparaviaApp;
USE DeparaviaApp;

CREATE TABLE IF NOT EXISTS patient (
  patientID CHAR(10) PRIMARY KEY,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  middleName VARCHAR(30),
  dateOfBirth DATE NOT NULL,
  sex CHAR(1) NOT NULL,
  height DECIMAL(3, 2) NOT NULL,
  weight INT NOT NULL,
  maritalStatus CHAR(1) NOT NULL,
  contactNumber VARCHAR(11) NOT NULL,
  emailAddress VARCHAR(100),
  streetAddress VARCHAR(100) NOT NULL,
  city VARCHAR(30) NOT NULL,
  province VARCHAR(30) NOT NULL,
  zipCode INT NOT NULL,
  emergencyName VARCHAR(60) NOT NULL,
  emergencyRelationship VARCHAR(30) NOT NULL,
  emergencyContactNumber VARCHAR(11) NOT NULL
);

CREATE TABLE IF NOT EXISTS doctor (
  doctorID CHAR(10) PRIMARY KEY,
  doctorName VARCHAR(60) NOT NULL,
  doctorStartTime TIME NOT NULL,
  doctorEndTime TIME NOT NULL,
  doctorStatus CHAR(1) NOT NULL,
  doctorPassword CHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS admission (
  admissionID CHAR(23) PRIMARY KEY,
  patientID CHAR(10),
  doctorID CHAR(10),
  admissionDate DATE NOT NULL,
  dischargeDate DATE,
  complaints VARCHAR(150) NOT NULL,
  medications VARCHAR(150),
  `procedure` VARCHAR(150),
  diagnosis VARCHAR(100),
  FOREIGN KEY (patientID) REFERENCES patient(patientID),
  FOREIGN KEY (doctorID) REFERENCES doctor(doctorID)
);

CREATE TABLE IF NOT EXISTS visitor (
  visitorID INT PRIMARY KEY AUTO_INCREMENT,
  patientID CHAR(10) NOT NULL,
  visitorDate DATE NOT NULL,
  visitorName VARCHAR(60) NOT NULL,
  visitorRelationship VARCHAR(30) NOT NULL,
  visitorContactNumber VARCHAR(11) NOT NULL,
  FOREIGN KEY (patientID) REFERENCES patient(patientID)
);

DELIMITER //

CREATE FUNCTION generate_patient_id(first_name VARCHAR(30), last_name VARCHAR(30)) RETURNS CHAR(10)
READS SQL DATA
BEGIN
    DECLARE new_id CHAR(10);
    DECLARE prefix CHAR(4) DEFAULT 'PAT-';
    DECLARE first_initial CHAR(1);
    DECLARE last_initial CHAR(1);
    DECLARE max_id INT;
    
    SET first_initial = UPPER(SUBSTRING(first_name, 1, 1));
    SET last_initial = UPPER(SUBSTRING(last_name, 1, 1));
    
    SELECT COALESCE(MAX(SUBSTRING(patientID, 8)), 0) INTO max_id 
    FROM patient 
    WHERE SUBSTRING(patientID, 5, 1) = first_initial 
    AND SUBSTRING(patientID, 6, 1) = last_initial;
    
    SET new_id = CONCAT(prefix, first_initial, last_initial, '-', LPAD(max_id + 1, 3, '0'));
    
    RETURN new_id;
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER before_patient_insert
BEFORE INSERT ON patient
FOR EACH ROW
BEGIN
    SET NEW.patientID = generate_patient_id(NEW.firstName, NEW.lastName);
    SET @latest_patient_id := NEW.patientID;
END //

DELIMITER ;

DELIMITER //

CREATE FUNCTION generate_doctor_id(doctor_name VARCHAR(100)) RETURNS CHAR(10)
READS SQL DATA
BEGIN
    DECLARE new_id CHAR(10);
    DECLARE prefix CHAR(4) DEFAULT 'DOC-';
    DECLARE first_initial CHAR(1);
    DECLARE last_initial CHAR(1);
    DECLARE max_id INT;
    
    SET first_initial = UPPER(SUBSTRING(SUBSTRING_INDEX(doctor_name, ' ', 1), 1, 1));
    SET last_initial = UPPER(SUBSTRING(SUBSTRING_INDEX(doctor_name, ' ', -1), 1, 1));
    
    SELECT COALESCE(MAX(SUBSTRING(doctorID, 8)), 0) INTO max_id 
    FROM doctor 
    WHERE SUBSTRING(doctorID, 5, 1) = first_initial 
    AND SUBSTRING(doctorID, 6, 1) = last_initial;
    
    SET new_id = CONCAT(prefix, first_initial, last_initial, '-', LPAD(max_id + 1, 3, '0'));
    
    RETURN new_id;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER before_doctor_insert
BEFORE INSERT ON doctor
FOR EACH ROW
BEGIN
    SET NEW.doctorID = generate_doctor_id(NEW.doctorName);
END //

DELIMITER ;


DELIMITER //

CREATE FUNCTION generate_admission_id(admission_date DATE, patient_id CHAR(10)) RETURNS CHAR(23)
READS SQL DATA
BEGIN
    DECLARE new_id CHAR(23);
    DECLARE prefix CHAR(4) DEFAULT 'ADM-';
    DECLARE formatted_date CHAR(8);
    
    SET formatted_date = DATE_FORMAT(admission_date, '%Y%m%d');
    
    SET new_id = CONCAT(prefix, formatted_date, '-', patient_id);
    
    RETURN new_id;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER before_admission_insert
BEFORE INSERT ON admission
FOR EACH ROW
BEGIN
    SET NEW.admissionID = generate_admission_id(NEW.admissionDate, NEW.patientID);
END //

DELIMITER ;