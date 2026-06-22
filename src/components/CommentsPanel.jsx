import React, { useState } from 'react'
import { downloadComments } from '../api'
import Comment from './Comment'

export default function CommentsPanel({ postId }) {
  const [comments, setComments] = useState(null)

  async function handleToggle(e) {
    const open = e.currentTarget.open
    if (!open) return
    if (comments) return
    try {
      const data = await downloadComments(postId)
      setComments(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <details onToggle={handleToggle}>
      <summary>See what our readers had to say...</summary>
      <section>
        <header>
          <h3>Comments</h3>
        </header>
        {comments && comments.map(c => (
          <Comment key={c.id} comment={c} />
        ))}
      </section>
    </details>
  )
}
