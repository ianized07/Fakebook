const NAV_ITEMS = [
  { icon: '👤', label: 'Your Profile' },
  { icon: '👥', label: 'Friends' },
  { icon: '🌐', label: 'Groups' },
  { icon: '🛍️', label: 'Marketplace' },
  { icon: '📺', label: 'Watch' },
  { icon: '📅', label: 'Events' },
  { icon: '🎮', label: 'Gaming', link: 'https://www.cliffianmurillo.site/bug-game' },
  { icon: '📰', label: 'News Feed' },
]

const SHORTCUTS = [
  { icon: '🐍', label: 'Python Developers PH',   members: '12.4K members' },
  { icon: '⚛️', label: 'React Community',        members: '89K members'  },
  { icon: '🧪', label: 'QA & Testing Enthusiasts', members: '5.1K members' },
]

const ITEM_ACTIONS = { Events: 'timestamps' }

export default function LeftSidebar({ onDeadLink, onCorruptTimestamps }) {
  const handleItem = (label) => {
    if (ITEM_ACTIONS[label] === 'timestamps') onCorruptTimestamps()
    else onDeadLink()
  }
  return (
    <aside className="sticky top-[68px] h-[calc(100vh-68px)] overflow-y-auto py-2 scrollbar-hide">
      <div className="space-y-1">
        {NAV_ITEMS.map((item) =>
          item.link ? (
            <a
              key={item.label}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-fb-hover transition-colors text-left"
            >
              <span className="text-2xl w-9 h-9 flex items-center justify-center">{item.icon}</span>
              <span className="font-medium text-fb-text text-[15px]">{item.label}</span>
            </a>
          ) : (
            <button
              key={item.label}
              onClick={() => handleItem(item.label)}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-fb-hover transition-colors text-left"
            >
              <span className="text-2xl w-9 h-9 flex items-center justify-center">{item.icon}</span>
              <span className="font-medium text-fb-text text-[15px]">{item.label}</span>
            </button>
          )
        )}
      </div>

      <hr className="my-3 border-fb-border" />

      <div className="px-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-fb-secondary text-[17px]">Your shortcuts</h3>
          <button onClick={onDeadLink} className="text-fb-blue text-sm font-semibold hover:bg-fb-hover px-2 py-1 rounded">Edit</button>
        </div>
        <div className="space-y-1">
          {SHORTCUTS.map((s) => (
            <button
              key={s.label}
              onClick={onDeadLink}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-fb-hover transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-fb-hover flex items-center justify-center text-xl">{s.icon}</div>
              <div>
                <p className="font-medium text-fb-text text-sm">{s.label}</p>
                <p className="text-xs text-fb-secondary">{s.members}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <hr className="my-3 border-fb-border" />

      <p className="px-2 text-xs text-fb-secondary leading-relaxed">
        Privacy · Terms · Advertising · Cookies · More · Fakebook © 2025
      </p>
    </aside>
  )
}
