import { gql } from "@apollo/client";

export const signUpMutation = (
  fullName: string,
  email: string,
  password: string
) => gql`
  mutation SignUpMutation {
    signUpUser(
      input: { fullName: "${fullName}", email: "${email}", password: "${password}" }
    )
  }
`;
