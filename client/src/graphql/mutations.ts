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
  mutation ($name: String!, $category: String!, $core: String!) {
    createNexus(input: { name: $name, category: $category, core: $core })
  }
`;

export const createFileMutation = gql`
  mutation (
    $title: String!
    $description: String!
    $file: Upload!
    $nexus: String!
  ) {
    createFile(
      input: {
        title: $title
        description: $description
        file: $file
        core: $core
        nexus: $nexus
      }
    )
  }
`;

export const createAnnouncementMutation = gql`
  mutation (
    $title: String!
    $message: String!
    $nexus: String!
  ) {
    createAnnouncement(
      input: { title: $title, message: $message, core: $core, nexus: $nexus }
    )
  }
`;
