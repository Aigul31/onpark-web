import crypto from 'crypto'

const BOT_TOKEN = process.env.TG_BOT_TOKEN

export default function handler(req, res) {
  try {
    const initData = req.method === 'POST'
      ? (req.body?.initData || '')
      : (req.query?.initData || '')
    if (!initData || !BOT_TOKEN) return res.status(400).json({ ok:false, reason:'missing' })

    const params = new URLSearchParams(initData)
    const hash = params.get('hash')
    params.delete('hash')

    const dataCheckString = Array.from(params.entries())
      .sort(([a],[b]) => a.localeCompare(b))
      .map(([k,v]) => `${k}=${v}`)
      .join('\n')

    const secret = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest()
    const calc = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex')

    return res.json({ ok: calc === hash })
  } catch (e) {
    return res.status(500).json({ ok:false })
  }
}
