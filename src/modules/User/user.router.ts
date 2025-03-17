import { Router } from "express";
const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Hello from user module!");
});

export default router;
