import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";

import toasterConfig from "@/config/toasterConfig";

import "@/styles/globals.css";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>    
      <Toaster toastOptions={toasterConfig} />
      <ApolloProvider client={client}>
        <main className="py-5 px-10 mx-auto max-w-5xl w-full">
          <Component {...pageProps} />
        </main>
      </ApolloProvider>
    </>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
