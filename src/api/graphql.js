import Base from './base';
import getGraphQLQueries from '../helpers/graphql-queries';

export default class GraphQL extends Base {

    /**
     * Get product data by ID.
     *
     * @param   Object    opts      The request options.
     * @param   Function  callback  The callback function.
     * @return  Object              GraphQL response.
     */
    getProductsById(opts = {}, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductsById(), opts, callback);
    }

    /**
     * Get product options by ID.
     *
     * @param   Object    opts      The request options.
     * @param   Function  callback  The callback function.
     * @return  Object              GraphQL response.
     */
    getProductOptions(opts = {}, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductOptions(), opts, (err, res) => {
            callback(err, res);
        });
    }

    /**
     * Get products variants by ID.
     *
     * @param   Object    opts      The request options.
     * @param   Function  callback  The callback function.
     * @return  Object              GraphQL response.
     */
    getProductVariants(opts = {}, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductOptions(), opts, (err, res) => {
            callback(err, res);
        });
    }

    /**
     * Get product categories by ID.
     *
     * @param   Object    opts      The request options.
     * @param   Function  callback  The callback function.
     * @return  Object              GraphQL response.
     */
    getProductCategories(opts = {}, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductCategories(), opts, (err, res) => {
            callback(err, res);
        });
    }
}
