import { HeadersInterface } from "./HeadersInterface";
export default class TSRequest {
    /**
     * @protected
     */
    protected readonly responseType: XMLHttpRequestResponseType;
    /**
     * @protected
     */
    protected options: any;
    /**
     * @protected
     */
    protected xmlHttpRequest: XMLHttpRequest | null;
    /**
     * @protected
     */
    protected method: string;
    /**
     * @protected
     */
    protected url: string;
    /**
     * @protected
     */
    protected headers: HeadersInterface[];
    /**
     * @param url
     * @param method
     * @param headers
     * @param options
     */
    constructor(url: string, method?: string, headers?: HeadersInterface[], options?: any);
    /**
     * Merging defaultOptions with options from constructor
     * @param options
     * @protected
     */
    protected setOptions(options?: any): TSRequest;
    /**
     * @param method
     * @protected
     */
    protected setMethod(method: string): TSRequest;
    /**
     * @protected
     */
    protected initXMLHttpRequest(): void;
    /**
     * @param url
     * @protected
     */
    protected setUrl(url: string): TSRequest;
    /**
     * @param eventType
     * @protected
     */
    protected dispatchWindowEvent(eventType: string): void;
    /**
     * @param headers
     * @protected
     */
    protected setHeaders(headers?: HeadersInterface[]): TSRequest;
}
