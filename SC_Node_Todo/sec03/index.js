const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const customers = [
  { name: "牧", id: 1 },
  { name: "オースティン", id: 2 },
  { name: "佐野", id: 3 },
  { name: "宮崎", id: 4 },
  { name: "ソト", id: 5 },
]

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Work !");
});

app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.post("/api/customers", (req, res) => {
  const customer = {
    name: req.body.name,
    id: customers.length + 1,
  };
  customers.push(customer);
  res.send(customer);
});

app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => {
    return c.id === parseInt(req.params.id);
  });
  customer.name = req.body.name;
  res.send(customer);
});

app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => {
    return c.id === parseInt(req.params.id);
  });
  const index = customers.indexOf(customer);
  customers.splice(index, 1);
  res.send(customer);
});