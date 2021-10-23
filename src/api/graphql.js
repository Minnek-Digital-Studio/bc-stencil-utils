import Base from './base';
import getGraphQLQueries from './helpers/graphql-queries';

export default class GraphQL extends Base {

    getProductsById(vars, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductsbyId(), vars, (err, res) => {
                callback(err, res);
            }
        );
    }

    getProductOptions(vars, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductOptions(), vars, (err, res) => {
                callback(err, res);
            }
        );
    }

    getProductVariants(vars, callback) {
        const queries = getGraphQLQueries();

        this.graphqRequest(queries.getProductOptions(), vars, (err, res) => {
                callback(err, res);
            }
        );
    }
}
