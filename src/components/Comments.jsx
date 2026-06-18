function Comments({ comments }) {
  return (
    <>
      {comments.map((comment) => (
        <aside key={comment.id}>
          <p>{comment.body}</p>
          <p><small>{comment.name}</small></p>
        </aside>
      ))}
    </>
  )
}

export default Comments
