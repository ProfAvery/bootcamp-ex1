import React, { useEffect, useState } from 'https://esm.sh/react@18.3.1?dev'
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client?dev'

// https://jsonplaceholder.typicode.com/guide/

async function downloadPosts(page = 1) {
  const postsURL = `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  const response = await fetch(postsURL)
  const articles = await response.json()
  return articles
}

async function downloadComments(postId) {
  const commentsURL = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  const response = await fetch(commentsURL)
  const comments = await response.json()
  return comments
}

async function getUserName(userId) {
  const userURL = `https://jsonplaceholder.typicode.com/users/${userId}`
  const response = await fetch(userURL)
  const user = await response.json()
  return user.name
}

function renderBody(text) {
  return text.split('\n').flatMap((line, index) => {
    if (index === 0) {
      return line
    }

    return [React.createElement('br', { key: `break-${index}` }), line]
  })
}

function PostCard({ post }) {
  const [isOpen, setIsOpen] = useState(false)
  const [comments, setComments] = useState([])
  const [commentsLoaded, setCommentsLoaded] = useState(false)
  const [commentsError, setCommentsError] = useState('')
  const [loadingComments, setLoadingComments] = useState(false)

  useEffect(() => {
    if (!isOpen || commentsLoaded) {
      return undefined
    }

    let cancelled = false

    async function loadComments() {
      setLoadingComments(true)
      setCommentsError('')

      try {
        const downloadedComments = await downloadComments(post.id)
        if (!cancelled) {
          setComments(downloadedComments)
          setCommentsLoaded(true)
        }
      } catch {
        if (!cancelled) {
          setCommentsError('Unable to load comments.')
        }
      } finally {
        if (!cancelled) {
          setLoadingComments(false)
        }
      }
    }

    loadComments()

    return () => {
      cancelled = true
    }
  }, [commentsLoaded, isOpen, post.id])

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'article',
      { 'data-post-id': post.id },
      React.createElement('h2', null, post.title),
      React.createElement(
        'aside',
        null,
        'by ',
        React.createElement('span', { className: 'author' }, post.author)
      ),
      React.createElement('p', null, renderBody(post.body))
    ),
    React.createElement(
      'details',
      {
        open: isOpen,
        onToggle: event => setIsOpen(event.currentTarget.open)
      },
      React.createElement('summary', null, 'See what our readers had to say...'),
      React.createElement(
        'section',
        null,
        React.createElement(
          'header',
          null,
          React.createElement('h3', null, 'Comments')
        ),
        loadingComments ? React.createElement('p', null, 'Loading comments...') : null,
        commentsError ? React.createElement('p', null, commentsError) : null,
        comments.map(comment =>
          React.createElement(
            'aside',
            { key: comment.id },
            React.createElement('p', null, renderBody(comment.body)),
            React.createElement('p', null, React.createElement('small', null, comment.name))
          )
        )
      )
    )
  )
}

function App() {
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadPosts() {
      try {
        const downloadedPosts = await downloadPosts(2)
        const authorCache = new Map()

        const postsWithAuthors = await Promise.all(
          downloadedPosts.map(async post => {
            if (!authorCache.has(post.userId)) {
              authorCache.set(post.userId, await getUserName(post.userId))
            }

            return {
              ...post,
              author: authorCache.get(post.userId)
            }
          })
        )

        if (!cancelled) {
          setPosts(postsWithAuthors)
        }
      } catch {
        if (!cancelled) {
          setPostsError('Unable to load posts.')
        }
      } finally {
        if (!cancelled) {
          setLoadingPosts(false)
        }
      }
    }

    loadPosts()

    return () => {
      cancelled = true
    }
  }, [])

  if (loadingPosts) {
    return React.createElement('p', null, 'Loading posts...')
  }

  if (postsError) {
    return React.createElement('p', null, postsError)
  }

  return React.createElement(
    React.Fragment,
    null,
    posts.map(post => React.createElement(PostCard, { key: post.id, post }))
  )
}

createRoot(document.querySelector('main')).render(React.createElement(App))
