import { registerRootComponent } from "expo";
import React from "react";
import App from "./App";

import ReduxWrapper from "./store/config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

registerRootComponent(() => (
  <ReduxWrapper>
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </QueryClientProvider>
  </ReduxWrapper>
));
