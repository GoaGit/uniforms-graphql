import {
  GraphQLDate,
  GraphQLDateTime,
  GraphQLTime
} from 'graphql-iso-date';

import { GraphQLEmail } from 'graphql-custom-types';
import GraphQLJSON from 'graphql-type-json';

export const schema = `
  scalar JSON
  scalar Email
  scalar Date
  scalar Time
  scalar DateTime
`;
/**
 * Load custom graphql scalars.
 */
export default {
    JSON: GraphQLJSON,
    Email: GraphQLEmail,
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
};
