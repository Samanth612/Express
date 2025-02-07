"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const zod_1 = require("zod");
const response_1 = require("../utils/response");
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
const validateUser = (req, res, next) => {
    const validation = userSchema.safeParse(req.body);
    if (!validation.success) {
        return (0, response_1.sendResponse)(res, 400, false, "Validation error", validation.error.errors);
    }
    next();
};
exports.validateUser = validateUser;
