import { Router } from "express";
import diagnoseService from "../services/diagnosisService";

const router = Router();

router.get("/", (_req, res) => {
  res.send(diagnoseService.getEntries());
});

export default router;
