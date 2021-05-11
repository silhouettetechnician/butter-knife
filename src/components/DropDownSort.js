import React, { useState } from 'react'
import styled from '@emotion/styled'
import Select from '@material-ui/core/Select';

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
export const StyledOption = styled.option`
    text-transform: uppercase;
    font-family: CODE;
`
export const Dropdown = ({val, setVal}) => {

    const handleChange = (event) => {
        // const name = event.target.name;
        setVal(event.target.value);
        // console.log(val, 'value')
    };

    return (
        <StyledSelect
            outline
            native
            placeholder='SORT BY'
            inputProps={{
                name: 'age',
            }}
            value={val}
            onChange={handleChange}
            style={{ margin: '2% !important' }}
        >
            <StyledOption aria-label="Sort by" value="" />
            <StyledOption value={10}>Newest</StyledOption>
            <StyledOption value={20}>Price (High)</StyledOption>
            <StyledOption value={30}>Price (Low)</StyledOption>
        </StyledSelect>
    )
}

export default Dropdown

