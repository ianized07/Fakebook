import { useState } from 'react'

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu

export default function Post({ post, onAddLike, onSubtractLike, onAddComment, onDuplicatePost, onDeadLink, watchMode, marketMode, feelingMode }) {
  const [showComments, setShowComments] = useState(false)
  const [commentInput, setCommentInput]   = useState('')
  const [localComments, setLocalComments] = useState([])

  const handleComment = () => {
    if (!commentInput.trim()) return
    // BUG 3: comment is pushed twice — appears doubled in the list
    const newComment = { id: Date.now(), text: commentInput, user: 'You' }
    setLocalComments([...localComments, newComment, newComment])
    setCommentInput('')
    onAddComment(post.id)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-fb-border overflow-hidden">

      {/* Post header */}
      <div className="flex items-start gap-3 p-3 pb-2">
        <div className="relative flex-shrink-0">
          {/* BUG 7: Maria Santos has a broken avatar URL */}
          <img
            src={post.avatar}
            alt={post.user}
            className="w-10 h-10 rounded-full object-cover bg-gray-200"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          {post.avatar.includes('broken') && (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm font-bold absolute inset-0">
              {post.user[0]}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[15px] text-fb-text leading-tight">{post.user}</p>
          {/* BUG 8: post id=1 has invalid date "February 31, 2025" */}
          <p className="text-xs text-fb-secondary">{post.timestamp} · 🌐</p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onDeadLink} className="fb-icon-btn w-8 h-8 text-sm">⋯</button>
          {/* BUG ✕: close duplicates the post instead of removing it */}
          <button onClick={() => onDuplicatePost(post.id)} className="fb-icon-btn w-8 h-8 text-sm">✕</button>
        </div>
      </div>

      {/* Post content — BUG 1: raw tags visible; feelingMode replaces all emoji with 💀 */}
      <div className="px-4 pb-3">
        <p className="text-[15px] text-fb-text leading-relaxed whitespace-pre-wrap">
          {feelingMode ? post.content.replace(EMOJI_RE, '💀') : post.content}
        </p>
      </div>

      {/* Post image — watchMode replaces with broken video thumbnail */}
      {watchMode ? (
        <div className="w-full h-48 bg-gray-900 flex flex-col items-center justify-center gap-2 text-gray-500">
          <span className="text-4xl">📹</span>
          <span className="text-xs font-mono">Error: video codec not supported</span>
          <span className="text-[10px] text-gray-600">fakebook-video://stream/0x{post.id.toString(16)}</span>
        </div>
      ) : post.image ? (
        <img src={post.image} alt="post" className="post-image" />
      ) : null}

      {/* Reaction counts */}
      <div className="px-4 py-1.5 flex items-center justify-between text-fb-secondary text-sm border-b border-fb-border">
        <div className="flex items-center gap-1">
          {post.likes !== 0 && (
            <>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-fb-blue text-white text-xs">👍</span>
              {/* BUG: likes can go negative via Share; marketMode shows price */}
              {marketMode ? (
                <span className="text-green-600 font-bold">₱{Math.abs(post.likes).toFixed(2)}</span>
              ) : (
                <span className={`${post.likes < 0 ? 'text-red-500 font-bold' : ''}`}>
                  {post.likes < 0 ? `${post.likes} (negative?!)` : post.likes}
                </span>
              )}
            </>
          )}
          {post.likes === 0 && !marketMode && <span className="text-fb-secondary text-xs">Be the first to react</span>}
          {post.likes === 0 && marketMode && <span className="text-green-600 font-bold">₱0.00</span>}
        </div>
        <div className="flex items-center gap-3">
          {/* BUG 9: comment count hardcoded — localComments.length not added to post.comments */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="hover:underline"
          >
            {post.comments} Comments
          </button>
          <span>{post.shares} Shares</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center px-2 py-1 gap-1">
        {/* BUG 4: every click increments — no toggle, unlimited */}
        <button
          onClick={() => onAddLike(post.id)}
          className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg font-semibold text-[15px] transition-colors hover:bg-fb-hover text-fb-secondary"
        >
          <span>👍</span>
          <span>Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg font-semibold text-[15px] text-fb-secondary hover:bg-fb-hover transition-colors"
        >
          <span>💬</span> Comment
        </button>
        {/* BUG: Share subtracts likes — opposite of Like, can go negative */}
        <button
          onClick={() => onSubtractLike(post.id)}
          className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg font-semibold text-[15px] text-fb-secondary hover:bg-fb-hover transition-colors"
        >
          <span>↗️</span> Share
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="px-4 pb-3 space-y-2 border-t border-fb-border pt-2">
          {localComments.map((c) => (
            <div key={c.id} className="flex items-start gap-2">
              <img
                src="https://i.pravatar.cc/32?img=68"
                alt="You"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="bg-fb-bg rounded-2xl px-3 py-1.5 text-sm">
                <span className="font-semibold text-fb-text mr-1">You</span>
                {c.text}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <img
              src="https://i.pravatar.cc/32?img=68"
              alt="You"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 flex items-center bg-fb-bg rounded-full px-3 gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                placeholder="Write a comment..."
                className="flex-1 bg-transparent outline-none text-sm py-2 text-fb-text placeholder-fb-secondary"
              />
              <button
                onClick={handleComment}
                className="text-fb-blue hover:text-fb-blueDark text-sm font-semibold disabled:opacity-40"
                disabled={!commentInput.trim()}
              >
                ↵
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
