import { useState } from 'react'

const NAV_ICONS = [
  { label: 'Home',     icon: '🏠', active: true  },
  { label: 'Freinds',  icon: '👥', active: false },
  { label: 'Watch',    icon: '📺', active: false },
  { label: 'Marketplace', icon: '🛍️', active: false },
  { label: 'Groups',   icon: '🌐', active: false },
]

const NOTIFICATIONS = [
  { id: 1, text: 'Alex Reyes liked your post.',        time: '2 min ago',  read: false },
  { id: 2, text: 'Maria Santos commented on your photo.', time: '1 hr ago', read: false },
  { id: 3, text: 'Dev Community PH sent you a friend request.', time: '3 hrs ago', read: true },
]

export default function Navbar() {
  const [search, setSearch]       = useState('')
  const [showNotif, setShowNotif] = useState(false)
  const [showMenu, setShowMenu]   = useState(false)

  const handleSearch = () => {
    setSearch('')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-[60px] flex items-center px-4 justify-between">

      {/* Left — logo + search */}
      <div className="flex items-center gap-2 min-w-[280px]">
        <div className="w-10 h-10 rounded-full bg-fb-blue flex items-center justify-center">
          <span className="text-white font-black text-xl">f</span>
        </div>
        <div className="flex items-center bg-fb-bg rounded-full px-3 py-1.5 gap-2 w-52">
          <span className="text-fb-secondary text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Fakebook"
            className="bg-transparent outline-none text-sm w-full text-fb-text placeholder-fb-secondary"
          />
          {search && (
            <button onClick={handleSearch} className="text-fb-secondary text-xs hover:text-fb-text">✕</button>
          )}
        </div>
      </div>

      {/* Center — nav tabs */}
      <div className="flex items-center gap-1">
        {NAV_ICONS.map((n) => (
          <button
            key={n.label}
            className={`flex flex-col items-center justify-center w-24 h-[52px] rounded-lg text-xl transition-colors border-b-2 ${
              n.active
                ? 'border-fb-blue text-fb-blue'
                : 'border-transparent text-fb-secondary hover:bg-fb-hover'
            }`}
            title={n.label}
          >
            <span>{n.icon}</span>
            <span className="text-[10px] font-medium">{n.label}</span>
          </button>
        ))}
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2 min-w-[280px] justify-end">
        <button className="flex items-center gap-2 bg-fb-hover hover:bg-fb-border rounded-full px-3 py-1.5 text-sm font-semibold transition-colors">
          <span className="text-base">👤</span>
          <span>You</span>
        </button>

        <button className="fb-icon-btn relative" title="Messenger">
          <span className="text-xl">💬</span>
          <span className="notif-badge">5</span>
        </button>

        {/* Notification bell — BUG 6: badge shows 99 but only 3 notifications exist */}
        <div className="relative">
          <button
            className="fb-icon-btn relative"
            title="Notifications"
            onClick={() => setShowNotif(!showNotif)}
          >
            <span className="text-xl">🔔</span>
            <span className="notif-badge">99</span>
          </button>

          {showNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-fb-border z-50 overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b border-fb-border">
                <h3 className="font-bold text-lg">Notifications</h3>
                <button className="text-fb-blue text-sm font-semibold hover:bg-fb-hover px-2 py-1 rounded">
                  Mark all as read
                </button>
              </div>
              {NOTIFICATIONS.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 p-3 hover:bg-fb-hover cursor-pointer ${!n.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full bg-fb-blue/20 flex items-center justify-center text-lg flex-shrink-0">🔔</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-fb-text leading-snug">{n.text}</p>
                    <p className="text-xs text-fb-blue mt-0.5">{n.time}</p>
                  </div>
                  {!n.read && <div className="w-2.5 h-2.5 rounded-full bg-fb-blue flex-shrink-0 mt-1" />}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="fb-icon-btn"
            title="Menu"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="text-xl">⋯</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-2xl border border-fb-border z-50 p-2">
              <div className="flex items-center gap-3 p-2 hover:bg-fb-hover rounded-lg cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">👤</div>
                <div>
                  <p className="font-semibold text-sm">Your Profile</p>
                  <p className="text-xs text-fb-secondary">See your profile</p>
                </div>
              </div>
              <hr className="my-2 border-fb-border" />
              <div className="flex items-center gap-3 p-2 hover:bg-fb-hover rounded-lg cursor-pointer">
                <span className="text-lg">⚙️</span>
                <span className="text-sm font-medium">Settings & Privacy</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-fb-hover rounded-lg cursor-pointer">
                <span className="text-lg">❓</span>
                <span className="text-sm font-medium">Help & Support</span>
              </div>
              <hr className="my-2 border-fb-border" />
              <div className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg cursor-pointer text-red-600">
                <span className="text-lg">🚪</span>
                <span className="text-sm font-medium">Log Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
