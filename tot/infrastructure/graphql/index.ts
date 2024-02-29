import { AccountRepository } from './account';
import { GraphQLClient } from './graphqlClient';
import { ProductRepository } from './product';
import { SEORepository } from './seoRepository';
import { FulfillmentCenterRepository } from './fulfillment-center';
import { CartRepository } from './cart';

export const GraphQLModule = {
  Client: GraphQLClient,
  ProductRepository: ProductRepository,
  SEORepository: SEORepository,
  AccountRepository: AccountRepository,
  FulfillmentCenterRepository: FulfillmentCenterRepository,
  CartRepository: CartRepository,
};
