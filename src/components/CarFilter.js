import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useMemo, useState } from "react";

import { VehiclesContext } from "./VehiclesContext";

const CarFilter = () => {
  const {
    vehicles,
    setFilter,
    showOnlyFavorites,
    setShowOnlyFavorites,
    minBid,
    setMinBid,
    maxBid,
    setMaxBid,
    setSort,
    filter,
    sort,
    rowsPerPage,
    setRowsPerPage,
    setPage,
  } = useContext(VehiclesContext);

  const [selectedMake, setSelectedMake] = useState("");

  const makes = useMemo(() => {
    if (!vehicles) return [];
    const makeList = vehicles.map((vehicle) => vehicle.make);
    const uniqueValues = [...new Set(makeList)];
    return uniqueValues;
  }, [vehicles]);

  const models = useMemo(() => {
    if (!vehicles || !selectedMake) return [];

    const filteredAndSortedVehicles = vehicles.filter(
      (vehicle) => vehicle.make === selectedMake
    );

    const modelList = filteredAndSortedVehicles.map((vehicle) => vehicle.model);
    const uniqueValues = [...new Set(modelList)];
    return uniqueValues;
  }, [vehicles, selectedMake]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        padding: 2,
        gap: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "70vw",
          justifyContent: "center",
        }}
      >
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Make</InputLabel>
          <Select
            value={selectedMake}
            onChange={(event) => {
              setSelectedMake(event.target.value);
              setFilter((prev) => ({
                ...prev,
                make: event.target.value,
                model: "",
              }));
            }}
          >
            <MenuItem value="">None</MenuItem>
            {makes.map((make, index) => (
              <MenuItem key={index} value={make}>
                {make}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Model</InputLabel>
          <Select
            value={filter.model}
            onChange={(event) => {
              setFilter((prev) => ({ ...prev, model: event.target.value }));
            }}
            disabled={!selectedMake}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {models.map((model, index) => (
              <MenuItem key={index} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
            }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="make">Make</MenuItem>
            <MenuItem value="model">Model</MenuItem>
            <MenuItem value="startingBid">Starting Bid</MenuItem>
            <MenuItem value="mileage">Mileage</MenuItem>
            <MenuItem value="auctionDate">Auction Date</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "60%",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Min Bid"
          type="number"
          value={minBid ? minBid : ""}
          onChange={(event) => {
            setMinBid(
              event.target.value === "" ? null : Number(event.target.value)
            );
          }}
          sx={{ width: 120 }}
        />

        <TextField
          label="Max Bid"
          type="number"
          value={maxBid ? maxBid : ""}
          onChange={(event) => {
            setMaxBid(
              event.target.value === "" ? null : Number(event.target.value)
            );
          }}
          sx={{ width: 120 }}
        />
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Vehicles per page</InputLabel>
          <Select
            value={rowsPerPage}
            onChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(1);
            }}
            label="Rows per page"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={showOnlyFavorites}
              onChange={(event) => setShowOnlyFavorites(event.target.checked)}
            />
          }
          label="Show only favourites"
        />
      </Box>
    </Box>
  );
};

export default CarFilter;
