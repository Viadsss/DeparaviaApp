import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const initialPool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "DeparaviaApp",
  })
  .promise();

// DDL
async function createDatabase() {
  const createDatabaseQuery = `
    CREATE DATABASE IF NOT EXISTS DeparaviaApp;
  `;

  try {
    await initialPool.query(createDatabaseQuery);
    console.log("Database created successfully");
  } catch (err) {
    console.error("Error creating database:", err);
  }
}

async function createPatientTable() {
  const createPatientTableQuery = `
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
  `;

  try {
    await pool.query(createPatientTableQuery);
    console.log("Patient table created successfully");
  } catch (err) {
    console.error("Error creating patient table:", err);
  }
}

async function createDoctorTable() {
  const createDoctorTableQuery = `
    CREATE TABLE IF NOT EXISTS doctor (
      doctorID CHAR(10) PRIMARY KEY,
      doctorName VARCHAR(60) NOT NULL,
      doctorStartTime TIME NOT NULL,
      doctorEndTime TIME NOT NULL,
      doctorStatus CHAR(1) NOT NULL,
      doctorPassword CHAR(60) NOT NULL
    );
  `;

  try {
    await pool.query(createDoctorTableQuery);
    console.log("Doctor table created successfully");
  } catch (err) {
    console.error("Error creating doctor table:", err);
  }
}

async function createAdmissionTable() {
  const createAdmissionTableQuery = `
    CREATE TABLE IF NOT EXISTS admission (
      admissionID CHAR(23) PRIMARY KEY,
      patientID CHAR(10),
      doctorID CHAR(10),
      admissionDate DATE NOT NULL,
      dischargeDate DATE,
      complaints VARCHAR(150) NOT NULL,
      medications VARCHAR(150),
      \`procedure\` VARCHAR(150),
      diagnosis VARCHAR(100),
      FOREIGN KEY (patientID) REFERENCES patient(patientID),
      FOREIGN KEY (doctorID) REFERENCES doctor(doctorID)
    );
  `;

  try {
    await pool.query(createAdmissionTableQuery);
    console.log("Admission table created successfully");
  } catch (err) {
    console.error("Error creating admission table:", err);
  }
}

async function createVisitorTable() {
  const createVisitorTableQuery = `
    CREATE TABLE IF NOT EXISTS visitor (
      visitorID INT PRIMARY KEY AUTO_INCREMENT,
      patientID CHAR(10) NOT NULL,
      visitorDate DATE NOT NULL,
      visitorName VARCHAR(60) NOT NULL,
      visitorRelationship VARCHAR(30) NOT NULL,
      visitorContactNumber VARCHAR(11) NOT NULL,
      FOREIGN KEY (patientID) REFERENCES patient(patientID)
    );
  `;

  try {
    await pool.query(createVisitorTableQuery);
    console.log("Visitor table created successfully");
  } catch (err) {
    console.error("Error creating visitor table:", err);
  }
}

async function createGeneratePatientIdFunction() {
  const createFunctionQuery = `
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
    END;
  `;

  try {
    await pool.query(createFunctionQuery);
    console.log("generate_patient_id function created successfully");
  } catch (err) {
    console.error("Error creating generate_patient_id function:", err);
  }
}

async function createBeforePatientInsertTrigger() {
  const createTriggerQuery = `
    CREATE TRIGGER before_patient_insert
    BEFORE INSERT ON patient
    FOR EACH ROW
    BEGIN
        SET NEW.patientID = generate_patient_id(NEW.firstName, NEW.lastName);
        SET @latest_patient_id := NEW.patientID;
    END;
  `;

  try {
    await pool.query(createTriggerQuery);
    console.log("before_patient_insert trigger created successfully");
  } catch (err) {
    console.error("Error creating before_patient_insert trigger:", err);
  }
}

