import { useState, useCallback, useRef } from 'react'
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
  const [posts, setPosts]         = useState(INITIAL_POSTS)
  const [toastVisible, setToast]  = useState(false)
  const toastTimer                = useRef(null)

  const showDeadLinkError = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast(true)
    toastTimer.current = setTimeout(() => setToast(false), 2500)
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
    setPosts([newPost, ...posts])
  }

  // BUG 4: every click unconditionally increments — no toggle, no cap
  const addLike = (id) => {
    setPosts(posts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ))
  }

  const addComment = (id) => {
    setPosts(posts.map((p) =>
      p.id === id ? { ...p, comments: p.comments } : p
    ))
  }

  return (
    <div className="min-h-screen bg-fb-bg">
      <ErrorToast visible={toastVisible} />
      <Navbar onDeadLink={showDeadLinkError} />
      <div className="max-w-[1250px] mx-auto pt-[60px] grid grid-cols-[280px_1fr_280px] gap-4 px-4">
        <LeftSidebar onDeadLink={showDeadLinkError} />
        <NewsFeed
          posts={posts}
          onAddPost={addPost}
          onAddLike={addLike}
          onAddComment={addComment}
          onDeadLink={showDeadLinkError}
        />
        <RightSidebar onDeadLink={showDeadLinkError} />
      </div>
    </div>
  )
}
