"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var express_1 = require("express");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
var PORT = parseInt(process.env.PORT, 10);
var app = express_1["default"]();
app.use(helmet_1["default"]());
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.listen(PORT, function () {
    console.log("Server started at http://localhost:" + PORT);
});
