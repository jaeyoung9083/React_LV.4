import React from "react";
import styled from "styled-components";
function LabledInput({ id, label, placeholder, value, onChange }) {
  return (
    <>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default LabledInput;

const StyledInput = styled.input`
  height: 30px;
  width: 200px;
`;

const StyledLabel = styled.label`
  margin-right: 20px;
`;
