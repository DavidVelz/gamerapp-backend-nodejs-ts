"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexFields = void 0;
exports.regexFields = {
    name: "(^[A-Z]{1}[a-z]*) ?(([A-Z]{1}[a-z]*)?) ([A-Z]{1}[a-z]*) ([A-Z]{1}[a-z]*)",
    email: "^[_a-z0-9-]+(.[_a-z0-9-]+)@[a-z0-9-]+(.[a-z0-9-]+)(.[a-z]{2,4})$",
    password: "^([1-9][0-9]?|){0,10}$",
    age: "^([1-9][0-9]?|)$"
};
