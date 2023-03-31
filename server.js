const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");



const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// içerik türü istekleri ayrıştırma
app.use(express.json());

// içerik türü istekleri ayrıştırma
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    secret: "COOKIE_SECRET", // gizli ortam değişkeni
    httpOnly: true
  })
);

const db = require("./app/models");


mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://deniz:4534@cluster0.zupbbrn.mongodb.net/abc?retryWrites=true&w=majority",
{useNewUrlParser: true,  useUnifiedTopology: true },
function checkDB(error)
{
    if(error)
    {
        console.log("errorr")
    }
    else
    {
        console.log("DB Connectedddd!!!!!!!!!!!")
    }
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// bağlantı ayarlayıp istekleri dinle
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

