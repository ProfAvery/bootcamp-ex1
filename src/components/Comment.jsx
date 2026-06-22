import React from 'react'

export default function Comment({ comment }) {
  return (
    <aside>
      <p dangerouslySetInnerHTML={{ __html: comment.body.replaceAll('\n', '<br>') }} />
      <p><small>{comment.name}</small></p>
    </aside>
  )
}
