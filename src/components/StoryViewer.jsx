import { useState, useEffect, useRef, memo } from 'react'

const STORY_DURATION = 5000

function StoryViewer({ users, startUserIndex, onClose }) {
  const [userIndex, setUserIndex] = useState(startUserIndex)
  const [storyIndex, setStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const refs = useRef({ userIndex: startUserIndex, storyIndex: 0 })
  const pointerDownTime = useRef(0)
  const HOLD_THRESHOLD = 200

  useEffect(() => {
    refs.current = { userIndex, storyIndex }
  }, [userIndex, storyIndex])

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0)
  }, [userIndex, storyIndex])

  // Timer
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + (50 / STORY_DURATION) * 100))
    }, 50)
    return () => clearInterval(interval)
  }, [userIndex, storyIndex, isPaused])

  const goNext = () => {
    const { userIndex: ui, storyIndex: si } = refs.current
    const currentUser = users[ui]
    if (si < currentUser.stories.length - 1) {
      // Next story within same user
      setStoryIndex(si + 1)
    } else if (ui < users.length - 1) {
      // Next user
      setUserIndex(ui + 1)
      setStoryIndex(0)
    } else {
      // All done
      onClose()
    }
  }

  const goPrev = () => {
    const { userIndex: ui, storyIndex: si } = refs.current
    if (si > 0) {
      // Previous story within same user
      setStoryIndex(si - 1)
    } else if (ui > 0) {
      // Previous user, last story
      const prevUser = users[ui - 1]
      setUserIndex(ui - 1)
      setStoryIndex(prevUser.stories.length - 1)
    }
  }

  // Auto-advance when progress completes
  useEffect(() => {
    if (progress >= 100) goNext()
  }, [progress])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const currentUser = users[userIndex]
  const currentStory = currentUser.stories[storyIndex]

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`relative w-[320px] h-[560px] rounded-2xl overflow-hidden shadow-2xl ${currentStory.bg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bars — one per story in current user */}
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-20 pointer-events-none">
          {currentUser.stories.map((_, i) => (
            <div key={i} className="flex-1 h-[3px] bg-white/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: i < storyIndex ? '100%' : i === storyIndex ? `${progress}%` : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Header — shows current user */}
        <div className="absolute top-7 left-3 right-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-fb-blue border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {currentUser.user[0]}
            </div>
            <span className="text-white text-sm font-semibold" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
              {currentUser.user}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="text-white w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full text-base font-bold"
          >
            ✕
          </button>
        </div>

        {/* Story content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-8xl">{currentStory.emoji}</span>
        </div>

        {/* Paused indicator */}
        {isPaused && (
          <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none z-20">
            <span className="text-white text-xs bg-black/50 px-3 py-1 rounded-full">⏸ Paused</span>
          </div>
        )}

        {/* Navigation zones */}
        <div className="absolute inset-0 flex z-10">
          <div
            className="flex-1 cursor-pointer"
            onPointerDown={() => { pointerDownTime.current = Date.now(); setIsPaused(true) }}
            onPointerUp={() => {
              setIsPaused(false)
              if (Date.now() - pointerDownTime.current < HOLD_THRESHOLD) goPrev()
            }}
            onPointerLeave={() => setIsPaused(false)}
          />
          <div
            className="flex-1 cursor-pointer"
            onPointerDown={() => { pointerDownTime.current = Date.now(); setIsPaused(true) }}
            onPointerUp={() => {
              setIsPaused(false)
              if (Date.now() - pointerDownTime.current < HOLD_THRESHOLD) goNext()
            }}
            onPointerLeave={() => setIsPaused(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(StoryViewer)
