import { useState, useEffect } from 'react'
import Comments from './Comments'

function Article({ post }) {
  const [author, setAuthor] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [comments, setComments] = useState(null)
  const [loadingComments, setLoadingComments] = useState(false)

  // Fetch author name
  useEffect(() => {
    const getUserName = async () => {
      const userURL = `https://jsonplaceholder.typicode.com/users/${post.userId}`
      const response = await fetch(userURL)
      const user = await response.json()
      setAuthor(user.name)
    }

    getUserName()
  }, [post.userId])

  // Fetch comments when details is opened
  const handleToggle = async (e) => {
    const newState = e.currentTarget.open
    setIsOpen(newState)

    if (newState && !comments) {
      setLoadingComments(true)
      try {
        const commentsURL = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        const response = await fetch(commentsURL)
        const data = await response.json()
        setComments(data)
      } finally {
        setLoadingComments(false)
      }
    }
  }

  const body = post.body.split('\n').map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ))

  return (
    <>
      <article>
        <h2>{post.title}</h2>
        <aside>by <span className="author">{author || 'Loading...'}</span></aside>
        <p>{body}</p>
      </article>

      <details onToggle={handleToggle}>
        <summary>See what our readers had to say...</summary>
        <section>
          <header>
            <h3>Comments</h3>
          </header>
          {loadingComments && <p>Loading comments...</p>}
          {comments && <Comments comments={comments} />}
        </section>
      </details>
    </>
  )
}

export default Article
