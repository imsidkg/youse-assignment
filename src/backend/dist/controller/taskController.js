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
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('Received task data:', req.body);
        console.log('User ID:', (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
        console.log('Full request user object:', req.user);
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const task = new Task_1.default(Object.assign(Object.assign({}, req.body), { userId: req.user.userId }));
        console.log('Task before save:', task);
        yield task.save();
        console.log('Task after save:', task);
        res.status(201).json(task);
    }
    catch (error) {
        console.error('Error in createTask:', error);
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const tasks = yield Task_1.default.find({ userId: req.user.userId });
        res.json(tasks);
    }
    catch (error) {
        console.error('Error in getTasks:', error);
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});
exports.getTasks = getTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const task = yield Task_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.user.userId }, req.body, { new: true });
        if (!task)
            return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    }
    catch (error) {
        console.error('Error in updateTask:', error);
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const task = yield Task_1.default.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!task)
            return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        console.error('Error in deleteTask:', error);
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});
exports.deleteTask = deleteTask;
