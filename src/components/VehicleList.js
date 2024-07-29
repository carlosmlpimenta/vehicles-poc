import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import React, { useContext } from "react";

import CarFilter from "./CarFilter";
import VehicleItem from "./VehicleItem";
import { VehiclesContext } from "./VehiclesContext";

const VehicleList = () => {
  const {
    isLoading,
    vehicles,
    page,
    setPage,
    filter,
    sort,
    rowsPerPage,
    showOnlyFavorites,
    minBid,
    maxBid,
  } = useContext(VehiclesContext);

  let vehicleList = vehicles.filter((vehicle) => {
    if (filter.make && vehicle.make !== filter.make) return false;
    if (filter.model && vehicle.model !== filter.model) return false;
    if (showOnlyFavorites && !vehicle.favourite) return false;
    if (minBid !== null && vehicle.startingBid < minBid) return false;
    if (maxBid !== null && vehicle.startingBid > maxBid) return false;
    return true;
  });

  if (sort) {
    vehicleList = vehicleList.sort((a, b) => {
      if (sort === "make") return a.make.localeCompare(b.make);
      if (sort === "model") return a.model.localeCompare(b.model);
      if (sort === "startingBid") return a.startingBid - b.startingBid;
      if (sort === "mileage") return a.mileage - b.mileage;
      if (sort === "auctionDate")
        return new Date(a.auctionDate) - new Date(b.auctionDate);
      return 0;
    });
  }

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleVehicles = vehicleList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(vehicleList.length / rowsPerPage);

  return (
    <Stack sx={{ display: "flex", alignItems: "center" }} spacing={2}>
      <CarFilter />
      {isLoading && <CircularProgress />}
      {visibleVehicles?.map((vehicle) => (
        <VehicleItem key={vehicle.id} vehicle={vehicle} />
      ))}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          backgroundColor: "#f5f5f5",
          padding: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => {
            setPage(value);
          }}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Stack>
  );
};

export default VehicleList;
