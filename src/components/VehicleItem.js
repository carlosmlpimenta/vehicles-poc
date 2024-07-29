import { Box, Button, Card, CardMedia } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { VehiclesContext } from "./VehiclesContext";
import { useContext } from "react";

const VehicleItem = ({ vehicle }) => {
  const { toggleFavourite } = useContext(VehiclesContext);
  return (
    <Card
      sx={{
        display: "flex",
        width: "50vw",
        padding: 2,
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: "350px", height: "200px" }}
          image="/images/placeholder.jpg"
          alt={`${vehicle.make} ${vehicle.model}`}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {vehicle.make} {vehicle.model}{" "}
            <Button
              onClick={() => toggleFavourite(vehicle.id)}
              startIcon={
                vehicle.favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />
              }
            ></Button>
          </Box>
          <div>Year : {vehicle.year}</div>
          <div>Engine : {vehicle.engineSize}</div>
          <div> Fuel type: {vehicle.fuel}</div>
          <div>Mileage : {vehicle.mileage}</div>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <div>{vehicle.auctionDateTime} </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "end",
            gap: 2,
          }}
        >
          <div>Starting bid :{vehicle.startingBid}</div>

          <Link href={`/vehicle/${vehicle.id}`}>
            <Button>More Details</Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default VehicleItem;
