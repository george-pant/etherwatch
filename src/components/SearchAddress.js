import React, { PureComponent } from "react";
import EtherUtils from '../core/EtherUtils';
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export default class SearchAddress extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            searchResults: []
        };
      }

      handleSearchChange = event => {
        this.setState({ 
            input: event.target.value 
            });
      };

      searchAddress = () => {
        EtherUtils.getWalletTokensWithBalanceFull(this.state.input).then((tokens) => {
            console.log(tokens);
        this.setState({
            searchResults: tokens
            });
        });
    }
    

render() {

    return (
      <div>
        <SearchBar 
        onTextChange={this.handleSearchChange}
        onClickSearch={this.searchAddress}
        />
        <SearchResults results={this.state.searchResults} />
      </div>
    );
  }

}