async function createGenerateDoctorIdFunction() {
  const createFunctionQuery = `
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
    END;
  `;

  try {
    await pool.query(createFunctionQuery);
    console.log("generate_doctor_id function created successfully");
  } catch (err) {
    console.error("Error creating generate_doctor_id function:", err);
  }
}

async function createBeforeDoctorInsertTrigger() {
  const createTriggerQuery = `
    CREATE TRIGGER before_doctor_insert
    BEFORE INSERT ON doctor
    FOR EACH ROW
    BEGIN
        SET NEW.doctorID = generate_doctor_id(NEW.doctorName);
    END;
  `;

  try {
    await pool.query(createTriggerQuery);
    console.log("before_doctor_insert trigger created successfully");
  } catch (err) {
    console.error("Error creating before_doctor_insert trigger:", err);
  }
}

async function createGenerateAdmissionIdFunction() {
  const createFunctionQuery = `
    CREATE FUNCTION generate_admission_id(admission_date DATE, patient_id CHAR(10)) RETURNS CHAR(23)
    READS SQL DATA
    BEGIN
        DECLARE new_id CHAR(23);
        DECLARE prefix CHAR(4) DEFAULT 'ADM-';
        DECLARE formatted_date CHAR(8);
        
        SET formatted_date = DATE_FORMAT(admission_date, '%Y%m%d');
        
        SET new_id = CONCAT(prefix, formatted_date, '-', patient_id);
        
        RETURN new_id;
    END;
  `;

  try {
    await pool.query(createFunctionQuery);
    console.log("generate_admission_id function created successfully");
  } catch (err) {
    console.error("Error creating generate_admission_id function:", err);
  }
}

async function createBeforeAdmissionInsertTrigger() {
  const createTriggerQuery = `
    CREATE TRIGGER before_admission_insert
    BEFORE INSERT ON admission
    FOR EACH ROW
    BEGIN
        SET NEW.admissionID = generate_admission_id(NEW.admissionDate, NEW.patientID);
    END ;
  `;

  try {
    await pool.query(createTriggerQuery);
    console.log("before_admission_insert trigger created successfully");
  } catch (err) {
    console.error("Error creating before_admission_insert trigger:", err);
  }
}

// * GET FUNCTIONS
export async function getAdmissions() {
  const [rows] = await pool.query(`
    SELECT * FROM admission
    ORDER BY admissionDate DESC
  `);
  return rows;
}

export async function getAdmissionsNoDoctor() {
  const [rows] = await pool.query(`
    SELECT * FROM admission
    WHERE doctorID IS NULL
    ORDER BY admissionDate ASC
  `);
  return rows;
}

export async function getAdmissionsNotDischarge() {
  const [rows] = await pool.query(`
    SELECT * FROM admission
    WHERE dischargeDate IS NULL
    ORDER BY admissionDate DESC
  `);
  return rows;
}

export async function getDoctors() {
  const [rows] = await pool.query(`
    SELECT *,
      IF(
        (doctorStartTime < doctorEndTime AND CURTIME() BETWEEN doctorStartTime AND doctorEndTime) OR
        (doctorStartTime > doctorEndTime AND (CURTIME() >= doctorStartTime OR CURTIME() < doctorEndTime)),
        'On Duty',
        'Off Duty'
      ) AS dutyStatus
    FROM doctor
  `);
  return rows;
}

export async function getAdmissionsTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total FROM admission
  `);
  return rows[0];
}

export async function getAdmissionsNoDoctorTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total FROM admission
    WHERE doctorID IS NULL
  `);
  return rows[0];
}

export async function getAdmissionsNotDischargeTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total FROM admission
    WHERE dischargeDate IS NULL
  `);
  return rows[0];
}

export async function getDoctor(doctorID) {
  const [rows] = await pool.query(
    `
    SELECT * FROM doctor
    WHERE BINARY doctorID = ?
  `,
    [doctorID]
  );

  return rows[0];
}

export async function getActiveDoctorsOnDuty() {
  const [rows] = await pool.query(`
    SELECT *,
      IF(
        (doctorStartTime < doctorEndTime AND CURTIME() BETWEEN doctorStartTime AND doctorEndTime) OR
        (doctorStartTime > doctorEndTime AND (CURTIME() >= doctorStartTime OR CURTIME() < doctorEndTime)),
        'On Duty',
        'Off Duty'
      ) AS dutyStatus
    FROM doctor
    WHERE
      doctorStatus = "A" AND
      (doctorStartTime < doctorEndTime AND CURTIME() BETWEEN doctorStartTime AND doctorEndTime) OR
      (doctorStartTime > doctorEndTime AND (CURTIME() >= doctorStartTime OR CURTIME() < doctorEndTime))
  `);
  return rows;
}

export async function getActiveDoctorsOffDuty() {
  const [rows] = await pool.query(`
    SELECT *,
      IF(
        (doctorStartTime < doctorEndTime AND CURTIME() BETWEEN doctorStartTime AND doctorEndTime) OR
        (doctorStartTime > doctorEndTime AND (CURTIME() >= doctorStartTime OR CURTIME() < doctorEndTime)),
        'On Duty',
        'Off Duty'
      ) AS dutyStatus
    FROM doctor
    WHERE 
      doctorStatus = "A" AND
      NOT (
      (doctorStartTime < doctorEndTime AND CURTIME() BETWEEN doctorStartTime AND doctorEndTime) OR
      (doctorStartTime > doctorEndTime AND (CURTIME() >= doctorStartTime OR CURTIME() < doctorEndTime))
    )
  `);
  return rows;
}

export async function getActiveDoctors() {
  const [rows] = await pool.query(`
    SELECT *,
      IF(
        (doctorStartTime < doctorEndTime AND CURTIME() BETWEEN doctorStartTime AND doctorEndTime) OR
        (doctorStartTime > doctorEndTime AND (CURTIME() >= doctorStartTime OR CURTIME() < doctorEndTime)),
        'On Duty',
        'Off Duty'
      ) AS dutyStatus
    FROM doctor
    WHERE doctorStatus = "A"
  `);
  return rows;
}

export async function getInactiveDoctors() {
  const [rows] = await pool.query(`
    SELECT *,
      IF(
        (doctorStartTime < doctorEndTime AND CURTIME() BETWEEN doctorStartTime AND doctorEndTime) OR
        (doctorStartTime > doctorEndTime AND (CURTIME() >= doctorStartTime OR CURTIME() < doctorEndTime)),
        'On Duty',
        'Off Duty'
      ) AS dutyStatus
    FROM doctor
    WHERE doctorStatus = "I"
  `);
  return rows;
}

export async function getDoctorsOnLeave() {
  const [rows] = await pool.query(`
    SELECT *,
      IF(
        (doctorStartTime < doctorEndTime AND CURTIME() BETWEEN doctorStartTime AND doctorEndTime) OR
        (doctorStartTime > doctorEndTime AND (CURTIME() >= doctorStartTime OR CURTIME() < doctorEndTime)),
        'On Duty',
        'Off Duty'
      ) AS dutyStatus
    FROM doctor
    WHERE doctorStatus = "L"
  `);
  return rows;
}

export async function getActiveDoctorsOnDutyTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total
    FROM doctor
    WHERE
      doctorStatus = "A" AND
      (doctorStartTime < doctorEndTime AND CURTIME() BETWEEN doctorStartTime AND doctorEndTime) OR
      (doctorStartTime > doctorEndTime AND (CURTIME() >= doctorStartTime OR CURTIME() < doctorEndTime))
  `);
  return rows[0];
}

export async function getActiveDoctorsOffDutyTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total
    FROM doctor
    WHERE 
      doctorStatus = "A" AND
      NOT (
      (doctorStartTime < doctorEndTime AND CURTIME() BETWEEN doctorStartTime AND doctorEndTime) OR
      (doctorStartTime > doctorEndTime AND (CURTIME() >= doctorStartTime OR CURTIME() < doctorEndTime))
    )
  `);
  return rows[0];
}

export async function getActiveDoctorsTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total
    FROM doctor
    WHERE doctorStatus = "A"
  `);
  return rows[0];
}

export async function getInactiveDoctorsTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total
    FROM doctor
    WHERE doctorStatus = "I"
  `);
  return rows[0];
}

export async function getDoctorsOnLeaveTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total
    FROM doctor
    WHERE doctorStatus = "L"
  `);
  return rows[0];
}

export async function getPatients() {
  const [rows] = await pool.query(`
    SELECT * FROM patient
  `);
  return rows;
}

export async function getPatient(patientID) {
  const [rows] = await pool.query(
    `
    SELECT * FROM patient
    WHERE BINARY patientID = ?
  `,
    [patientID]
  );

  return rows[0];
}

export async function getPatientsOfDoctor(doctorID) {
  const [rows] = await pool.query(
    `
    SELECT
      admission.admissionID,
      patient.patientID,
      CONCAT(patient.firstName, ' ', patient.lastName, ' ', patient.middleName) AS fullName,
      patient.sex,
      patient.height,
      patient.weight,
      admission.complaints,
      admission.medications,
      admission.procedure,
      admission.diagnosis
    FROM patient, admission
    WHERE patient.patientID = admission.patientID
      AND admission.doctorID = ?
      AND admission.dischargeDate IS NULL
  `,
    [doctorID]
  );
  return rows;
}

export async function getVisitors() {
  const [rows] = await pool.query(`
    SELECT * FROM visitor
    ORDER BY visitorID DESC
  `);
  return rows;
}

export async function getPatientVisitors(patientID) {
  const [rows] = await pool.query(
    `
    SELECT
      visitorName,
      visitorRelationship,
      visitorContactNumber,
      visitorDate
    FROM visitor
    WHERE patientID = ?
    ORDER BY visitorDate DESC
    `,
    [patientID]
  );

  return rows;
}

export async function getPatientAdmissions(patientID) {
  const [rows] = await pool.query(
    `
    SELECT 
      admission.admissionID,
      doctor.doctorName,
      admission.complaints,
      admission.medications,
      admission.procedure,
      admission.diagnosis,
      admission.admissionDate,
      admission.dischargeDate
    FROM admission
    LEFT JOIN doctor ON admission.doctorID = doctor.doctorID
    WHERE admission.patientID = ?
    ORDER BY admissionDate DESC, dischargeDate DESC
    `,
    [patientID]
  );

  return rows;
}

export async function getPatientAdmissionsTotal(patientID) {
  const [rows] = await pool.query(
    `
    SELECT COUNT(*) AS total FROM admission
    WHERE patientID = ?
  `,
    [patientID]
  );

  return rows[0];
}

export async function getPatientsTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total FROM patient
  `);

  return rows[0];
}

export async function getDoctorsTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total FROM doctor
  `);

  return rows[0];
}

export async function getVisitorsTotal() {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS total FROM visitor
  `);

  return rows[0];
}

export async function getPatientVisitorsTotal(patientID) {
  const [rows] = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM visitor
    WHERE patientID = ?
    `,
    [patientID]
  );
  return rows[0];
}

export async function getDailyAdmissionsCurrentMonth() {
  const [rows] = await pool.query(`
  SELECT DAY(admissionDate) AS day, COUNT(*) AS total
  FROM admission
  WHERE YEAR(admissionDate) = YEAR(CURDATE())
    AND MONTH (admissionDate) = MONTH(CURDATE())
  GROUP BY day
  `);

  return rows;
}

