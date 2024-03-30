import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = `http://localhost:8000`;

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();

        setCities(data);

        console.log(data);
      } catch {
        alert("Error fetching cities");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
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
