import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";


export default class AplClient {

  static apolloClient = null;

  static getClient() {
    if(AplClient.apolloClient == null) {
      const cache =  new InMemoryCache().restore(window.__APOLLO_STATE__);
      AplClient.apolloClient = new ApolloClient({
        link: new HttpLink({
          uri: "https://api.github.com/graphql"
        }),
        cache
      });
    }
    return this.apolloClient;
  }
}
