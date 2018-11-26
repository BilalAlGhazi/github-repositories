import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import ApolloClient from "apollo-client";

// Global.Auth
let TOKEN = "c8acb0cc5def39d0ee3f166d391c497b9eb3f3c8";
// Prepare the Apollo network interface
// const networkInterface = createNetworkInterface('https://api.github.com/graphql')

// networkInterface.use([
//   {
//     applyMiddleware (req, next) {
//       if (!req.options.headers) {
//         req.options.headers = {}
//       }

//       // Send the login token in the Authorization header
//       req.options.headers.authorization = `Bearer ${TOKEN}`;
//       next();
//     }
//   }
// ]);
const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: TOKEN ? `Bearer ${TOKEN}` : "",
    }
  }
});

export default class AplClient {

  static apolloClient = null;

  static getClient() {
    if(AplClient.apolloClient == null) {
      const cache =  new InMemoryCache().restore(window.__APOLLO_STATE__);
      AplClient.apolloClient = new ApolloClient({
        link: authLink.concat(httpLink),
        cache
      });
    }
    return this.apolloClient;
  }
}
