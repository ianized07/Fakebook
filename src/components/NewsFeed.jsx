import Stories from './Stories'
import CreatePost from './CreatePost'
import Post from './Post'

export default function NewsFeed({ posts, onAddPost, onAddLike, onAddComment, onDeadLink }) {
  return (
    <main className="py-4 space-y-4 min-w-0">
      <Stories onDeadLink={onDeadLink} />
      <CreatePost onAddPost={onAddPost} onDeadLink={onDeadLink} />
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onAddLike={onAddLike}
          onAddComment={onAddComment}
          onDeadLink={onDeadLink}
        />
      ))}
    </main>
  )
}
