"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required"
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required"
        }).min(8, "password is too short"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: 'passwordconfirmation is required'
        }),
        email: (0, zod_1.string)({
            required_error: 'email is required',
        }).email('not a valid Email')
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "password do not match",
        path: ["passwordConfirmation"],
    })
});
