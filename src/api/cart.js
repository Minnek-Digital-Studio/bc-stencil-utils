import Base from './base';

export default class Cart extends Base {

    getCartId(options = {}, callback) {
        let url = `${this.baseUrl}/carts`;

        if (options.includeOptions) {
            url = this.includeOptions(url);
        }

        this.makeRequest(url, 'GET', options, true, (err, response) => {
            const resData = {
                cartId: response[0] ? response[0].id : '',
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
            const data = response[0];
            const resData = {
                cartTotal: data.cartAmount || parseFloat(0.00),
                cartCurency: {
                    code: data.currency.code || null,
                    symbol: data.currency.symbol || null,
                }
            }

            callback(err, resData);
        });
    }

    /**
     * @TODO
     *
     * Add multiple products to cart with selected options.
     */
    addMultipleItems(options = {}, callback) {
        const { cartId } = options;
        const url = `${this.baseUrl}/carts/${cartId}items`;

        this.makeRequest(url, 'POST', options, true, (err, response) => {
            callback(err, response);
        });
    }
}
