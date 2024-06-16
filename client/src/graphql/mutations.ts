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

export const createCoreMutation = gql`
  mutation ($name: String!, $imageUrl: String!) {
    createCore(input: { name: $name, imageUrl: $imageUrl })
  }
`;

export const createNexusMutation = gql`
  mutation ($name: String!, $category: String!) {
    createNexus(input: { name: $name, category: $category })
  }
`;
