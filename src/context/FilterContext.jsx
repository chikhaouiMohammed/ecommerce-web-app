// src/FilterContext.js
import { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [priceRange, setPriceRange] = useState([0, 100]);

    return (
        <FilterContext.Provider value={{ priceRange, setPriceRange }}>
            {children}
        </FilterContext.Provider>
    );
};
