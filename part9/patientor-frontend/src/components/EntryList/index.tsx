import { Patient, Diagnosis } from "../../types";
import EntryDetails from "./EntryDetails";

interface EntryListProps {
  patient: Patient;
  diagnosis: Diagnosis[];
}

const EntryList = ({ patient, diagnosis }: EntryListProps) => {
  return (
    <div>
      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries found for this patient.</p>
      ) : (
        patient.entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              marginBottom: "10px",
              border: "1px solid",
              padding: "10px",
            }}
          >
            <EntryDetails entry={entry} />
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key={code}>
                    {code} {diagnosis.find((d) => d.code === code)?.name}
                  </li>
                ))}
              </ul>
            )}
            <p>diagnose by {entry.specialist}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EntryList;
