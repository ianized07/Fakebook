export default function ErrorToast({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl animate-fade-in pointer-events-auto ${
            t.message ? 'bg-green-600 text-white' : 
            t.type === '404' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
          }`}
        >
          <span className="text-lg">
            {t.message ? '✓' : t.type === '404' ? '⚠️' : '🚧'}
          </span>
          <div>
            {t.message ? (
              <p className="font-bold text-sm">{t.message}</p>
            ) : t.type === '404' ? (
              <>
                <p className="font-bold text-sm">404 — Page not found</p>
                <p className="text-xs text-red-200">This feature is not available.</p>
              </>
            ) : (
              <>
                <p className="font-bold text-sm">Feature Coming Soon</p>
                <p className="text-xs text-blue-100">This feature is currently under development.</p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
