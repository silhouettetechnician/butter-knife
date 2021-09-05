import React from 'react' /* eslint-disable */
import styled from '@emotion/styled'
import Flex from '../styles/Flex'

const Label = styled.label`
font-size: 1rem;
font-family: CODE !important;
margin-right: 1%;
color: ${props => props.isDark ? 'white' : 'black'}
`
const VariantSelector = ({ key, onChange, options, disabled, placeholder,isDark }) => {
  if (options.name === 'Title') return null

  return (
    <Flex justifyBetween width='100%'>
      <Label isDark={isDark} className="label has-text-white">{options.name}: </Label>
        <Flex>
          <select
            onBlur={onChange}
            name={options.name}
            key={options.id}
            disabled={disabled}
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
          </select>
        </Flex>
    </Flex>
  )
}

export default VariantSelector