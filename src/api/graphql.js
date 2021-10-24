import Base from './base';
import getGraphQLQueries from '../helpers/graphql-queries';

export default class GraphQL extends Base {

    getProductsById(opts = {}, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductsById(), opts, callback);
    }

    getProductOptions(opts = {}, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductOptions(), opts, (err, res) => {
            callback(err, res);
        });
    }

    getProductVariants(opts = {}, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductOptions(), opts, (err, res) => {
            callback(err, res);
        });
    }

    getProductCategories(opts = {}, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductCategories(), opts, (err, res) => {
            callback(err, res);
        });
    }
}
