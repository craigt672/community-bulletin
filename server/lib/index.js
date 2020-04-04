"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const port = 5000;
app.use(cors_1.default());
app.get('/api', (req, res) => {
    res.send({
        data: "Hello React World"
    });
});
app.listen(port, () => console.log(`Server is running on port ${5000}`));
//# sourceMappingURL=index.js.map