import React from 'react'
import Select from "react-select";
import Flex from '../styles/Flex';

export const Dropdown = ({ priceSort, setPriceSort }) => {

    const options = [
        {
          value: 'featured',
          label: 'Featured'
        },
        {
          value: 'price low',
          label: 'Price low'
        },
        {
          value: 'price high',
          label: 'Price high'
        },
      ]

    return (
        <Flex width='100%' padding='0 100px' justifyEnd><Select width='200px' options={options} onChange={(values) => setPriceSort(values)} value={priceSort} /></Flex>
    )
}

export default Dropdown

