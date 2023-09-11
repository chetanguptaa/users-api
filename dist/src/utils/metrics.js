"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMetricsServer = exports.databaseResponseTimeHistogram = exports.restResponseTimeHistogram = void 0;
const express_1 = __importDefault(require("express"));
const prom_client_1 = __importDefault(require("prom-client"));
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
exports.restResponseTimeHistogram = new prom_client_1.default.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "REST API response time in seconds",
    labelNames: ["method", "route", "status_code"],
});
exports.databaseResponseTimeHistogram = new prom_client_1.default.Histogram({
    name: "db_response_time_duration_seconds",
    help: "Database response time in seconds",
    labelNames: ["operation", "success"],
});
function startMetricsServer() {
    const collecDefaultMetrics = prom_client_1.default.collectDefaultMetrics;
    collecDefaultMetrics();
    app.get("/metrics", async (req, res) => {
        res.set("Content-Type", prom_client_1.default.register.contentType);
        return res.send(await prom_client_1.default.register.metrics());
    });
    app.listen(9100, () => {
        logger_1.default.info("metrics server start at http://localhost:9100");
    });
}
exports.startMetricsServer = startMetricsServer;
