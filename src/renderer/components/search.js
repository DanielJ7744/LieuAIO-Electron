import * as React from 'react';
import '../styles/search.scss';
import searchIcon from '../assets/search.png';

export const Search = ({ plchldr, value, setValue }) => (
  <div className="searchPart">
    <input
      type="search"
      placeholder={plchldr}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
    <img src={searchIcon} alt="searchIcon" />
  </div>
);

export default Search;
