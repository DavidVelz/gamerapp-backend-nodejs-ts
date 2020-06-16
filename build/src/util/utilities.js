"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extImage = exports.regexFields = void 0;
exports.regexFields = {
    name: "(^[A-Z]{1}[a-z]*) ?(([A-Z]{1}[a-z]*)?) ([A-Z]{1}[a-z]*) ([A-Z]{1}[a-z]*)",
    email: "^[_a-z0-9-]+(.[_a-z0-9-]+)@[a-z0-9-]+(.[a-z0-9-]+)(.[a-z]{2,4})$",
    password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
    age: "^([1-9][0-9]?|)$"
};
exports.extImage = {
    png: "image/png",
    jpg: "image/jpg",
    jpeg: "image/jpeg"
};
