import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

interface SelectTypeBarProps {
  entryType: string;
  setEntryType: React.Dispatch<React.SetStateAction<string>>;
}

const SelectTypeBar = ({ entryType, setEntryType }: SelectTypeBarProps) => {
  return (
    <ButtonGroup>
      <Button
        variant={entryType === "HealthCheck" ? "outlined" : "contained"}
        onClick={() => setEntryType("HealthCheck")}
      >
        HealthCheck
      </Button>
      <Button
        variant={
          entryType === "OccupationalHealthcare" ? "outlined" : "contained"
        }
        onClick={() => setEntryType("OccupationalHealthcare")}
      >
        OccupationalHealthcare
      </Button>
      <Button
        variant={entryType === "Hospital" ? "outlined" : "contained"}
        onClick={() => setEntryType("Hospital")}
      >
        Hospital
      </Button>
    </ButtonGroup>
  );
};

export default SelectTypeBar;
