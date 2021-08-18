import React from 'react' /* eslint-disable */
import DropDown from '../components/DropDownSort'
const VariantSelector = ({ key, onChange, options, value, name, disabled, placeholder }) => {
  if (options.name === 'Title') return null
  console.log(options, options)
  return (
    <>
      <DropDown
        style={{ marginRight: '10px !important' }}
        onChange={onChange}
        value={value}
        name={name}
        key={options.id}
        disabled={disabled}
        data={options}
      />

    </>
  )
}

export default VariantSelector