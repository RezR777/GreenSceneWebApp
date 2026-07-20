import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search-bar">
        <input
            type="text"
            placeholder="Searching events..."
          />
    
          <button>
            Search
          </button>
      </div>
    );
}

export default SearchBar

