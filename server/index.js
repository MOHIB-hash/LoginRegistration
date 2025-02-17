const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/employee");

app.post("/login", (req, resp) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        resp.json("Success");
      } else {
        resp.json("the password is incorrect");
      }
    } else {
      resp.json("No record existed");
    }
  });
});

app.post("/users", (req, resp) => {
  EmployeeModel.create(req.body)
    .then((employees) => resp.json(employees))
    .catch((err) => resp.json(err));
});

app.listen(3001, () => {
  console.log("Server is running");
});
