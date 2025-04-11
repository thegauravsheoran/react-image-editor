const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }
    onSearch(query);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images..."
        style={{ padding: '8px', width: '250px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px' }}>
        Search
      </button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </div>
  );
};