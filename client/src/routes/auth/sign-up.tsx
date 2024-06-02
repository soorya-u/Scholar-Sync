import { signUpMutation } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUp,
});

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = signUpMutation(fullName, email, password);

  const [mutateFn, { loading, data, error }] = useMutation(mutation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateFn();
  };

  console.log(data);

  return (
    <div className="p-2">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border border-black"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="border border-black"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} type="submit">
          Submit
        </button>
      </form>
      <h1>{error?.message}</h1>
    </div>
  );
}
