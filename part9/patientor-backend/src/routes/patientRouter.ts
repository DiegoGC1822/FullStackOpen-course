import { Router } from "express";
import patientService from "../services/patientService";
import parser from "../utils";

const router = Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatient = parser.toNewPatient(req.body);
    const addedPatient = patientService.addEntry(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientService.getEntryById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send("Patient not found");
  }
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.getEntryById(req.params.id);
  if (patient) {
    try {
      const entry = parser.toNewEntry(req.body);
      const updatedPatient = patientService.addEntryForPatient({
        patient,
        entry,
      });
      res.json(updatedPatient);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }
      res.status(400).send(errorMessage);
    }
  }
  res.status(404).send("Patient not found");
});

export default router;
