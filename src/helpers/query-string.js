/**
 * Encodes string by stricter rules.
 *
 * @see https://github.com/kevva/strict-uri-encode
 *
 * @param {String} string
 */
const encode = (string) => encodeURIComponent(string).replace(/[!'()*]/g, (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

/**
 * Reducer that formats and combines key-value pair.
 *
 * @see https://github.com/bigcommerce/stencil-utils/blob/master/src/lib/query-string.js
 *
 * @param {String} options
 */
const reduceByKey = (options) => (key) => (result, value) => {
    if (value === undefined) {
        return result;
    }

    if (value === null) {
        return [...result, encode(key)];
    }

    if (options.includeArrayIndex) {
        if (typeof value === 'object') {
            const index = result.length / Object.keys(value).length;
            return result.concat(
                Object.keys(value).map((keyOfValue) => ([
                    encode(key),
                    '[', encode(index), ']',
                    '[', encode(keyOfValue), ']=',
                    encode(value[keyOfValue]),
                ].join(''))),
            );
        }
        const index = result.length;

        return [
            ...result,
            [encode(key), '[', encode(index), ']=', encode(value)].join(''),
        ];
    }

    return [...result, [encode(key), '=', encode(value)].join('')];
};

/**
 * Converts an object to query string.
 *
 * @see https://github.com/bigcommerce/stencil-utils/blob/master/src/lib/query-string.js
 *
 * @param {Object} object
 * @param {Object} options
 * @param {Boolean} [options.filterValues] - filters empty string or undefineds
 * @param {Boolean} [options.includeArrayIndex] - includes array index in the query string
 */
function stringify(object, options = { filterValues: false, arrayIndex: false }) {
    if (!object) {
        return '';
    }

    const objectCopy = {};
    const shouldFilter = (key) => (
        options.filterValues
        && (object[key] === '' || object[key] === undefined)
    );

    Object.keys(object).forEach((key) => {
        if (!shouldFilter(key)) {
            objectCopy[key] = object[key];
        }
    });

    const keys = Object.keys(objectCopy);
    keys.sort();

    return keys.map((key) => {
        const value = object[key];

        if (value === undefined) {
            return '';
        }

        if (value === null) {
            return encode(key);
        }

        if (Array.isArray(value)) {
            return value
                .reduce(reduceByKey(options)(key), [])
                .join('&');
        }

        return `${encode(key)}=${encode(value)}`;
    }).filter((x) => x.length > 0).join('&');
}

function splitStringByDelimiter(string, delimiter) {
    if (!string) {
        return [];
    }

    const parts = string.split(delimiter);
    const result = [];

    parts.forEach((part) => {
        if (part.length > 0) {
            result.push(part);
        }
    });

    return result;
}

export default { stringify, splitStringByDelimiter };
