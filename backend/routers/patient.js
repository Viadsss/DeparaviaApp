import { Router } from "express";
import { format } from "date-fns";
import {
  getPatient,
  updatePatientDetails,
  getPatientAdmissions,
  getPatientVisitors,
  getPatientAdmissionsTotal,
  getPatientVisitorsTotal,
} from "../database/database.js";
import bcrypt from "bcrypt";

const patientRouter = Router();

patientRouter.post("/login", async (req, res) => {
  try {
    const { patientID, password } = req.body;

    const patient = await getPatient(patientID);
    if (!patient) return res.status(401).send("Wrong credentials");

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return res.status(401).send("Wrong credentials");

    res.send(patient);
  } catch (err) {
    console.error("Error logging in as patient", err);
    res.status(500).send("Failed to login as patient");
  }
});

patientRouter.post("/login2", async (req, res) => {
  try {
    const { patientID, dateOfBirth, contactNumber } = req.body;

    const patient = await getPatient(patientID);
    if (!patient) return res.status(401).send("Wrong credentials");

    if (format(patient.dateOfBirth, "yyyy-MM-dd") != dateOfBirth) {
      return res.status(401).send("Wrong credentials");
    }

    if (patient.contactNumber != contactNumber) {
      return res.status(401).send("Wrong credentials");
    }

    res.send(patient);
  } catch (err) {
    console.error("Error logging in as patient", err);
    res.status(500).send("Failed to login as patient");
  }
});

patientRouter.put("/:id/details", async (req, res) => {
  try {
    const patientID = req.params.id;
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
    } = req.body;

    const updatedData = {
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
    };

    await updatePatientDetails(patientID, updatedData);
    const updatedPatient = await getPatient(patientID);

    res.send(updatedPatient);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating patient", error: err.message });
  }
});

patientRouter.get("/:id/admissions", async (req, res) => {
  try {
    const patientID = req.params.id;

    const patient = await getPatient(patientID);
    if (!patient) {
      return res.status(404).send({
        title: "Patient Not Found",
        description:
          "The patient ID you provided does not exist in our system.",
      });
    }

    const admissions = await getPatientAdmissions(patientID);
    res.send(admissions);
  } catch (err) {
    console.error("Error fetching patient admissions", err);
    res.status(500).send({
      title: "Failed to Fetch Admissions",
      description:
        "There was an error fetching the patient admissions. Please try again.",
    });
  }
});

patientRouter.get("/:id/visitors", async (req, res) => {
  try {
    const patientID = req.params.id;

    const patient = await getPatientVisitors(patientID);
    if (!patient) {
      return res.status(404).send({
        title: "Patient Not Found",
        description:
          "The patient ID you provided does not exist in our system.",
      });
    }

    const visitors = await getPatientVisitors(patientID);
    res.send(visitors);
  } catch (err) {
    console.error("Error fetching patient visitors", err);
    res.status(500).send({
      title: "Failed to Fetch Visitors",
      description:
        "There was an error fetching the patient admissions. Please try again.",
    });
  }
});

// TODO: Get the Total Admissions of the Patient
patientRouter.get("/:id/admissions/total", async (req, res) => {
  try {
    const patientID = req.params.id;
    const total = await getPatientAdmissionsTotal(patientID);
    res.send(total);
  } catch (err) {
    console.error("Error fetching the patient admissions total", err);
    res.status(500).send("Failed to fetch patient admissions total");
  }
});

// TODO: Get the Total Visitors of the Patient
patientRouter.get("/:id/visitors/total", async (req, res) => {
  try {
    const patientID = req.params.id;
    const total = await getPatientVisitorsTotal(patientID);
    res.send(total);
  } catch (err) {
    console.error("Error fetching the patient visitors total", err);
    res.status(500).send("Failed to fetch patient visitors total");
  }
});

export default patientRouter;
