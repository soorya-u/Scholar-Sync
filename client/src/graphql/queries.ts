import { gql } from "@apollo/client";

export const loginQuery = gql`
  query ($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password })
  }
`;

export const getUserQuery = gql`
  query {
    getUser {
      id
      userType
      fullName
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
