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
    getUserData {
      id
      name
      imageUrl
      nexus {
        id
        name
        category
        createdAt
        creator {
          fullName
        }
        users {
          fullName
        }
        files {
          id
          title
          description
          fileName
          fileUrl
          timeStamp
          sentBy {
            id
            fullName
          }
        }
        announcements {
          id
          title
          message
          timeStamp
          sentBy {
            id
            fullName
          }
        }
      }
    }
  }
`;
