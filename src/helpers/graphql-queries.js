export default function getGraphQLQueries() {
    return {
        /**
         * Get products data by ID.
         *
         * @return  Object  GraphQL query object with product data.
         */
        getProductsById: () => `
            query ProductsById($productIds: [Int!]) {
                site {
                    products(entityIds: $productIds) {
                        edges {
                            node {
                                brand {
                                    name
                                }
                                name
                                entityId
                                path
                                sku
                                prices {
                                    priceRange {
                                        min {
                                            ...MoneyFields
                                        }
                                        max {
                                            ...MoneyFields
                                        }
                                    }
                                    bulkPricing {
                                        minimumQuantity
                                        maximumQuantity
                                        ... on BulkPricingFixedPriceDiscount {
                                            price
                                        }
                                        ... on BulkPricingPercentageDiscount {
                                            percentOff
                                        }
                                        ... on BulkPricingRelativePriceDiscount {
                                            priceAdjustment
                                        }
                                    }
                                }
                                priceWithTax: prices(includeTax: true)  {
                                    price {
                                        value
                                    }
                                }
                                priceWithoutTax: prices(includeTax: false)  {
                                    price {
                                        value
                                    }
                                }
                                reviewSummary {
                                    summationOfRatings
                                    numberOfReviews
                                }
                                defaultImage {
                                    url640wide: url(width: 640)
                                }
                                categories {
                                    edges {
                                        node {
                                            name
                                        }
                                    }
                                }
                                customFields {
                                    edges {
                                        node {
                                            name
                                            value
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            fragment MoneyFields on Money {
                value
                currencyCode
            }`,

        /**
         * Get product available options.
         *
         * @return  Object  GraphQL query object.
         */
        getProductOptions: () => ``,

        /**
         * Get available product variants.
         *
         * @return  Object  GraphQL query object.
         */
        getProductVariants: () => ``,

        getProductPrices: () => ``,

        getProductImages: () => ``,

        /**
         * Get product categories.
         *
         * @return  Object  GraphQL query object with product categories.
         */
        getProductCategories: () => `
            query ProductCategories($productId: Int!) {
                site {
                    product(entityId: $productId) {
                        entityId
                        name
                        categories {
                            edges {
                                node {
                                    entityId
                                    name
                                    path
                                }
                            }
                        }
                    }
                }
            }`,
    }
}
