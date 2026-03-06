import { useState } from 'react'

const CHAR_LIMIT = 280

export default function CreatePost({ onAddPost, onDeadLink, onFeelingMode }) {
  const [content, setContent] = useState('')
  const [showFull, setShowFull] = useState(false)

  const remaining = CHAR_LIMIT - content.length
  const isOverLimit = content.length > CHAR_LIMIT

  const handlePost = () => {
    if (!content.trim()) return
    onAddPost(content)
    setContent('')
    setShowFull(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handlePost()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-fb-border p-3">
      <div className="flex items-center gap-3 mb-3">
        <img
          src="https://i.pravatar.cc/40?img=68"
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        {!showFull ? (
          <button
            onClick={() => setShowFull(true)}
            className="flex-1 text-left bg-fb-bg hover:bg-fb-hover rounded-full px-4 py-2.5 text-fb-secondary text-[15px] transition-colors"
          >
            What's on your mind?
          </button>
        ) : (
          <div className="flex-1">
            {/* BUG 2: textarea is resizable (should be resize-none) */}
            {/* BUG 10: privacy icon mismatch — shows "Public" but with 🔒 (private) icon */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm text-fb-text">You</span>
              <button className="flex items-center gap-1 bg-fb-hover hover:bg-fb-border rounded-md px-2 py-0.5 text-xs font-semibold text-fb-text transition-colors">
                🔒 Public ▾
              </button>
            </div>
            <textarea
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind?"
              rows={4}
              style={{ resize: 'both' }}
              className="w-full outline-none text-fb-text text-[15px] placeholder-fb-secondary bg-transparent min-h-[80px]"
            />
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xs font-mono ${isOverLimit ? 'text-red-500 font-bold' : 'text-fb-secondary'}`}>
                {isOverLimit ? `⚠ ${Math.abs(remaining)} over limit` : `${remaining} remaining`}
              </span>
              <span className="text-xs text-fb-secondary">Ctrl+Enter to post</span>
            </div>
          </div>
        )}
      </div>

      {showFull && (
        <>
          <hr className="border-fb-border mb-3" />

          {/* Post attachment options */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              {/* BUG Photo/Video: injects broken image reference into post text */}
              <button
                onClick={() => setContent((prev) => prev + `\n<img src="https://fakebook-cdn.broken/photo_${Date.now()}.jpg">`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-fb-hover text-sm font-semibold text-fb-secondary transition-colors"
              >
                📷 Photo/Video
              </button>
              {/* BUG Feeling: replaces all emoji in the entire feed with 💀 */}
              <button
                onClick={onFeelingMode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-fb-hover text-sm font-semibold text-fb-secondary transition-colors"
              >
                😊 Feeling
              </button>
              {/* BUG Location: appends GPS error text to post box */}
              <button
                onClick={() => setContent((prev) => prev + '\n📍 Error: GPS unavailable')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-fb-hover text-sm font-semibold text-fb-secondary transition-colors"
              >
                📍 Location
              </button>
            </div>
          </div>

          {/* BUG 3: Button appears visually disabled when over limit (opacity-50, cursor-not-allowed)
               BUT the `disabled` HTML attribute is NOT set, so it still fires on click.
               Posting over the character limit is still possible. */}
          <button
            onClick={handlePost}
            className={`w-full py-2 rounded-lg font-semibold text-[15px] transition-colors ${
              !content.trim()
                ? 'bg-fb-hover text-fb-secondary cursor-not-allowed'
                : isOverLimit
                  ? 'bg-fb-blue text-white opacity-50 cursor-not-allowed'
                  : 'bg-fb-blue hover:bg-fb-blueDark text-white'
            }`}
          >
            Post
          </button>
        </>
      )}

      {/* Quick action bar when collapsed */}
      {!showFull && (
        <>
          <hr className="border-fb-border mb-3" />
          <div className="flex items-center justify-around">
            <button
              onClick={() => setShowFull(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg hover:bg-fb-hover transition-colors text-sm font-semibold text-fb-secondary"
            >
              📺 Live Video
            </button>
            <button
              onClick={() => setShowFull(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg hover:bg-fb-hover transition-colors text-sm font-semibold text-fb-secondary"
            >
              📷 Photo/Video
            </button>
            <button
              onClick={() => setShowFull(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg hover:bg-fb-hover transition-colors text-sm font-semibold text-fb-secondary"
            >
              😊 Feeling/Activity
            </button>
          </div>
        </>
      )}
    </div>
  )
}
