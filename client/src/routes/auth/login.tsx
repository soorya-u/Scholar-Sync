import { useLazyQuery } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";

import { loginQuery } from "@/graphql/queries";
import { useState } from "react";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const query = loginQuery(email, password);

  const [queryFn, { loading, data, error }] = useLazyQuery(query);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    queryFn({ fetchPolicy: "network-only" });
  };

  console.log(data);

  return (
    <div className="p-2">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
