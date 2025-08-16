import {
  Gender,
  NewPatient,
  EntryWithoutId,
  Diagnosis,
  HealthCheckRating,
} from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("description" in object && "date" in object && "specialist" in object) {
    if ("type" in object) {
      if (object.type === "HealthCheck") {
        if ("healthCheckRating" in object) {
          const newEntry: EntryWithoutId = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(object),
          };
          return newEntry;
        } else {
          throw new Error("Health check rating missing");
        }
      } else if (object.type === "OccupationalHealthcare") {
        if ("employerName" in object) {
          const newEntry: EntryWithoutId = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object),
            diagnosisCodes: parseDiagnosisCodes(object),
          };
          return newEntry;
        } else {
          throw new Error("Employer name missing");
        }
      } else if (object.type === "Hospital") {
        if (
          "discharge" in object &&
          typeof object.discharge === "object" &&
          object.discharge !== null
        ) {
          if ("date" in object.discharge && "criteria" in object.discharge) {
            const newEntry: EntryWithoutId = {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              type: "Hospital",
              discharge: {
                date: parseDate(object.discharge.date),
                criteria: parseCriteria(object.discharge.criteria),
              },
              diagnosisCodes: parseDiagnosisCodes(object),
            };
            return newEntry;
          } else {
            throw new Error("Discharge date or criteria missing");
          }
        } else {
          throw new Error("Discharge field missing");
        }
      } else {
        throw new Error("Type is not recognizable");
      }
    } else {
      throw new Error("Type field missing");
    }
  }

  throw new Error("Description, date or specialist is missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v.toString())
    .includes(param.toString());
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect name");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect date");
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect ssn");
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect Occupation");
  }
  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect specialist");
  }
  return specialist;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== "number" || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect health check rating");
  }
  return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect employer name");
  }
  return employerName;
};

const parseSickLeave = (
  object: unknown
): { startDate: string; endDate: string } | undefined => {
  if (!object || typeof object !== "object" || !("sickLeave" in object)) {
    return undefined;
  }

  const sickLeave = (object as { sickLeave: unknown }).sickLeave;

  if (
    sickLeave &&
    typeof sickLeave === "object" &&
    "startDate" in sickLeave &&
    "endDate" in sickLeave &&
    isString((sickLeave as any).startDate) &&
    isString((sickLeave as any).endDate)
  ) {
    const startDate = parseDate((sickLeave as any).startDate);
    const endDate = parseDate((sickLeave as any).endDate);

    if (Date.parse(startDate) > Date.parse(endDate)) {
      throw new Error("Sick leave startDate cannot be after endDate");
    }

    return { startDate, endDate };
  }

  throw new Error("Incorrect sickLeave data");
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect criteria");
  }
  return criteria;
};

export default { toNewPatient, toNewEntry };
