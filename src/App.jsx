import React, { useEffect, useState } from 'react'
import ArticleList from './components/ArticleList'
import { downloadPosts } from './api'

export default function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const data = await downloadPosts(1)
        setPosts(data)
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [])

  return (
    <ArticleList posts={posts} />
  )
}
