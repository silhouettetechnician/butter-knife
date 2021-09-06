import React, { useState } from 'react' /* eslint-disable */
import styled from '@emotion/styled'
import Flex from '../styles/Flex'
// import Select from "react-select";

const Select = styled.select`
  width: 100%;
  height: 35px;
  font-family: CODE;
  border: 1px solid lightgrey;
  &:after{
    color: lightgrey;
  }
`
const Label = styled.label`
font-size: 1rem;
font-family: CODE !important;
margin-right: 1%;
color: ${props => props.isDark ? 'white' : 'black'}
`
const VariantSelector = ({ key, onChange, options, disabled, placeholder ,isDark }) => {
  if (options.name === 'Title') return null

  const [value, setValue] = useState(options.values[0])

console.log(options, 'options')
console.log(value, 'value')

const optionsMapped = Object.entries(options).map(([key, value]) => ({
  value: value,
  label: value
}))
  return (
    <Flex style={{margin: '5px'}} alignCenter justifyAround width='100%'>
      <Label isDark={isDark} className="label has-text-white">{options.name}: </Label>
        <Flex width='50%'>
          <Select
            onBlur={onChange}
            // onChange={value => {console.log(value, 'value'); setValue(value)}}
            name={options.name}
            key={options.id}
            disabled={disabled}
            // getOptionValue={}
            // value={value}
            // options={options.values}
          >
            {placeholder && (
              <option value="" selected disabled hidden>
                {placeholder}
              </option>
            )}
            {options.values.map((value, index) => (
              <option
                key={`${options.name}-${value}`}
                value={value}
                className="is-medium"
              >
                {`${value}`}
              </option>
            ))}
            </Select>
        </Flex>
    </Flex>
  )
}

export default VariantSelector