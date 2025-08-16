import diagnoses from "../../data/diagnosis";
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries,
};
