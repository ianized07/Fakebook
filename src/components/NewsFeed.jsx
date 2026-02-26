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
      {watchMode && (
        <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl flex items-center gap-3 border border-green-500/30">
          <span className="text-xl">📺</span>
          <div>
            <p className="font-bold">WATCH MODE ACTIVE</p>
            <p className="text-xs text-green-600">fakebook-video://codec_error — all media streams unavailable</p>
          </div>
        </div>
      )}
      {marketMode && (
        <div className="bg-green-50 text-green-800 font-mono text-sm px-4 py-3 rounded-xl flex items-center gap-3 border border-green-300">
          <span className="text-xl">🛍️</span>
          <div>
            <p className="font-bold">MARKETPLACE MODE ACTIVE</p>
            <p className="text-xs text-green-600">All engagement metrics converted to ₱ pricing</p>
          </div>
        </div>
      )}
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
