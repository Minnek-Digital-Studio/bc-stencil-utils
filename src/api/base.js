import request from '../helpers/request';

export default class Base {
    constructor() {
        this.version = 'v1';
        this.baseUrl = `/api/storefront`;
    }

    /**
     * Mame the request to the API.
     *
     * @param   {[type]}  url       [url description]
     * @param   {[type]}  method    [method description]
     * @param   {[type]}  options   [options description]
     * @param   {[type]}  remote    [remote description]
     * @param   {[type]}  callback  [callback description]
     *
     * @return  {[type]}            [return description]
     */
    makeRequest(url, method, options, remote, callback) {
        request(url, {
            method,
            remote,
            requestOptions: options,
        }, callback);
    }

    graphqRequest(query, variables, callback) {
        this.makeRequest(
            this.graphqlUrl(),
            'POST',
            {
                query,
                variables,
            },
            false,
            (err, response) => {
                callback(err, response);
            }
        );

        this.makeRequest(url, 'GET', options, true, (err, response) => {
            const resData = {
                cartId: response.id || '',
            }

            callback(err, resData);
        });
    }

    /**
     * Add the parameters to a URL needed to get product option details on
     * cart line items.
     *
     * @param url
     */
    includeOptions(url) {
        return `${url}?include=lineItems.physicalItems.options,lineItems.digitalItems.options`;
    }

    graphqlUrl() {
        return `${this.baseUrl}/graphql`;
    }
}
