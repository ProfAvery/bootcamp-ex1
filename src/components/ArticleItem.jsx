import React, { useEffect, useState } from 'react'
import { getUserName } from '../api'

export default function ArticleItem({ post }) {
  const [author, setAuthor] = useState('')

  useEffect(() => {
    let mounted = true
    getUserName(post.userId)
      .then(name => { if (mounted) setAuthor(name) })
      .catch(() => { if (mounted) setAuthor('Unknown') })
    return () => { mounted = false }
  }, [post.userId])

  return (
    <article data-post-id={post.id}>
      <h2>{post.title}</h2>
      <aside>by <span className="author">{author}</span></aside>
      <p dangerouslySetInnerHTML={{ __html: post.body.replaceAll('\n', '<br>') }} />
    </article>
  )
}
