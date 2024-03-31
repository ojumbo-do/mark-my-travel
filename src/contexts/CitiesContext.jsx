import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();

        setCities(data);
      } catch {
        alert("Error fetching cities");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();

      setCurrentCity(data);
    } catch {
      alert("Error fetching cities");
    } finally {
      setIsLoading(false);
    }
  }

  //sending data to the API/server
  async function createCity(newCity) {
    try {
      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setCities((cities) => [...cities, data]);
    } catch {
      alert("Error fetching cities");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside scope");

  return context;
}

export { CitiesProvider, useCities };
