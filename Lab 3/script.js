// bai 1

// function multiply(num1, num2) {
//     return num1 * num2;
// }
const multiply = (num1, num2) => num1 * num2;

// function toCelsius(fahreneit) {
//     return (5 / 9) * (fahreneit - 32);
// }
const toCelsius = (fahrenheit) => (5 / 9) * (fahrenheit - 32);

// function padZeros(num, totalLen) {
//     var numStr = num.toString();
//     var numZeros = totalLen - numStr.length;
//     for (var i = 1; i<= numZeros; i++) {
//         numStr = "0" + numStr;
//     }
//     return numStr;
// }
const padZeros = (num, totalLen) => {
    let numStr = num.toString();
    const numZeros = totalLen - numStr.length;
    for (let i = 1; i <= numZeros; i++) {
        numStr = "0" + numStr;
    }
    return numStr;
};

// function power(base, exponent) {
//     var result = 1;
//     for (var i = 0; i < exponent; i++) {
//        result *= base;
//     }
//     return result;
// }
const power = (base, exponent) => {
    let result = 1;
    for (let i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
};

// function greet(who) {
//     console.log("hello" + who);
// }
const greet = (who) => console.log("hello" + who);

// bai2

const sumArray = (arr) =>
    arr.reduce((acc, currentValue) => acc + currentValue, 0);
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(sumArray(arr));

// bai 3

// var Entity = function (name, delay) {
//     this.name = name;
//     this.delay = delay;
// }
// Entity.prototype.greet = function () {
//     setTimeout(function () {
//         console.log('Xin chào, tên tôi là ', this.name);
//     }.bind(this), this.delay);
// }

// var java = new Entity('java', 5000);
// var cpp = new Entity('C++', 30);

// java.greet();
// cpp.greet();

let Entity = function (name, delay) {
    this.name = name;
    this.delay = delay;
};

Entity.prototype.greet = function () {
    setTimeout(() => {
        console.log("Xin chào, tên tôi là ", this.name);
    }, this.delay);
};

let java = new Entity("java", 5000);
let cpp = new Entity("C++", 30);

java.greet();
cpp.greet();

// Bai 4
const convertTemperature = (temperature, unit) => {
    if (unit === "C") {
        return (temperature * 9) / 5 + 32;
    } else if (unit === "F") {
        return ((temperature - 32) * 5) / 9;
    } else {
        return "Lỗi!";
    }
};