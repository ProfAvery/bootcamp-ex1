import Article from './Article'

function ArticleList({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <Article key={post.id} post={post} />
      ))}
    </>
  )
}

export default ArticleList
