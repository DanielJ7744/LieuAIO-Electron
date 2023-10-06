// @flow
import * as React from 'react';
import '../styles/InputBox.scss';

export const TextArea = ({ value, setValue, plchldr, handleChangeValue }) => (
  <textarea
    value={value}
    onChange={(event) => {
      setValue(event.target.value);
      handleChangeValue(event);
    }}
    placeholder={plchldr}
  />
);

export default TextArea;
