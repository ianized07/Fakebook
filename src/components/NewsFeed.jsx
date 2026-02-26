import Stories from './Stories'
import CreatePost from './CreatePost'
import Post from './Post'

export default function NewsFeed({ posts, onAddPost, onToggleLike, onAddComment }) {
  return (
    <main className="py-4 space-y-4 min-w-0">
      <Stories />
      <CreatePost onAddPost={onAddPost} />
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onToggleLike={onToggleLike}
          onAddComment={onAddComment}
        />
      ))}
    </main>
  )
}
