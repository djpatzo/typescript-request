import {HeadersInterface} from "./HeadersInterface";
import {ResponseInterface} from "./ResponseInterface";

export default class TSRequest {
  /**
   * @protected
   */
  protected readonly responseType: XMLHttpRequestResponseType = 'json';

  /**
   * @protected
   */
  protected options: any = null;
  /**
   * @protected
   */
  protected xmlHttpRequest: XMLHttpRequest | null = null;

  /**
   * @protected
   */
  protected method: string = '';

  /**
   * @protected
   */
  protected url: string = '';

  /**
   * @protected
   */
  protected headers: HeadersInterface[] = [
    {
      name: 'X-Requested-With',
      value: 'XMLHttpRequest'
    }
  ];

  /**
   * @param url
   * @param method
   * @param headers
   * @param options
   */
  constructor(url: string, method: string = 'GET', headers: HeadersInterface[] = [], options: any = {}) {
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
  protected setOptions(options: any = {}): TSRequest {
    const defaultOptions: any = {
      postData: null,
      onReady: null,
      onError: null,
      onSuccess: null
    };

    if (options) {
      this.options = Object.assign({}, defaultOptions, options);
    }

    return this;
  }

  /**
   * @param method
   * @protected
   */
  protected setMethod(method: string): TSRequest {
    this.method = method;

    return this;
  }

  /**
   * @protected
   */
  protected initXMLHttpRequest(): void {
    if (this.xmlHttpRequest !== null) {
      this.xmlHttpRequest.abort();

      this.xmlHttpRequest.open(this.method, this.url, true);

      if (this.headers) {
        Array.from(this.headers).forEach((header: HeadersInterface) => {
          this.xmlHttpRequest?.setRequestHeader(header.name, header.value);
        });
      }

      this.xmlHttpRequest.responseType = this.responseType;

      this.xmlHttpRequest.onreadystatechange = () => {
        if (this.xmlHttpRequest !== null && this.xmlHttpRequest.readyState === 4) {
          if (typeof this.options.onReady === 'function') {
            window.addEventListener('r:ready', this.options.onReady.bind(false, this.xmlHttpRequest.response as ResponseInterface), {
              capture: true,
              once: true
            });

            this.dispatchWindowEvent('r:ready');
          }

          if (this.xmlHttpRequest.response) {
            const responseData: ResponseInterface = this.xmlHttpRequest.response;

            if (this.xmlHttpRequest.status === 200) {
              if (typeof this.options.onSuccess === 'function') {
                window.addEventListener('r:success', this.options.onSuccess.bind(false, responseData), {
                  capture: true,
                  once: true
                });

                this.dispatchWindowEvent('r:success');
              }
            } else {
              if (typeof this.options.onError === 'function') {
                window.addEventListener('r:error', this.options.onError.bind(false, responseData), {
                  capture: true,
                  once: true
                });

                this.dispatchWindowEvent('r:error');
              }
            }
          }
        }
      }

      if (this.method === 'POST') {
        const formData: FormData = new FormData();

        if (this.options.postData) {
          Object.keys(this.options.postData).forEach((key: any) => {
            const value = this.options.postData[key];

            formData.append(key, value);
          });
        }

        this.xmlHttpRequest.send(formData);
      } else {
        this.xmlHttpRequest.send();
      }
    }
  }

  /**
   * @param url
   * @protected
   */
  protected setUrl(url: string): TSRequest {
    this.url = url;

    return this;
  }

  /**
   * @param eventType
   * @protected
   */
  protected dispatchWindowEvent(eventType: string) {
    const event: CustomEvent = new CustomEvent(eventType);

    window.dispatchEvent(event);
  }

  /**
   * @param headers
   * @protected
   */
  protected setHeaders(headers: HeadersInterface[] = []): TSRequest {
    this.headers = Object.assign({}, this.headers, headers);

    return this;
  }
}
