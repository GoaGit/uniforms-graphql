import 'cross-fetch/polyfill';

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

import { Meteor } from 'meteor/meteor';
import { MeteorAccountsLink } from 'meteor/apollo';
import { onError } from '@apollo/client/link/error';

export const errorLinkProcessor = ({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(`Apollo link error: ${message}`));
};

export const errorLink = onError(errorLinkProcessor as any);

// specify how objects should be identified
export const cacheKeyGenerator = o => o._id;

const client = new ApolloClient({
    link: ApolloLink.from([
        new MeteorAccountsLink(),
        errorLink,
        new HttpLink({
            uri: `${(Meteor.settings?.public?.cordova?.graphql?.host || '')}/graphql`,
        }),
    ]),
    cache: new InMemoryCache({
        dataIdFromObject: cacheKeyGenerator,
    }),
});

export default client;
