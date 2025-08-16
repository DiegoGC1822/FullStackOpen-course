import {
  TextField,
  Select,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import useField from "../../hooks/useField";
import { Diagnosis, Patient } from "../../types";
import { useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import axios from "axios";

interface AddEntryFormProps {
  setAppear: React.Dispatch<React.SetStateAction<boolean>>;
  diagnosis: Diagnosis[];
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  entryType: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AddEntryForm = ({
  setAppear,
  diagnosis,
  setPatient,
  entryType,
  setError,
}: AddEntryFormProps) => {
  const { id } = useParams<{ id: string }>();
  const description = useField("text");
  const date = useField("date");
  const specialist = useField("text");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [hcr, setHCR] = useState<number>(0);
  const employerName = useField("text");
  const sickLeaveStartDate = useField("date");
  const sickLeaveEndDate = useField("date");
  const dischargeDate = useField("date");
  const dischargeCriteria = useField("text");

  const handleChangeDC = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeHCR = (event: SelectChangeEvent<number>) => {
    if (typeof event.target.value === "number") {
      const healthCheckRating = event.target.value;

      if (healthCheckRating >= 0 && healthCheckRating <= 3) {
        setHCR(healthCheckRating);
      }
    }
  };

  const resetFields = () => {
    description.reset();
    date.reset();
    specialist.reset();
    setDiagnosisCodes([]);
    setHCR(0);
    employerName.reset();
    sickLeaveStartDate.reset();
    sickLeaveEndDate.reset();
    dischargeDate.reset();
    dischargeCriteria.reset();
  };

  const onCancel = () => {
    setAppear(false);
    resetFields();
    setError(undefined);
  };

  const createEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEntry: any = {
      description: description.input.value,
      date: date.input.value,
      specialist: specialist.input.value,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
      type: entryType,
    };
    if (entryType === "HealthCheck") {
      newEntry.healthCheckRating = hcr;
    } else if (entryType === "OccupationalHealthcare") {
      newEntry.employerName = employerName.input.value;
      if (sickLeaveStartDate.input.value && sickLeaveEndDate.input.value) {
        newEntry.sickLeave = {
          startDate: sickLeaveStartDate.input.value,
          endDate: sickLeaveEndDate.input.value,
        };
      }
    } else if (entryType === "Hospital") {
      newEntry.discharge = {
        date: dischargeDate.input.value,
        criteria: dischargeCriteria.input.value,
      };
    }
    try {
      const response = await patientService.addEntry(id!, newEntry);
      console.log("Response from addEntry:", response);
      setPatient(response);
      resetFields();
      setAppear(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginTop: "20px",
      }}
      onSubmit={createEntry}
    >
      <TextField
        label="Description"
        variant="standard"
        {...description.input}
        fullWidth
        required
      />
      <TextField
        label="Date"
        variant="standard"
        fullWidth
        InputLabelProps={{ shrink: true }}
        required
        {...date.input}
      />
      <TextField
        label="Specialist"
        variant="standard"
        fullWidth
        required
        {...specialist.input}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-name-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={diagnosisCodes}
          onChange={handleChangeDC}
          required
          input={<OutlinedInput label="Diagnosis Codes" />}
        >
          {diagnosis.map((d) => (
            <MenuItem
              key={d.code}
              value={d.code}
              style={{ whiteSpace: "normal" }}
            >
              {d.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {entryType === "HealthCheck" && (
        <FormControl fullWidth>
          <InputLabel id="HCR-label">Health Check Rating</InputLabel>
          <Select
            labelId="HCR-label"
            fullWidth
            value={hcr}
            onChange={handleChangeHCR}
            required
            input={<OutlinedInput label="Health Check Rating" />}
          >
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>Low Risk</MenuItem>
            <MenuItem value={2}>High Risk</MenuItem>
            <MenuItem value={3}>Critical Risk</MenuItem>
          </Select>
        </FormControl>
      )}
      {entryType === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer Name"
            variant="standard"
            fullWidth
            required
            {...employerName.input}
          />
          <TextField
            label="Sick Leave Start Date"
            variant="standard"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            {...sickLeaveStartDate.input}
          />
          <TextField
            label="Sick Leave End Date"
            variant="standard"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            {...sickLeaveEndDate.input}
          />
        </>
      )}
      {entryType === "Hospital" && (
        <>
          <TextField
            label="Discharge Date"
            variant="standard"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            {...dischargeDate.input}
          />
          <TextField
            label="Discharge Criteria"
            variant="standard"
            fullWidth
            required
            {...dischargeCriteria.input}
          />
        </>
      )}
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={onCancel}
        type="button"
      >
        Cancel
      </Button>
    </form>
  );
};

export default AddEntryForm;
