import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState(1);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMoreCommits = () => {
    setPage(page + 1);
  }

  useEffect(() => {
    fetch(`https://api.github.com/search/commits?q=repo:facebook/react+css&page=${page}`,
    {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview"
      })
    }
    )
    .then(res => res.json())
    .then(response => {
      setCommits(response.items);
      setLoading(false);
    })
    .catch(error => console.log(error));
  }, [page]);
  
  return (
    <div className="App">
      <h1>Commits</h1>
      {loading && <p>Loading commits</p>}

      {commits.length !== 0 && (
        <button onClick={loadMoreCommits}>Load More Commits</button>
      )}

      {commits.map((c, index) => (
        <div key={index}>
          {c.commit && (
            <>
              <div>
                <h2>
                  {c.commit.committer.name}
                </h2>
                <p>
                  {c.commit.message}
                </p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
