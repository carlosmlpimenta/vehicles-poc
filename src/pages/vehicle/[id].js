import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { VehiclesContext } from "../../components/VehiclesContext";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { vehicles } = useContext(VehiclesContext);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    if (id && vehicles) {
      const foundVehicle = vehicles.find((v) => v.id === id);
      setVehicle(foundVehicle);
    }
  }, [id, vehicles]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          padding: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          alignItems: "center",
        }}
      >
        <Link href={`/`}>
          <Button startIcon={<ArrowBackIcon />}></Button>
        </Link>
        <Typography>Vehicles</Typography>
      </Box>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          padding: 2,
        }}
      >
        <CardHeader title={`${vehicle.make} ${vehicle.model}`} />
        <CardMedia
          component="img"
          sx={{ width: "full", height: "300px" }}
          image="/images/placeholder.jpg"
          alt={`${vehicle.make} ${vehicle.model}`}
        />
        <Box
          sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
        >
          <Box>
            <Typography sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Specifications
            </Typography>
            <Typography>
              Vehicle type: {vehicle.details.specification.vehicleType}
            </Typography>
            <Typography>
              Colour: {vehicle.details.specification.colour}
            </Typography>
            <Typography>
              Fuel type: {vehicle.details.specification.fuel}
            </Typography>
            <Typography>
              Transmission: {vehicle.details.specification.transmission}
            </Typography>
            <Typography>
              Doors: {vehicle.details.specification.numberOfDoors}
            </Typography>
            <Typography>
              CO2 emissions: {vehicle.details.specification.co2Emissions}
            </Typography>
            <Typography>
              Nox emissions: {vehicle.details.specification.noxEmissions}
            </Typography>
            <Typography>
              Keys: {vehicle.details.specification.numberOfKeys}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Equipment
            </Typography>
            {vehicle.details.equipment.map((equipment) => (
              <Typography>{equipment}</Typography>
            ))}
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Owership history
            </Typography>
            <Typography>
              Log book: {vehicle.details.ownership.logBook}
            </Typography>
            <Typography>
              Number of owners: {vehicle.details.ownership.numberOfOwners}
            </Typography>
            <Typography>
              Registration: {vehicle.details.ownership.dateOfRegistration}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
