import React from 'react' /* eslint-disable */

const VariantSelector = ({ key, onChange, options, disabled, placeholder }) => {
  if (options.name === 'Title') return null

  return (
    <div className="field ">
      <label className="label has-text-white">{options.name} </label>

      <div className="control">
        <div className="select is-fullwidth">
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
        </div>
      </div>
    </div>
  )
}

export default VariantSelector