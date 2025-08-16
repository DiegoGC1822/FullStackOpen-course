import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryList from "../EntryList";
import useAxios from "../../hooks/useAxios";
import Botton from "@mui/material/Button";
import { useState } from "react";
import AddEntryPart from "../AddEntryPart";
import diagnosisService from "../../services/diagnosis";
import { Diagnosis } from "../../types";

const IndividualPatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [appear, setAppear] = useState<boolean>(false);

  const {
    data: patient,
    setData: setPatient,
    loading,
    error,
  } = useAxios<Patient>(() => patientService.getById(id!));

  const {
    data: diagnosis,
    loading: diagnosisLoading,
    error: diagnosisError,
  } = useAxios<Diagnosis[]>(() => diagnosisService.getAll());

  console.log("Patient:", patient);

  if (loading || diagnosisLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (diagnosisError) {
    return <div>Error: {diagnosisError}</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  if (!diagnosis) {
    return <div>Diagnosis not found</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "0" }}>
        <h2 style={{ marginRight: "10px" }}>{patient.name}</h2>
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <span>Other</span>
        )}
      </div>
      <p style={{ marginTop: "0" }}>ssn: {patient!.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {appear ? (
        <AddEntryPart
          setAppear={setAppear}
          diagnosis={diagnosis}
          setPatient={setPatient}
        />
      ) : (
        <Botton variant="contained" onClick={() => setAppear(true)}>
          Add new Entry
        </Botton>
      )}
      <EntryList patient={patient} diagnosis={diagnosis} />
    </div>
  );
};

export default IndividualPatientPage;
