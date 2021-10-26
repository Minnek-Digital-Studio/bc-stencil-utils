import getGraphQLQueries from "./graphql-queries";
import splitStringByDelimiter from './query-string';

export default {
    queries: getGraphQLQueries(),
    splitString: splitStringByDelimiter
};
