import { useState, memo } from 'react'
import StoryViewer from './StoryViewer'

const STORIES = [
  { id: 1, user: 'Create Story', bg: 'bg-white border-2 border-dashed border-fb-border', icon: '➕', isCreate: true },
  { id: 2, user: 'Alex R.',   bg: 'bg-gradient-to-b from-purple-500 to-pink-500',   emoji: '🚀' },
  { id: 3, user: 'Maria S.',  bg: 'bg-gradient-to-b from-blue-500 to-cyan-400',     emoji: '🔥' },
  { id: 4, user: 'Dev PH',    bg: 'bg-gradient-to-b from-green-500 to-emerald-400', emoji: '💻' },
  { id: 5, user: 'Juan D.',   bg: 'bg-gradient-to-b from-orange-500 to-yellow-400', emoji: '😤' },
]

const VIEWABLE = STORIES.filter((s) => !s.isCreate)

function Stories({ onDeadLink }) {
  const [viewerIndex, setViewerIndex] = useState(null)

  const handleStoryClick = (story) => {
    if (story.isCreate) { onDeadLink(); return }
    const idx = VIEWABLE.findIndex((s) => s.id === story.id)
    if (idx !== -1) setViewerIndex(idx)
  }

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {STORIES.map((s) => (
          <div
            key={s.id}
            onClick={() => handleStoryClick(s)}
            className={`flex-shrink-0 w-[110px] h-[185px] rounded-xl overflow-hidden cursor-pointer relative shadow-sm hover:opacity-90 transition-opacity ${s.bg}`}
          >
            {s.isCreate ? (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <div className="w-10 h-10 rounded-full bg-fb-blue flex items-center justify-center text-white text-xl">
                  {s.icon}
                </div>
                <span className="text-xs font-semibold text-fb-text text-center px-2 leading-tight">{s.user}</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {s.emoji}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white text-xs font-semibold">{s.user}</span>
                </div>
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-fb-blue border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  {s.user[0]}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {viewerIndex !== null && (
        <StoryViewer
          stories={VIEWABLE}
          startIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  )
}

export default memo(Stories)
