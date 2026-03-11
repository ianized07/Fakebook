import { useState, memo } from 'react'
import StoryViewer from './StoryViewer'

const USERS = [
  {
    id: 1,
    user: 'Alex R.',
    bg: 'bg-gradient-to-b from-purple-500 to-pink-500',
    stories: [
      { emoji: '🚀', bg: 'bg-gradient-to-b from-purple-500 to-pink-500' },
      { emoji: '🎉', bg: 'bg-gradient-to-b from-pink-500 to-purple-600' },
    ],
  },
  {
    id: 2,
    user: 'Maria S.',
    bg: 'bg-gradient-to-b from-blue-500 to-cyan-400',
    stories: [
      { emoji: '🔥', bg: 'bg-gradient-to-b from-blue-500 to-cyan-400' },
    ],
  },
  {
    id: 3,
    user: 'Dev PH',
    bg: 'bg-gradient-to-b from-green-500 to-emerald-400',
    stories: [
      { emoji: '💻', bg: 'bg-gradient-to-b from-green-500 to-emerald-400' },
      { emoji: '☕', bg: 'bg-gradient-to-b from-emerald-400 to-green-600' },
      { emoji: '🐛', bg: 'bg-gradient-to-b from-teal-500 to-green-500' },
    ],
  },
  {
    id: 4,
    user: 'Juan D.',
    bg: 'bg-gradient-to-b from-orange-500 to-yellow-400',
    stories: [
      { emoji: '😤', bg: 'bg-gradient-to-b from-orange-500 to-yellow-400' },
    ],
  },
]

function Stories({ onDeadLink }) {
  const [activeUserIndex, setActiveUserIndex] = useState(null)

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {/* Create Story card */}
        <div
          onClick={onDeadLink}
          className="flex-shrink-0 w-[110px] h-[185px] rounded-xl overflow-hidden cursor-pointer relative shadow-sm hover:opacity-90 transition-opacity bg-white border-2 border-dashed border-fb-border"
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="w-10 h-10 rounded-full bg-fb-blue flex items-center justify-center text-white text-xl">
              ➕
            </div>
            <span className="text-xs font-semibold text-fb-text text-center px-2 leading-tight">Create Story</span>
          </div>
        </div>

        {/* User story cards */}
        {USERS.map((u, i) => (
          <div
            key={u.id}
            onClick={() => setActiveUserIndex(i)}
            className={`flex-shrink-0 w-[110px] h-[185px] rounded-xl overflow-hidden cursor-pointer relative shadow-sm hover:opacity-90 transition-opacity ${u.bg}`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              {u.stories[0].emoji}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-white text-xs font-semibold">{u.user}</span>
            </div>
            <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-fb-blue border-2 border-white flex items-center justify-center text-white text-xs font-bold">
              {u.user[0]}
            </div>
          </div>
        ))}
      </div>

      {activeUserIndex !== null && (
        <StoryViewer
          users={USERS}
          startUserIndex={activeUserIndex}
          onClose={() => setActiveUserIndex(null)}
        />
      )}
    </>
  )
}

export default memo(Stories)
