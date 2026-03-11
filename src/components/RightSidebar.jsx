import { useState, memo } from 'react'

const FRIEND_SUGGESTIONS = [
  { id: 1, name: 'Carlo Mendoza',  mutual: 4,  avatar: 'https://i.pravatar.cc/40?img=13' },
  { id: 2, name: 'Issa Villanueva', mutual: 7, avatar: 'https://i.pravatar.cc/40?img=25' },
  { id: 3, name: 'Ryan Pascual',   mutual: 2,  avatar: 'https://i.pravatar.cc/40?img=59' },
]

const ACTIVE_FRIENDS = [
  { id: 1, name: 'Ana Lim',        avatar: 'https://i.pravatar.cc/32?img=47' },
  { id: 2, name: 'Marco Reyes',    avatar: 'https://i.pravatar.cc/32?img=61' },
]

const SPONSORED = [
  {
    id: 1,
    brand: 'DevTools Pro',
    tagline: 'Automate your QA pipeline today.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=120&q=60',
    link: '#',
  },
  {
    id: 2,
    brand: 'CloudHost PH',
    tagline: 'Deploy faster. Scale smarter.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&q=60',
    link: '#',
  },
]

function RightSidebar({ onDeadLink }) {
  const [added, setAdded] = useState([])

  const toggleAdd = (id) => {
    setAdded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <aside className="sticky top-[68px] h-[calc(100vh-68px)] overflow-y-auto py-2 scrollbar-hide">

      {/* Sponsored */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="font-bold text-fb-secondary text-[17px]">Sponsored</h3>
        </div>
        <div className="space-y-3">
          {SPONSORED.map((s) => (
            <a key={s.id} href={s.link} onClick={(e) => { e.preventDefault(); onDeadLink() }} className="flex gap-3 hover:bg-fb-hover rounded-lg p-1 transition-colors">
              <img src={s.image} alt={s.brand} className="w-[120px] h-[80px] rounded-lg object-cover flex-shrink-0" loading="lazy" width="120" height="80" />
              <div>
                <p className="font-semibold text-sm text-fb-text">{s.brand}</p>
                <p className="text-xs text-fb-secondary">{s.tagline}</p>
                <p className="text-xs text-fb-secondary mt-1">fakebook.com</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <hr className="my-3 border-fb-border" />

      {/* Friend suggestions */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="font-bold text-fb-secondary text-[17px]">People you may know</h3>
          <button onClick={onDeadLink} className="text-fb-blue text-sm font-semibold hover:bg-fb-hover px-2 py-1 rounded">See all</button>
        </div>
        <div className="space-y-2">
          {FRIEND_SUGGESTIONS.map((f) => (
            <div key={f.id} className="flex items-center gap-2 p-1 hover:bg-fb-hover rounded-lg transition-colors">
              <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" width="40" height="40" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-fb-text truncate">{f.name}</p>
                <p className="text-xs text-fb-secondary">{f.mutual} mutual friends</p>
              </div>
              <button
                onClick={() => toggleAdd(f.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  added.includes(f.id)
                    ? 'bg-fb-hover text-fb-text'
                    : 'bg-fb-blue/10 text-fb-blue hover:bg-fb-blue/20'
                }`}
              >
                {added.includes(f.id) ? 'Added ✓' : 'Add Friend'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-3 border-fb-border" />

      {/* Active friends — BUG: says "3 friends active now" but only 2 shown */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="font-bold text-fb-secondary text-[17px]">Contacts</h3>
          <div className="flex gap-1">
            <button onClick={onDeadLink} className="fb-icon-btn w-7 h-7 text-sm">🔍</button>
            <button onClick={onDeadLink} className="fb-icon-btn w-7 h-7 text-sm">⋯</button>
          </div>
        </div>
        <p className="text-xs text-fb-secondary px-1 mb-2">3 friends active now</p>
        <div className="space-y-1">
          {ACTIVE_FRIENDS.map((f) => (
            <div key={f.id} onClick={onDeadLink} className="flex items-center gap-3 px-1 py-1.5 hover:bg-fb-hover rounded-lg cursor-pointer transition-colors">
              <div className="relative">
                <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-full object-cover" loading="lazy" width="36" height="36" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <span className="text-sm font-medium text-fb-text">{f.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default memo(RightSidebar)
