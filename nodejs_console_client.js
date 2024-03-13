"use strict";
// import "core-js";
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
// import axios from "axios";
const axios_1 = __importDefault(require("axios"));
const BASE_URL = "http://127.0.0.1:8000";
function createTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const title = "Sample Title";
        const description = "Sample Description";
        try {
            const response = yield axios_1.default.post(`${BASE_URL}/todos/`, {
                title,
                description,
            });
            console.log("Todo added successfully");
        }
        catch (error) {
            console.error("Error:", error.message);
        }
    });
}
function deleteTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const todoId = 6; // Replace with the desired Todo ID
        try {
            const response = yield axios_1.default.delete(`${BASE_URL}/todos/${todoId}`);
            console.log("Todo deleted successfully");
        }
        catch (error) {
            console.error("Error1:", error.message);
        }
    });
}
// createTodo();
deleteTodo();
