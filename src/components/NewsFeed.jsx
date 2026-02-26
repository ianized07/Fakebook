import Stories from './Stories'
import CreatePost from './CreatePost'
import Post from './Post'

export default function NewsFeed({
  posts, onAddPost, onAddLike, onSubtractLike, onAddComment,
  onDuplicatePost, onDeadLink, onFeelingMode,
  watchMode, marketMode, feelingMode,
}) {
  return (
    <main className="py-4 space-y-4 min-w-0">
      <Stories onDeadLink={onDeadLink} />
      <CreatePost onAddPost={onAddPost} onDeadLink={onDeadLink} onFeelingMode={onFeelingMode} />
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onAddLike={onAddLike}
          onSubtractLike={onSubtractLike}
          onAddComment={onAddComment}
          onDuplicatePost={onDuplicatePost}
          onDeadLink={onDeadLink}
          watchMode={watchMode}
          marketMode={marketMode}
          feelingMode={feelingMode}
        />
      ))}
    </main>
  )
}
