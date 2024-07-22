import { gql } from "@apollo/client";

export const signUpMutation = gql`
  mutation ($fullName: String!, $email: String!, $password: String!) {
    signUpUser(
      input: { fullName: $fullName, email: $email, password: $password }
    )
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

export const deleteCoreMutation = gql`
  mutation ($coreId: String!) {
    deleteCore(coreId: $coreId)
  }
`;

export const deleteNexusMutation = gql`
  mutation ($nexusId: String!) {
    deleteNexus(nexusId: $nexusId)
  }
`;

export const leaveNexusMutation = gql`
  mutation ($nexusId: String!) {
    leaveNexus(nexusId: $nexusId)
  }
`;

export const addPseudoUserToCoreMutation = gql`
  mutation ($coreId: String!) {
    addPseudoUserToCore(coreId: $coreId)
  }
`;

export const addUserToNexusMutation = gql`
  mutation ($nexusId: String!) {
    addUserToNexus(nexusId: $nexusId)
  }
`;
