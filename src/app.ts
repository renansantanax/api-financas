import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message:
      "API Finanças funcionando com node.js, express, typescript e typeorm",
  });
});

export default app;
