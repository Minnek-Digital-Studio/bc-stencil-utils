import Base from './base.js';

export default class Cart extends Base {

    getCartId(options = {}, callback) {
        let url = `${this.baseUrl}/carts`;

        if (options.includeOptions) {
            url = this.includeOptions(url);
        }

        this.makeRequest(url, 'GET', options, true, (err, response) => {
            const resData = {
                cartId: response.id || '',
            }

            callback(err, resData);
        });
    }

    getCartTotal(options = {}, callback) {
        let url = `${this.baseUrl}/carts`;

        if (options.includeOptions) {
            url = this.includeOptions(url);
        }

        this.makeRequest(url, 'GET', options, true, (err, response) => {
            const resData = {
                cartTotal: response.total || parseFloat(0.00),
            }

            callback(err, resData);
        });
    }

    addMultipleItems(options = {}, callback) {
        let url = `${this.baseUrl}/carts/${cardId}items`;

        this.makeRequest(url, 'POST', options, true, (err, response) => {
            callback(err, resData);
        });
    }
}
