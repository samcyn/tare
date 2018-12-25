/**
 * created by Samson Iyanda on 24/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const AUTH_TOKEN = "auth-token";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

// A U T H E N T I C A T I O N
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

// S U B S C R I P T I O N
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: localStorage.getItem(AUTH_TOKEN)
//     }
//   }
// });


const clientws = new SubscriptionClient("ws://localhost:4000", {
  reconnect: true
});

const wsLink = new WebSocketLink(clientws);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;