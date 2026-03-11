import { useState, useEffect, useRef, memo } from 'react'

const STORY_DURATION = 5000

function StoryViewer({ stories, startIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const currentIndexRef = useRef(currentIndex)

  useEffect(() => {
    currentIndexRef.current = currentIndex
    setProgress(0)
  }, [currentIndex])

  // Timer
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + (50 / STORY_DURATION) * 100
      })
    }, 50)
    return () => clearInterval(interval)
  }, [currentIndex, isPaused])

  // Auto-advance when progress completes
  useEffect(() => {
    if (progress < 100) return
    const idx = currentIndexRef.current
    if (idx < stories.length - 1) {
      setCurrentIndex(idx + 1)
    } else {
      onClose()
    }
  }, [progress, stories.length, onClose])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      const idx = currentIndexRef.current
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowRight') {
        if (idx < stories.length - 1) { setCurrentIndex(idx + 1) } else { onClose() }
      }
      if (e.key === 'ArrowLeft') {
        if (idx > 0) setCurrentIndex(idx - 1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [stories.length, onClose])

  const goNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onClose()
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const story = stories[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`relative w-[320px] h-[560px] rounded-2xl overflow-hidden shadow-2xl ${story.bg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bars */}
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-20 pointer-events-none">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-[3px] bg-white/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-7 left-3 right-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-fb-blue border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {story.user[0]}
            </div>
            <span className="text-white text-sm font-semibold" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
              {story.user}
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
          <span className="text-8xl">{story.emoji}</span>
        </div>

        {/* Paused indicator */}
        {isPaused && (
          <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none z-20">
            <span className="text-white text-xs bg-black/50 px-3 py-1 rounded-full">⏸ Paused</span>
          </div>
        )}

        {/* Navigation zones — left half = prev, right half = next */}
        <div className="absolute inset-0 flex z-10">
          <div
            className="flex-1 cursor-pointer"
            onClick={goPrev}
            onPointerDown={() => setIsPaused(true)}
            onPointerUp={() => setIsPaused(false)}
            onPointerLeave={() => setIsPaused(false)}
          />
          <div
            className="flex-1 cursor-pointer"
            onClick={goNext}
            onPointerDown={() => setIsPaused(true)}
            onPointerUp={() => setIsPaused(false)}
            onPointerLeave={() => setIsPaused(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(StoryViewer)
