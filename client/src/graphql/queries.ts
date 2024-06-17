import { gql } from "@apollo/client";

export const loginQuery = gql`
  query ($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password })
  }
`;

export const getInitDataQuery = gql`
  query {
    getUser {
      id
      userType
      fullName
    }
    getCores {
      id
      name
      imageUrl
      nexus {
        id
        name
        category
      }
    }
  }
`;

export const getCoresQuery = gql`
  query {
    getCores {
      id
      name
      imageUrl
    }
  }
`;
