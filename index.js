const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const mongoConnection = require("./connection");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// configuration

const port = process.env.PORT || 3000;

const connection = () => {
  mongoConnection()
    .then((result) => {
      app.listen(port, () => {
        console.log("The server is running");
      });
    })

    .catch((err) => {
      console.log("No Database Connection");
    });
};

connection();

// middle wares

const rootRouter = require("./routes/rootRouter");
const ordersRouter = require("./routes/ordersRouter");
const staffsRouter = require("./routes/staffsRouter");
const panelRouter = require("./routes/panelRouter");

// routes
app.get("/rights", (req, res) => {
  res.render("rights", { tabTitle: "Customers Rights" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { tabTitle: "Contact" });
});
app.use(rootRouter);
app.use(ordersRouter);
app.use(staffsRouter);
app.use(panelRouter);
app.use((req, res) => {
  res.status(404).render("404", { tabTitle: "Page 404" });
});
