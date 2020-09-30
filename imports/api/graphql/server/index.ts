import CustomScalars, { schema as ScalarSchemas } from './lib/customScalars';
import { typeSchemas as EmailEditor, createEmailEditorResolvers } from './email-editor';

import { ApolloServer } from 'apollo-server-express';
import { MetadataService } from '../../../server/services/metadata.service';
import MutationSchema from './mutations';
import QuerySchema from './queries';
import { WebApp } from 'meteor/webapp';
import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

const createGraphQL = adapters => {
  const resolvers = merge(
    CustomScalars,
    createEmailEditorResolvers(adapters),
  );

  const schema = makeExecutableSchema({
    typeDefs: [
      EmailEditor,
      ScalarSchemas,
      QuerySchema,
      MutationSchema,
    ],
    resolvers,
  });

  return schema;
};

const metadataService = new MetadataService();

const schema = createGraphQL({
  metadataService,
});

const context = async (currentContext: any) => {
  return ({ ...currentContext });
};

const server = new ApolloServer({
  schema,
  context,
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql',
} as any);
