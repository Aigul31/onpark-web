export default function MiniApp() {
  const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
  const user = tg?.initDataUnsafe?.user

  return (
    <main style={{ padding: 16, fontFamily: 'system-ui' }}>
      <h2>onPark Mini App</h2>
      <p>Hi {user?.first_name || 'traveler'} 👋</p>
    </main>
  )
}
