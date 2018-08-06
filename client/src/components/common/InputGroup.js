import React from 'react'
import PropTypes from 'prop-types';

const InputGroup = ({
    name, 
    placeholder,
    value,
    icon,
    type,
    error,
    onChange
}) => {
  return (
    <div className="input-group mb-3">
    <div className="input-group-prepend">
    <div className="input-group-text">
    <i className={icon} />
    </div>
    </div>
      <input
        placeholder={placeholder}
        name={name} 
        className={`form-control form-control-lg ${error && 'is-invalid'}`} 
        value={value} 
        onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

InputGroup.defaultProps = {
    type: 'text'
}


export default InputGroup;
