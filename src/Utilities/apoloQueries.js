import gql from "graphql-tag";

export const getRepositories = gql`
  query { 
    viewer { 
      login
    }
  }
`;