export async function getDailyVisitorsCurrentMonth() {
  const [rows] = await pool.query(`
  SELECT DAY(visitorDate) AS day, COUNT(*) AS total
  FROM visitor
  WHERE YEAR(visitorDate) = YEAR(CURDATE())
    AND MONTH (visitorDate) = MONTH(CURDATE())
  GROUP BY day
  `);

  return rows;
}

export async function getMonthlyAdmissionsCurrentYear() {
  const [rows] = await pool.query(`
    SELECT MONTHNAME(admissionDate) AS month, COUNT(*) AS total
    FROM admission
    WHERE YEAR(admissionDate) = YEAR(CURDATE())
    GROUP BY month
  `);

  return rows;
}

export async function getMonthlyVisitorsCurrentYear() {
  const [rows] = await pool.query(`
    SELECT MONTHNAME(visitorDate) AS month, COUNT(*) AS total
    FROM visitor
    WHERE YEAR(visitorDate) = YEAR(CURDATE())
    GROUP BY month
  `);

  return rows;
}

// * CREATE Functions
export async function createAdmission(patientID, complaints, medications) {
  await pool.query(
    `
    INSERT INTO admission (patientID, admissionDate, complaints, medications)
    VALUES (?, CURDATE(), ?, ?)
  `,
    [patientID, complaints, medications]
  );
}

export async function createDoctor(
  doctorName,
  doctorStartTime,
  doctorEndTime,
  doctorStatus,
  doctorPassword
) {
  await pool.query(
    `
    INSERT INTO doctor (doctorName, doctorStartTime, doctorEndTime, doctorStatus, doctorPassword)
    VALUES (?, ?, ?, ?, ?)
  `,
    [doctorName, doctorStartTime, doctorEndTime, doctorStatus, doctorPassword]
  );
}

export async function createPatient(
  firstName,
  lastName,
  middleName,
  dateOfBirth,
  sex,
  height,
  weight,
  maritalStatus,
  contactNumber,
  emailAddress,
  streetAddress,
  city,
  province,
  zipCode,
  emergencyName,
  emergencyRelationship,
  emergencyContactNumber
) {
  await pool.query(
    `
    INSERT INTO patient (firstName, lastName, middleName, dateOfBirth, sex, height, weight, maritalStatus, contactNumber, emailAddress, streetAddress, city, province, zipCode, emergencyName, emergencyRelationship, emergencyContactNumber)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      sex,
      height,
      weight,
      maritalStatus,
      contactNumber,
      emailAddress,
      streetAddress,
      city,
      province,
      zipCode,
      emergencyName,
      emergencyRelationship,
      emergencyContactNumber,
    ]
  );

  const firstNameInitial = firstName.charAt(0);
  const lastNameInitial = lastName.charAt(0);

  const idPattern = `PAT-${firstNameInitial}${lastNameInitial}-%`;

  const [lastInsertedId] = await pool.query(
    `
    SELECT patientID FROM patient
    WHERE patientID LIKE ?
    ORDER BY patientID DESC
    LIMIT 1
  `,
    [idPattern]
  );

  const { patientID } = lastInsertedId[0];
  return getPatient(patientID);
}

export async function createVisitor(
  patientID,
  visitorName,
  visitorRelationship,
  visitorContactNumber
) {
  await pool.query(
    `
    INSERT INTO visitor (patientID, visitorDate, visitorName, visitorRelationship, visitorContactNumber)
    VALUES (?, CURDATE(), ?, ?, ?)
  `,
    [patientID, visitorName, visitorRelationship, visitorContactNumber]
  );
}

// * UPDATE functions
export async function updateAdmissionDoctor(admissionID, doctorID) {
  await pool.query(
    `
    UPDATE admission 
    SET doctorID = ? 
    WHERE admissionID = ?;
  `,
    [doctorID, admissionID]
  );
}

export async function updateDoctorDetails(
  doctorID,
  doctorStartTime,
  doctorEndtime,
  doctorStatus
) {
  await pool.query(
    `
    UPDATE doctor
    SET doctorStartTime = ?, doctorEndTime = ?, doctorStatus = ?
    WHERE doctorID = ? 
  `,
    [doctorStartTime, doctorEndtime, doctorStatus, doctorID]
  );
}

export async function updateDoctorPassword(doctorID, newPassword) {
  await pool.query(
    `
    UPDATE doctor
    SET doctorPassword = ?
    WHERE doctorID = ?
  `,
    [newPassword, doctorID]
  );
}

export async function updatePatientProcedure(admissionID, procedure) {
  await pool.query(
    `
    UPDATE admission
    SET \`procedure\` = ?
    WHERE admissionID = ?
  `,
    [procedure, admissionID]
  );
}

