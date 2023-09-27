import React, { createContext, useState, useEffect } from 'react';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [country, setCountry] = useState('Location (any)');
  const [date, setDate] = useState("Start Date (any)");
  const [dates, setDates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);

  const getAllHouses = async () => {
    const response = await fetch('http://localhost:4000/api/list-properties');
    const data = await response.json();
    console.log(data.properties);
    setHouses(data.properties);

    const allCountries = data.properties.map((house) => {
      return house.location;
    });

    const uniqueCountries = ['Location (any)', ...new Set(allCountries)];

    setCountries(uniqueCountries);

    const allDates = data.properties.map((house) => {
      return house.date;
    });

    const uniqueDates = ['Start Date (any)', ...new Set(allDates)];

    setDates(uniqueDates);

    const allProperties = data.properties.map((house) => {
      return house.type;
    });

    const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];

    setProperties(uniqueProperties);

  }

  useEffect(() => {
    getAllHouses();
  }, []);

  const handleClick = () => {
    setLoading(true);

    const minPrice = parseInt(price.split(' ')[0]);
    const maxPrice = parseInt(price.split(' ')[2]);

    const filteredHouses = houses.filter((house) => {
      const housePrice = parseInt(house.price);

      const locationFilter = house.location === country || country === 'Location (any)';
      const dateFilter = house.date === date || date === 'Start Date (any)';
      const propertyFilter = house.type === property || property === 'Property type (any)';
      const priceFilter = housePrice >= minPrice && housePrice <= maxPrice || price === 'Price range (any)';

      return locationFilter && dateFilter && propertyFilter && priceFilter;
    });

    setTimeout(() => {
      return (
        filteredHouses.length < 1 ? setHouses([]) : setHouses(filteredHouses),
        setLoading(false)
      );
    }, 1000);  
  };

  return (
    <HouseContext.Provider
      value={{
        date,
        setDate,
        dates,
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        handleClick,
        houses,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
