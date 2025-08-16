import Alert from "@mui/material/Alert";
import { Diagnosis, Patient } from "../../types";
import { useState } from "react";
import SelectTypeBar from "./SelectTypeBar";
import AddEntryForm from "./AddEntryForm";

interface AddEntryFormProps {
  setAppear: React.Dispatch<React.SetStateAction<boolean>>;
  diagnosis: Diagnosis[];
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const AddEntryPart = ({
  setAppear,
  diagnosis,
  setPatient,
}: AddEntryFormProps) => {
  const [entryType, setEntryType] = useState<string>("HealthCheck");
  const [error, setError] = useState<string>();

  return (
    <div
      style={{ marginBottom: "20px", padding: "10px", border: "1px dashed" }}
    >
      <SelectTypeBar entryType={entryType} setEntryType={setEntryType} />
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm
        setAppear={setAppear}
        diagnosis={diagnosis}
        setPatient={setPatient}
        entryType={entryType}
        setError={setError}
      />
    </div>
  );
};

export default AddEntryPart;
