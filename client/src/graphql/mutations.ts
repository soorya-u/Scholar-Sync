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
    $upload: Upload!
    $nexus: String!
  ) {
    createFile(
      input: {
        title: $title
        description: $description
        upload: $upload
        nexus: $nexus
      }
    )
  }
`;

export const createAnnouncementMutation = gql`
  mutation ($title: String!, $description: String!, $nexus: String!) {
    createAnnouncement(
      input: { title: $title, message: $description, nexus: $nexus }
    )
  }
`;
