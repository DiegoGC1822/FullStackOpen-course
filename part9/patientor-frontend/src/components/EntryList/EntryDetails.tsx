import { Entry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const ratingColors = ["green", "yellow", "orange", "red"];

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const typeComprobation = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: "0" }}>{entry.date}</p>
              <MedicalServicesIcon />
            </div>
            <p>{entry.description}</p>
            <FavoriteIcon
              sx={{ color: ratingColors[entry.healthCheckRating] }}
            />
          </>
        );
      case "Hospital":
        return (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: 0 }}>{entry.date}</p>
              <LocalHospitalIcon />
            </div>
            <p>{entry.description}</p>
            <p>Discharge date: {entry.discharge.date}</p>
            <p>Discharge criteria: {entry.discharge.criteria}</p>
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: "0" }}>{entry.date}</p>
              <WorkIcon />
              <p style={{ margin: "0" }}>{entry.employerName}</p>
            </div>
            <p>{entry.description}</p>
            {entry.sickLeave && (
              <>
                <p>Sick leave start: {entry.sickLeave.startDate}</p>
                <p>Sick leave end: {entry.sickLeave.endDate}</p>
              </>
            )}
          </>
        );
      default:
        return assertNever(entry);
    }
  };

  return typeComprobation(entry);
};

export default EntryDetails;
