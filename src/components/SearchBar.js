import React, { PureComponent } from "react";
import PropTypes from "prop-types";


const SearchInput = (props) => {

    return(
    <div className='searchBar'>
        <label htmlFor="searchAddress">
            <span className="hide">Search ethereum Wallet</span>
        </label>
        <input
            type="text"
            id="searchAddress"
            className="searchInput"
            placeholder="Enter address"
            onChange = { props.onTextChange }
        />
        <button 
            className="searchButton"
            onClick={ props.onClickSearch }>
                Search
        </button>
     </div>
    )
}


SearchInput.propTypes = {
    onTextChange: PropTypes.func,
    onClickSearch: PropTypes.func
  };


export default SearchInput;
