"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const app = express_1.default();
const port = 5000;
app.use(cors_1.default());
app.use('/api', api_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${5000}`);
});
//# sourceMappingURL=index.js.map