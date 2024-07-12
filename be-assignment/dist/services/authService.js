"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.findUserByUsername = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
// Mock database of users
const users = [];
const createMockUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminPass = yield bcryptjs_1.default.hash('querty1', 10);
    const userPass = yield bcryptjs_1.default.hash('querty2', 10);
    users.push({ id: '1', username: 'admin', password: adminPass, role: 'admin' });
    users.push({ id: '2', username: 'user', password: userPass, role: 'user' });
});
createMockUsers();
const findUserByUsername = (username) => {
    return users.find((user) => user.username === username);
};
exports.findUserByUsername = findUserByUsername;
const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, exports.findUserByUsername)(username);
    if (!user) {
        return null;
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    const token = (0, jwt_1.generateToken)({ id: user.id, username: user.username, role: user.role });
    return { token };
});
exports.authenticateUser = authenticateUser;
