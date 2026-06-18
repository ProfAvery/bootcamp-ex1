import { useState, useEffect } from 'react'
import ArticleList from './components/ArticleList'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const downloadPosts = async () => {
      try {
        setLoading(true)
        const postsURL = 'https://jsonplaceholder.typicode.com/posts?_page=2'
        const response = await fetch(postsURL)
        const articles = await response.json()
        setPosts(articles)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    downloadPosts()
  }, [])

  return (
    <>
      <header>
        <h1>Lorem Ipsum News</h1>
        <p>"All the news that's fit to <em>consectetur adipiscing elit</em>"</p>
      </header>

      <main>
        {loading && <p>Loading posts...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <ArticleList posts={posts} />}
      </main>
    </>
  )
}

export default App
