"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
function isUploadedFile(file) {
    return typeof file === 'object' && file.name !== undefined;
}
const uploadHandler = (req, res, next) => {
    if (typeof req.file === 'object') {
        const fileField = req.body.file.gimage;
        if (isUploadedFile(fileField)) {
            console.log(fileField.name);
            fileField.mv('uploads', err => {
                if (err) {
                    console.log('Error while copying file to target location');
                }
            });
        }
    }
};
exports.default = uploadHandler;
