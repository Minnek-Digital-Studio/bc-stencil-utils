import 'whatwg-fetch';
import stringify from './query-string';

/**
 * Validate HTTP methods.
 *
 * @param   String  method  The HTTP method.
 * @return  Boolean         Whether the method is valid.
 */
const isValidHttpMethod = (method) => ['GET', 'POST', 'PUT', 'DELETE'].includes(method);

/**
 * HTTP request.
 *
 * @param   String    relativeUrl  The endpoint URL.
 * @param   Object    opts         THe request options.
 * @param   Function  callback     The callback function.
 * @return  Object                 The callback function with json data.
 */
export default function request(relativeUrl, opts, callback) {
    const defaultOptions = {
        method: 'GET',
        requestOptions: {
            baseUrl: null,
            params: {},
            config: {},
            isGraphql: false,
        },
    };

    const options = { ...defaultOptions, ...opts };
    const { requestOptions } = options;
    const data = requestOptions.params || '';
    const headers = {
        'stencil-config': requestOptions.config ? JSON.stringify(requestOptions.config) : '{}',
        'stencil-options': '{}',
        'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : '',
    };

    if (requestOptions.isGraphql) {
        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = `Bearer ${requestOptions.token}`; // eslint-disable-line

        delete headers['stencil-config'];
        delete headers['stencil-options'];
        delete headers['x-xsrf-token'];
    }

    if (!isValidHttpMethod(options.method)) {
        return callback(new Error('Not a valid HTTP method'));
    }

    const config = {
        method: options.method,
        headers,
        credentials: requestOptions.isGraphql ? 'same-origin' : 'include',
    };

    if (requestOptions.isGraphql) {
        config.body = requestOptions.body
    }

    let url = requestOptions.baseUrl ? `${requestOptions.baseUrl}${relativeUrl}` : relativeUrl;

    if (['GET', 'HEAD'].indexOf(config.method) === -1 && !requestOptions.isGraphql) {
        config.body = stringify(data, { includeArrayIndex: true });
    } else if (data) {
        const delimiter = !url.includes('?') ? '?' : '&';
        url += `${delimiter}${stringify(data)}`;
    }

    return fetch(url, config)
        .then((response) => {
            if (response.headers.get('content-type').indexOf('application/json') !== -1) {
                return response.json();
            }
            return response.text();
        })
        .then((response) => {
            callback(null, response);
        })
        .catch((err) => callback(err));
}
