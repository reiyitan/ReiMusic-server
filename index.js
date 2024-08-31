require("dotenv").config();
const express = require("express");
const app = express(); 
const port = 3000; 

const cors = require("cors");
const corsOptions = {
    origin: "https://reiuh.cc",
    methods: ["POST", "DELETE", "PATCH", "GET"],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

const { verifyToken } = require("./src/middleware");
const routes = require("./src/routes"); 
app.use("/api", verifyToken, routes); 

app.get("/", (req, res) => {
    res.send("ReiMusic API");
})

const { connectMongoose } = require("./src/config");
const startServer = () => {
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`)
    })
}

connectMongoose(() => startServer());
