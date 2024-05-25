import TanstackRouterProvider from "./TanstackRouter";
import ApolloGraphQLProvider from "./ApolloGraphQL";

export default function Providers() {
  return (
    <ApolloGraphQLProvider>
      <TanstackRouterProvider />
    </ApolloGraphQLProvider>
  );
}
