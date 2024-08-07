require("dotenv").config();
const express = require("express");
const app = express(); 
const port = 3000; 

const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173"
};
app.use(cors(corsOptions));

const routes = require("./src/routes"); 
app.use("/api", routes); 

app.get("/", (req, res) => {
    res.send("ReiMusic API");
})

const { connectClient } = require("./src/config");
const startServer = () => {
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`)
    })
}

connectClient(() => startServer());
