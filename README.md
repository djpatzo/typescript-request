# typescript-request

Typescript library to easy use XMLHttpRequest

## Installation

`npm install typescript-request`

### How to use directly in HTML project

```html
<!DOCTYPE html>
<html>
<head>
    <!-- USE LINES ABOVE IF Uncaught ReferenceError: exports is not defined IN CONSOLE -->
    <!-- DO NOT USE THIS IN WEBPACK or GULP BROWSERIFY/TSIFY PROJECTS -->
    <script>
        var exports = {};
    </script>
    <!-- END USE -->
    <!-- END THIS ERROR -->

    <script src="lib/request.js"></script>

    <script>
        const successUrl = 'https://github.com/djpatzo/typescript-request/success-request.json';
        const errorUrl = './not-exists.json';

        window.addEventListener('load', function() {
            document.write('<h4>Check developers console!!!</h4>')
            /**
             * Success request
             */
            new TSRequest(successUrl, 'GET', [], {
                onReady: function (responseData) {
                    console.info('Ready success', responseData);
                },
                onSuccess: function(responseData) {
                    console.log('Success', responseData);
                }
            });

            /**
             * Error request
             */
            new TSRequest(errorUrl, 'GET', [], {
                onReady: function (responseData) {
                    console.info('Ready error');
                },
                onError: function (responseData) {
                    console.error('Error');

                    //document.write('Error: ', JSON.stringify(responseData));
                }
            });
        });
    </script>
</head>
<body>
</body>
</html>
```

### How to use in TypeScript Project

```typescript
import TSRequest from 'typescript-request';

const url: string = 'https://github.com/djpatzo/typescript-request/success-request.json';

new TSRequest(successUrl, 'GET', [], {
  onReady: function (responseData) {
    console.info('Ready success');
  },
  onSuccess: function(responseData) {
    console.log('Success', responseData);
  }
});
```

### Initialization


| TSRequest(..arguments) | Type                                                                  | Description                                                                                                                                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url                    | string (**required**)                                                 | Required. The 'url' is required to make request                                                                                                                                                                                                           |
| method                 | string (default:**'GET'**)                                            | Optional. If you want to set headers or options, you must set this string. Available are standard HTTP methods, eg. GET, POST, PUT, DELETE, etc.                                                                                                          |
| headers                | Array\ (default:**[]**)                                               | Optional. See src/HeadersInterface.ts Every item in array must be object with name and value keys. Here we must use standard HTTP Headers. Eg. [{ name: 'Header-Name', value: 'Value of header' }, { name: 'Header-Name-2', value: 'Value of header 2' }] |
| options                | object (default:**{}**) see [options parameters](#options-parameters) | Optional. Every item in array must be object with name and value keys. Here we must use standard HTTP Headers. Eg. [{ name: 'Header-Name', value: 'Value of header' }, { name: 'Header-Name-2', value: 'Value of header 2' }]                             |

## options

By default, TSRequest uses only four parameters

```typescript
const defaultOptions: any = {
  postData: null,
  onReady: null,
  onError: null,
  onSuccess: null
};
```

### options parameters

**postData** is required only with method **'POST'** in constructor

**onReady** is executed everytime where XMLHttpRequest **readyState is 4** (end request)

**onSuccess** is executed everytime where HTTP Response Code **is 200**

**onError** is executed everytime where HTTP Response Code is **not 200**