export async function updatePatientDiagnosis(admissionID, diagnosis) {
  await pool.query(
    `
    UPDATE admission
    SET diagnosis = ?
    WHERE admissionID = ?
  `,
    [diagnosis, admissionID]
  );
}

export async function updatePatientDischarge(admissionID) {
  await pool.query(
    `
    UPDATE admission
    SET dischargeDate = CURDATE()
    WHERE admissionID = ?
  `,
    [admissionID]
  );
}

export async function updatePatientDetails(patientID, details) {
  const {
    height,
    weight,
    maritalStatus,
    contactNumber,
    emailAddress,
    streetAddress,
    city,
    province,
    zipCode,
    emergencyName,
    emergencyRelationship,
    emergencyContactNumber,
  } = details;

  await pool.query(
    `
    UPDATE patient
    SET
      height = ?,
      weight = ?,
      maritalStatus = ?,
      contactNumber = ?,
      emailAddress = ?,
      streetAddress = ?,
      city = ?,
      province = ?,
      zipCode = ?,
      emergencyName = ?,
      emergencyRelationship = ?,
      emergencyContactNumber = ?
    WHERE patientID = ?
  `,
    [
      height,
      weight,
      maritalStatus,
      contactNumber,
      emailAddress,
      streetAddress,
      city,
      province,
      zipCode,
      emergencyName,
      emergencyRelationship,
      emergencyContactNumber,
      patientID,
    ]
  );
}

// * DELETE functions

export async function deleteVisitors() {
  await pool.query(
    `
    TRUNCATE TABLE visitor
    `
  );
}

export async function deleteVisitor(visitorID) {
  await pool.query(
    `
    DELETE FROM visitor
    WHERE visitorID = ?
  `,
    [visitorID]
  );
}

export async function deleteMultipleVisitor(visitorIDs) {
  await pool.query(
    `
    DELETE FROM visitor
    WHERE visitorID IN (?)
    `,
    [visitorIDs]
  );
}

export async function deleteVisitorPastMonth() {
  await pool.query(
    `
    DELETE FROM visitor
    WHERE visitorDate < CURDATE() - INTERVAL 1 MONTH
  `
  );
}

export async function deleteVisitorPastThreeMonths() {
  await pool.query(
    `
    DELETE FROM visitor
    WHERE visitorDate < CURDATE() - INTERVAL 3 MONTH
  `
  );
}

export async function deleteVisitorPastSixMonths() {
  await pool.query(
    `
    DELETE FROM visitor
    WHERE visitorDate < CURDATE() - INTERVAL 6 MONTH
  `
  );
}

export async function deleteVisitorPastYear() {
  await pool.query(
    `
    DELETE FROM visitor
    WHERE visitorDate < CURDATE() - INTERVAL 1 YEAR
  `
  );
}

await createDatabase();

await createPatientTable();
await createDoctorTable();
await createAdmissionTable();
await createVisitorTable();

await createGeneratePatientIdFunction();
await createBeforePatientInsertTrigger();

await createGenerateDoctorIdFunction();
await createBeforeDoctorInsertTrigger();

await createGenerateAdmissionIdFunction();
await createBeforeAdmissionInsertTrigger();

export default pool;