import TanstackRouterProvider from "./TanstackRouter";
import ApolloGraphQLProvider from "./ApolloGraphQL";
import ReduxProvider from "./Redux";

export default function Providers() {
  return (
    <ApolloGraphQLProvider>
      <ReduxProvider>
        <TanstackRouterProvider />
      </ReduxProvider>
    </ApolloGraphQLProvider>
  );
}
