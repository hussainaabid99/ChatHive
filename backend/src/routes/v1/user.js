import express from "express";

const router = express.Router();

router.get("/hi", (req, res) => {
  return res.send({
    hi: "hello from routes",
  });
});

export default router;
