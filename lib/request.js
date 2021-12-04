"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TSRequest = /** @class */ (function () {
    /**
     * @param url
     * @param method
     * @param headers
     * @param options
     */
    function TSRequest(url, method, headers, options) {
        if (method === void 0) { method = 'GET'; }
        if (headers === void 0) { headers = []; }
        if (options === void 0) { options = {}; }
        /**
         * @protected
         */
        this.responseType = 'json';
        /**
         * @protected
         */
        this.options = null;
        /**
         * @protected
         */
        this.xmlHttpRequest = null;
        /**
         * @protected
         */
        this.method = '';
        /**
         * @protected
         */
        this.url = '';
        /**
         * @protected
         */
        this.headers = [
            {
                name: 'X-Requested-With',
                value: 'XMLHttpRequest'
            }
        ];
        this
            .setUrl(url)
            .setOptions(options)
            .setMethod(method)
            .setHeaders(headers);
        if (this.method === 'POST' && (this.options.postData.length === 0 || !this.options.postData)) {
            throw new Error('Please provide postData in options!');
        }
        if (this.xmlHttpRequest !== null) {
            this.xmlHttpRequest.abort();
        }
        this.xmlHttpRequest = new XMLHttpRequest();
        this.initXMLHttpRequest();
    }
    /**
     * Merging defaultOptions with options from constructor
     * @param options
     * @protected
     */
    TSRequest.prototype.setOptions = function (options) {
        if (options === void 0) { options = {}; }
        var defaultOptions = {
            postData: null,
            onReady: null,
            onError: null,
            onSuccess: null
        };
        if (options) {
            this.options = Object.assign({}, defaultOptions, options);
        }
        return this;
    };
    /**
     * @param method
     * @protected
     */
    TSRequest.prototype.setMethod = function (method) {
        this.method = method;
        return this;
    };
    /**
     * @protected
     */
    TSRequest.prototype.initXMLHttpRequest = function () {
        var _this = this;
        if (this.xmlHttpRequest !== null) {
            this.xmlHttpRequest.abort();
            this.xmlHttpRequest.open(this.method, this.url, true);
            if (this.headers) {
                Array.from(this.headers).forEach(function (header) {
                    var _a;
                    (_a = _this.xmlHttpRequest) === null || _a === void 0 ? void 0 : _a.setRequestHeader(header.name, header.value);
                });
            }
            this.xmlHttpRequest.responseType = this.responseType;
            this.xmlHttpRequest.onreadystatechange = function () {
                if (_this.xmlHttpRequest !== null && _this.xmlHttpRequest.readyState === 4) {
                    if (typeof _this.options.onReady === 'function') {
                        window.addEventListener('r:ready', _this.options.onReady.bind(false, _this.xmlHttpRequest.response), {
                            capture: true,
                            once: true
                        });
                        _this.dispatchWindowEvent('r:ready');
                    }
                    if (_this.xmlHttpRequest.response) {
                        var responseData = _this.xmlHttpRequest.response;
                        if (_this.xmlHttpRequest.status === 200) {
                            if (typeof _this.options.onSuccess === 'function') {
                                window.addEventListener('r:success', _this.options.onSuccess.bind(false, responseData), {
                                    capture: true,
                                    once: true
                                });
                                _this.dispatchWindowEvent('r:success');
                            }
                        }
                        else {
                            if (typeof _this.options.onError === 'function') {
                                window.addEventListener('r:error', _this.options.onError.bind(false, responseData), {
                                    capture: true,
                                    once: true
                                });
                                _this.dispatchWindowEvent('r:error');
                            }
                        }
                    }
                }
            };
            if (this.method === 'POST') {
                var formData_1 = new FormData();
                if (this.options.postData) {
                    Object.keys(this.options.postData).forEach(function (key) {
                        var value = _this.options.postData[key];
                        formData_1.append(key, value);
                    });
                }
                this.xmlHttpRequest.send(formData_1);
            }
            else {
                this.xmlHttpRequest.send();
            }
        }
    };
    /**
     * @param url
     * @protected
     */
    TSRequest.prototype.setUrl = function (url) {
        this.url = url;
        return this;
    };
    /**
     * @param eventType
     * @protected
     */
    TSRequest.prototype.dispatchWindowEvent = function (eventType) {
        var event = new CustomEvent(eventType);
        window.dispatchEvent(event);
    };
    /**
     * @param headers
     * @protected
     */
    TSRequest.prototype.setHeaders = function (headers) {
        if (headers === void 0) { headers = []; }
        this.headers = Object.assign({}, this.headers, headers);
        return this;
    };
    return TSRequest;
}());
exports.default = TSRequest;
