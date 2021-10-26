import request from '../helpers/request';

export default class Base {
    constructor() {
        this.baseUrl = '/api/storefront';
        this.graphqlUrl = '/graphql';
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
    makeRequest(url, method, options, callback) {
        request(url, {
            method,
            requestOptions: options,
        }, callback);
    }

    graphqRequest(query, options, callback) {
        const body = JSON.stringify({
            query,
            variables: options.variables
        });

        const opts = {
            body,
            token: options.token,
            isGraphql: true
        };

        this.makeRequest(this.graphqlUrl, 'POST', opts, callback);
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
}
