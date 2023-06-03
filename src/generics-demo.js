"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Earth = exports.WorldEventHandler = exports.World = exports.BasePlant = exports.BaseAnimal = exports.PlantTypes = exports.AnimalTypes = void 0;
var AnimalTypes;
(function (AnimalTypes) {
    AnimalTypes["bird"] = "bird";
    AnimalTypes["fish"] = "fish";
    AnimalTypes["dinosaur"] = "dinosaur";
})(AnimalTypes = exports.AnimalTypes || (exports.AnimalTypes = {}));
var PlantTypes;
(function (PlantTypes) {
    PlantTypes["evergreen"] = "evergreen";
    PlantTypes["decidiuous"] = "decidiuous";
})(PlantTypes = exports.PlantTypes || (exports.PlantTypes = {}));
// export interface AnimalAction{
// }
var BaseAnimal = /** @class */ (function () {
    function BaseAnimal(type, name) {
        if (name === void 0) { name = ""; }
        this.type = type;
        this.name = name;
    }
    BaseAnimal.prototype.makeSound = function () {
        console.log("Sound that ".concat(this.type, " makes"));
    };
    return BaseAnimal;
}());
exports.BaseAnimal = BaseAnimal;
var BasePlant = /** @class */ (function () {
    function BasePlant(t, name) {
        if (name === void 0) { name = ""; }
        this.type = t;
        this.name = name;
    }
    BasePlant.prototype.grow = function () {
        console.log("Grow tree ".concat(this.name));
    };
    return BasePlant;
}());
exports.BasePlant = BasePlant;
var World = /** @class */ (function () {
    function World(frameCallback) {
        var _this = this;
        this.name = "";
        this.days = 0;
        this.worldElements = [];
        /** Must call set interval to start world after - Every interval is a whole day on this planet */
        this.setInterval = function () {
            _this.timeInterval = setInterval(_this.handleIntervalInternally, _this.hoursInTheDay * 1000);
        };
        this.handleIntervalInternally = function () {
            console.log("handleIntervalInternally and invoke callback passed in constructor");
            _this.frameCallback();
        };
        this.frameCallback = frameCallback;
    }
    World.prototype.timetick = function () {
        if (this.hourOfDay < this.hoursInTheDay) {
            this.hourOfDay += 1;
        }
        else {
            this.days += 1;
            this.hourOfDay = 0;
        }
    };
    return World;
}());
exports.World = World;
var WorldEventHandler = /** @class */ (function () {
    function WorldEventHandler() {
        var _this = this;
        this.handleDayOver = function () {
            if (!_this.world) {
                throw new Error("World not defined!");
            }
            console.log("Another day on ".concat(_this.world.name, ", another salmon for the ocean, another dino on the ground"));
            if (_this.world instanceof Earth) {
                _this.world.addWorldElement(new BaseAnimal(AnimalTypes.fish, "salmon"));
                _this.world.addWorldElement(new BaseAnimal(AnimalTypes.dinosaur, "t-rex"));
            }
        };
    }
    return WorldEventHandler;
}());
exports.WorldEventHandler = WorldEventHandler;
var Earth = /** @class */ (function (_super) {
    __extends(Earth, _super);
    function Earth() {
        var _this = this;
        var worldEventHandler = new WorldEventHandler();
        _this = _super.call(this, worldEventHandler.handleDayOver) || this;
        _this.hoursInTheDay = 24;
        _this.ping = function () {
            _this.worldElements.forEach(function (we) { return console.log("World Elment Name: ".concat(we.name, " Type: ").concat(we.type)); });
            var animalCounts = Object.entries(AnimalTypes).reduce(function (accum, curr) {
                var _a;
                return (__assign(__assign({}, accum), (_a = {}, _a[curr[0]] = curr[1], _a)));
            }, {});
            var plantCounts = Object.entries(PlantTypes).reduce(function (accum, curr) {
                var _a;
                return (__assign(__assign({}, accum), (_a = {}, _a[curr[0]] = curr[1], _a)));
            }, {});
            console.log("\n            EARTH DAY ".concat(_this.days, "\n            hours in the day ").concat(_this.hoursInTheDay, "\n            this.worldElement ").concat(_this.worldElements.length, "\n        "));
            Object.entries(plantCounts).forEach(function (c) { return console.log("".concat(c[1], " Plants ").concat(c[0])); });
            Object.entries(animalCounts).forEach(function (c) { return console.log("".concat(c[1], " Animals ").concat(c[0])); });
        };
        worldEventHandler.world = _this;
        worldEventHandler.world.name = "Earth";
        var myDino = new BaseAnimal(AnimalTypes.dinosaur);
        var myTree = new BasePlant(PlantTypes.evergreen, "Spruce");
        _this.addWorldElement(myDino);
        _this.addWorldElement(myTree);
        _this.setInterval();
        return _this;
    }
    Earth.prototype.addWorldElement = function (t) {
        if (t instanceof BaseAnimal) {
            t.makeSound();
            this.worldElements.push(t);
        }
        else if (t instanceof BasePlant) {
            t.grow();
            this.worldElements.push(t);
        }
    };
    return Earth;
}(World));
exports.Earth = Earth;
