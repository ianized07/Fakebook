import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import NewsFeed from './components/NewsFeed'
import ErrorToast from './components/ErrorToast'

const INITIAL_POSTS = [
  {
    id: 1,
    user: 'Alex Reyes',
    avatar: 'https://i.pravatar.cc/40?img=11',
    timestamp: 'February 31, 2025 at 10:30 AM',
    content: 'Just deployed to production on a Friday. What could go wrong? 🚀 #devlife #YOLO',
    image: null,
    likes: 42,
    comments: 24,
    shares: 5,
  },
  {
    id: 2,
    user: 'Maria Santos',
    avatar: 'https://fakebook-broken-cdn.xyz/avatars/maria.jpg',
    timestamp: '2 hours ago',
    content: 'The client said "just a small change" and now the entire app is on fire. 🔥 Sending prayers for the on-call engineer.',
    image: null,
    likes: 0,
    comments: 8,
    shares: 2,
  },
  {
    id: 3,
    user: 'Dev Community PH',
    avatar: 'https://i.pravatar.cc/40?img=33',
    timestamp: '5 hours ago',
    content: 'Reminder: It\'s not a bug, it\'s an undocumented feature. 😅 Share this with your QA team.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    likes: 156,
    comments: 43,
    shares: 22,
  },
  {
    id: 4,
    user: 'Juan dela Cruz',
    avatar: 'https://i.pravatar.cc/40?img=52',
    timestamp: 'Yesterday at 3:14 PM',
    content: 'PSA: Please stop pushing directly to main. We have a staging environment for a reason. 😤',
    image: null,
    likes: 201,
    comments: 57,
    shares: 41,
  },
]

export default function App() {
  const [posts, setPosts]             = useState(INITIAL_POSTS)
  const [toasts, setToasts]           = useState([])
  const [watchMode, setWatchMode]     = useState(false)
  const [marketMode, setMarketMode]   = useState(false)
  const [feelingMode, setFeelingMode] = useState(false)

  const showDeadLinkError = useCallback(() => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }, [])

  // BUG 1: content is wrapped with mismatched HTML tags before storing
  const addPost = (content) => {
    const wrapped = `<h1>${content}</h2>`
    const newPost = {
      id: Date.now(),
      user: 'You',
      avatar: 'https://i.pravatar.cc/40?img=68',
      timestamp: 'Just now',
      content: wrapped,
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
    }
    setPosts((prev) => [newPost, ...prev])
  }

  // BUG 4: every click unconditionally increments — no toggle, no cap
  const addLike = (id) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  // BUG: Share subtracts likes with no floor — can go negative indefinitely
  const subtractLike = (id) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, likes: p.likes - 1 } : p))
  }

  const addComment = (id) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, comments: p.comments } : p))
  }

  // BUG Freinds: duplicates all posts in the feed
  const duplicatePosts = useCallback(() => {
    setPosts((prev) => [...prev, ...prev.map((p) => ({ ...p, id: p.id + Date.now() }))])
  }, [])

  // BUG ✕: close duplicates the post instead of removing it
  const duplicatePost = useCallback((id) => {
    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === id)
      if (idx === -1) return prev
      const copy = { ...prev[idx], id: Date.now() + Math.random() }
      return [...prev.slice(0, idx + 1), copy, ...prev.slice(idx + 1)]
    })
  }, [])

  // BUG Events: stamps all posts with the invalid date
  const corruptTimestamps = useCallback(() => {
    setPosts((prev) => prev.map((p) => ({ ...p, timestamp: 'February 31, 2025 at 12:00 AM' })))
  }, [])

  return (
    <div className="min-h-screen bg-fb-bg">
      <ErrorToast toasts={toasts} />
      <Navbar
        onDeadLink={showDeadLinkError}
        onDuplicatePosts={duplicatePosts}
        onWatchMode={() => setWatchMode(true)}
        onMarketMode={() => setMarketMode(true)}
      />
      <div className="max-w-[1250px] mx-auto pt-[60px] grid grid-cols-[280px_1fr_280px] gap-4 px-4">
        <LeftSidebar onDeadLink={showDeadLinkError} onCorruptTimestamps={corruptTimestamps} />
        <NewsFeed
          posts={posts}
          onAddPost={addPost}
          onAddLike={addLike}
          onSubtractLike={subtractLike}
          onAddComment={addComment}
          onDuplicatePost={duplicatePost}
          onDeadLink={showDeadLinkError}
          onFeelingMode={() => setFeelingMode(true)}
          watchMode={watchMode}
          marketMode={marketMode}
          feelingMode={feelingMode}
        />
        <RightSidebar onDeadLink={showDeadLinkError} />
      </div>
    </div>
  )
}
