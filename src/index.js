"use strict";
exports.__esModule = true;
var generics_demo_1 = require("./generics-demo");
var newEarth = new generics_demo_1.Earth();
var pingEarth = function () {
    newEarth.ping();
};
var pingInterval = setInterval(function () {
    newEarth.ping();
}, 10000);
