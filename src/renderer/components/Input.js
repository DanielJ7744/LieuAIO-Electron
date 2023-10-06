import * as React from 'react';
import '../styles/InputBox.scss';

export const Input = ({ plchldr, setValue, value, handleChangeValue }) => (
  <input
    id="form-input-box"
    value={value}
    onChange={(e) => {
      setValue(e.target.value);
      handleChangeValue(e);
    }}
    type="text"
    placeholder={plchldr}
  />
);

export default Input;
