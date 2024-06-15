import { gql } from "@apollo/client";

export const signUpMutation = gql`
  mutation ($fullName: String!, $email: String!, $password: String!) {
    signUpUser(
      input: { fullName: $fullName, email: $email, password: $password }
    )
  }
`;

export const fileUploadMutation = gql`
  mutation ($file: Upload!) {
    singleUpload(file: $file)
  }
`;

export const createCoreMutatuion = gql`
  mutation ($name: String!) {
    createCore(input: { name: $name })
  }
`;
