const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(routes);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on ${PORT}`);
    });
});