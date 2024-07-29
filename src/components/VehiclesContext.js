import React, { createContext, useEffect, useState } from "react";

const VehiclesContext = createContext();

const VehiclesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [minBid, setMinBid] = useState(null);
  const [maxBid, setMaxBid] = useState(null);
  const toggleFavourite = (id) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, favourite: !vehicle.favourite }
          : vehicle
      )
    );
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("/data/vehicles_dataset.json")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.log("Failed to load vehicles data:", error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        isLoading,
        setFilter,
        filter,
        setSort,
        setPage,
        sort,
        setRowsPerPage,
        showOnlyFavorites,
        setShowOnlyFavorites,
        minBid,
        setMinBid,
        maxBid,
        setMaxBid,
        toggleFavourite,
        rowsPerPage,
        page,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};

export { VehiclesContext, VehiclesProvider };
