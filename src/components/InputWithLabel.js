import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const InputWithLabel = ({ id, value, children, onInputChange }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label htmlFor={id}>{children} </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default InputWithLabel;
