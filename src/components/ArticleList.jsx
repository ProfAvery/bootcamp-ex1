import React from 'react'
import ArticleItem from './ArticleItem'
import CommentsPanel from './CommentsPanel'

export default function ArticleList({ posts }) {
  if (!posts || posts.length === 0) return null
  return (
    <>
      {posts.map(post => (
        <React.Fragment key={post.id}>
          <ArticleItem post={post} />
          <CommentsPanel postId={post.id} />
        </React.Fragment>
      ))}
    </>
  )
}
