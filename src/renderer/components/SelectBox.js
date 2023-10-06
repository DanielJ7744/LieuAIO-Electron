// @flow
import * as React from 'react';
import '../styles/SelectBox.scss';
import arrowDown from '../assets/Task Icons/chevron-down-regular-72.png';

export const SelectBox = ({ selectValue, setValue, defaultOp, option, handleChangeValue }) => {
  return (
    <div className="selectBox">
      <select
        onChange={(e) => {
          setValue(e.target.value);
          handleChangeValue(e);
        }}
        required
      >
        <option value="default">{defaultOp}</option>
        {option.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <option value={item.value} key={index}>
            {item.value}
          </option>
        ))}
      </select>
      <img src={arrowDown} alt="" />
    </div>
  );
};
export default SelectBox;
