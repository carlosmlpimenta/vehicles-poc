import { Box } from "@mui/material";
import Head from "next/head";
import VehicleList from "../components/VehicleList";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Vehicles</title>
      </Head>
      <Box>
        <VehicleList />
      </Box>
    </div>
  );
}
