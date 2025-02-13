import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { VehiclesProvider } from "../components/VehiclesContext";

export default function App({ Component, pageProps }) {
  return (
    <VehiclesProvider>
      <Component {...pageProps} />
    </VehiclesProvider>
  );
}
