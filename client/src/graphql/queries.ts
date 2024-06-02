import { gql } from "@apollo/client";

export const loginQuery = (email: string, password: string) => gql`
  query LoginQuery {
    loginUser(input: { email: "${email}", password: "${password}" })
  }
`;
