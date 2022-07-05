import React from "react";
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {

    render() {

        return (
            <div className="SearchResults">
                <h2>Results</h2>
               <TrackList tracks={this.props.searchResults}  onAdd={this.props.onAdd} isRemoval={false}/>{/*2)Le paso al componente TrackList las props de searchResult que me llegaron */}
            </div>
        );
    }


}

export default SearchResults;