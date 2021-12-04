import { HeadersInterface } from "./HeadersInterface";
export default class TSRequest {
    protected readonly responseType: XMLHttpRequestResponseType;
    protected options: any;
    protected xmlHttpRequest: XMLHttpRequest | null;
    protected method: string;
    protected url: string;
    protected headers: HeadersInterface[];
    /**
     * @param url
     * @param method
     * @param headers
     * @param options
     */
    constructor(url: string, method?: string, headers?: HeadersInterface[], options?: any);
    /**
     * @param options
     * @private
     */
    protected setOptions(options?: any): TSRequest;
    protected setMethod(method: string): TSRequest;
    protected initXMLHttpRequest(): void;
    protected setUrl(url: string): TSRequest;
    protected dispatchWindowEvent(eventType: string): void;
    protected setHeaders(headers?: HeadersInterface[]): TSRequest;
}
