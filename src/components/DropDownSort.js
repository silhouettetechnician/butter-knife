import React from 'react'
import Select from "react-select";

export const Dropdown = ({ priceSort, setPriceSort }) => {

    const options = [
        {
          value: 'featured',
          label: 'Featured'
        },
        {
          value: 'new',
          label: "What's new"
        },
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
        <><Select width='200px' options={options} onChange={(values) => setPriceSort(values)} value={priceSort} /></>
    )
}

export default Dropdown

