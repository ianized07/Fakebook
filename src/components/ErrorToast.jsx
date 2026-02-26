export default function ErrorToast({ visible }) {
  if (!visible) return null
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-xl shadow-2xl animate-fade-in">
      <span className="text-lg">⚠️</span>
      <div>
        <p className="font-bold text-sm">404 — Page not found</p>
        <p className="text-xs text-red-200">This feature is not available.</p>
      </div>
    </div>
  )
}
