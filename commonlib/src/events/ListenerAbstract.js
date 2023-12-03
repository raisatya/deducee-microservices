"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerAbstract = void 0;
var ListenerAbstract = /** @class */ (function () {
    function ListenerAbstract(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    ListenerAbstract.prototype.subscriptionOptions = function () {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    };
    ListenerAbstract.prototype.listen = function () {
        var _this = this;
        var subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on("message", function (msg) {
            console.log("Message received: ".concat(_this.subject, " / ").concat(_this.queueGroupName));
            var parsedData = _this.parseMessage(msg);
            _this.onMessage(parsedData, msg);
        });
    };
    ListenerAbstract.prototype.parseMessage = function (msg) {
        var data = msg.getData();
        return typeof data === "string"
            ? JSON.parse(data)
            : JSON.parse(data.toString("utf8"));
    };
    return ListenerAbstract;
}());
exports.ListenerAbstract = ListenerAbstract;
