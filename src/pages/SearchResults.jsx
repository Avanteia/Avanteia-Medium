import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Search Results for "{searchQuery}"</h2>
      {/* TODO: Fetch and display search results */}
    </div>
  );
};

export default SearchResults;
