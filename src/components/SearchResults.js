

const SearchResults = (props) => (

    <div className='searchResults'>
        {
        Object.keys(props.results).map( (key,index) => <div>{ props.results[key]['symbol'] } ( { props.results[key]['name']})  - { props.results[key]['balance']}</div>)
        }
     </div>
);

export default SearchResults;
