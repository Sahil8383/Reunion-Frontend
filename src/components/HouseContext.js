import React, { createContext, useState, useEffect } from 'react';

// import data
import { housesData } from '../data';

// create context
export const HouseContext = createContext();

// provider
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


  const filterHouses = () => {
    return houses.filter((house) => {
      const housePrice = parseInt(house.price);
      const minPrice = parseInt(price.split(' ')[0]);
      const maxPrice = parseInt(price.split(' ')[2]);
      return (
        (house.country === 'Location (any)' || house.location === country) &&
        (house.date === 'Start Date (any)' || house.date === date) &&
        (house.property === 'Property type (any)' || house.type === property) &&
        (house.price === 'Price range (any)' || (housePrice >= minPrice && housePrice <= maxPrice))
      );
    });
  };

  const handleClick = () => {

    setLoading(true);

    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };


    const minPrice = parseInt(price.split(' ')[0]);
    const maxPrice = parseInt(price.split(' ')[2]);

    const newHouses = houses.filter((house) => {
      const housePrice = parseInt(house.price);

      if (
        house.location === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      if (isDefault(country) && isDefault(property) && isDefault(price) && isDefault(date)) {
        return house;
      }

      if (!isDefault(country) && isDefault(property) && isDefault(price) && isDefault(date)) {
        return house.location === country;
      }

      if (isDefault(country) && isDefault(property) && isDefault(price) && !isDefault(date)) {
        return house.date === date;
      }

      if (!isDefault(property) && isDefault(country) && isDefault(price) && isDefault(date)) {
        return house.type === property;
      }

      if (!isDefault(price) && isDefault(country) && isDefault(property) && isDefault(date)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      if (!isDefault(country) && !isDefault(property) && isDefault(price) && isDefault(date)) {
        return house.location === country && house.type === property;
      }

      if (!isDefault(country) && isDefault(property) && !isDefault(price) && isDefault(date)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.location === country;
        }
      }

      if (isDefault(country) && !isDefault(property) && !isDefault(price) && isDefault(date)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    }
    );

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
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
