import React, { useState } from 'react'
import styled from '@emotion/styled'
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";

export const StyledSelect = styled(Select)`
    width: 10rem;
    margin: 2%;
    & > select{
        text-transform: uppercase;
        font-family: CODE;
        background: transparent;
        border-radius: 3px;
    }
    &:after{
        border: 2px solid rgb(254,205,47) !important;
    }
`
export const StyledOption = styled(MenuItem)`
    text-transform: uppercase;
    font-family: CODE;
`
export const Dropdown = ({val, setVal, data}) => {

    const handleChange = (event) => {
        // const name = event.target.name;
        console.log(event.target.value, 'e.target')
        setVal(event.target.value);
        console.log(val, 'value in handle change')
    };

console.log(data, 'data')
    return (
        <StyledSelect
            // native
            // multiple
            placeholder='Choose Size'
            inputProps={{
                name: 'size',
            }}
            value={val}
            onChange={handleChange}
            style={{ margin: '2% !important' }}
            >
            {data && data.map(({title, id}) => (
            <StyledOption key={title} value={id}>
              {title}
            </StyledOption>
          ))}
            </StyledSelect>
    )
}

export default Dropdown

