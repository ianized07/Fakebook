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
      {feelingMode && (
        <div className="bg-gray-900 text-white font-mono text-sm px-4 py-3 rounded-xl flex items-center gap-3">
          <span className="text-xl">💀</span>
          <div>
            <p className="font-bold">FEELING: 💀 APPLIED TO ALL POSTS</p>
          </div>
        </div>
      )}
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
