import { ApolloProvider } from "@apollo/client"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import apollo from "../lib/apollo"
import "./styles.css"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}
