import {
  NonSensitivePatient,
  NewPatient,
  Patient,
  EntryWithoutId,
  Entry,
} from "../types";
import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...entry };
  patients.push(newPatient);
  return newPatient;
};

const getEntryById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addEntryForPatient = ({
  patient,
  entry,
}: {
  patient: Patient;
  entry: EntryWithoutId;
}) => {
  const newEntry: Entry = { ...entry, id: uuid() };
  patient.entries.push(newEntry);
  patients.map((p) => (p.id === patient.id ? patient : p));
  return patient;
};

export default {
  getEntries,
  addEntry,
  getEntryById,
  addEntryForPatient,
};
