import React from 'react'
import Select from "react-select";
import Flex from '../styles/Flex';
import MenuItem from '@material-ui/core/MenuItem';

export const Dropdown = ({ priceSort, setPriceSort, style, data, key, value, name, onChange }) => 
    (
        <><Select style={style} key={key} name={name} width='200px' options={data} onChange={onChange} value={value}/></>
    )

export default Dropdown

