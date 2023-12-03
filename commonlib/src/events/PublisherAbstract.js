"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublisherAbstract = void 0;
var PublisherAbstract = /** @class */ (function () {
    function PublisherAbstract(client) {
        this.client = client;
    }
    PublisherAbstract.prototype.publish = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.publish(_this.subject, JSON.stringify(data), function (err) {
                if (err) {
                    return reject(err);
                }
                console.log("Event published to subject", _this.subject);
                resolve();
            });
        });
    };
    return PublisherAbstract;
}());
exports.PublisherAbstract = PublisherAbstract;
