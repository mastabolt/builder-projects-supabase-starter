import { useEffect, useState } from 'react'
import { getSupabase } from '../lib/supabaseClient'

export default function Properties() {
  const supabase = getSupabase()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(!!supabase)
  const [form, setForm] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    bedrooms: 0,
    bathrooms: 0,
    purchase_price: 0
  })
  const [error, setError] = useState('')

  async function load() {
    if (!supabase) return
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    if (error) setError(error.message)
    setRows(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function createProperty(e) {
    e.preventDefault()
    if (!supabase) return setError('Supabase env vars not set.')
    setError('')
    const payload = {
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0,
      purchase_price: Number(form.purchase_price) || 0
    }
    const { error } = await supabase.from('properties').insert(payload)
    if (error) { setError(error.message); return }
    setForm({ address:'', city:'', state:'', zip:'', bedrooms:0, bathrooms:0, purchase_price:0 })
    await load()
  }

  if (!supabase) {
    return (
      <div className="p-4 rounded-xl border border-gray-200 bg-white">
        <div className="font-medium">Supabase isn’t configured yet.</div>
        <p className="text-sm text-gray-600 mt-1">
          Add <code className="bg-gray-100 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> and{' '}
          <code className="bg-gray-100 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> in Netlify → Site settings → Environment variables,
          then redeploy.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Properties</h2>
        <button onClick={load} className="text-sm underline">Refresh</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <form onSubmit={createProperty} className="grid grid-cols-2 gap-3">
          <input className="border rounded-lg p-2 col-span-2" placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} required />
          <input className="border rounded-lg p-2" placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} required />
          <input className="border rounded-lg p-2" placeholder="State" value={form.state} onChange={e=>setForm({...form, state:e.target.value})} required />
          <input className="border rounded-lg p-2" placeholder="ZIP" value={form.zip} onChange={e=>setForm({...form, zip:e.target.value})} required />
          <input className="border rounded-lg p-2" type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={e=>setForm({...form, bedrooms:e.target.value})} />
          <input className="border rounded-lg p-2" type="number" placeholder="Bathrooms" value={form.bathrooms} onChange={e=>setForm({...form, bathrooms:e.target.value})} />
          <input className="border rounded-lg p-2 col-span-2" type="number" placeholder="Purchase Price" value={form.purchase_price} onChange={e=>setForm({...form, purchase_price:e.target.value})} />
          <button className="bg-black text-white rounded-lg py-2 col-span-2">Save</button>
        </form>

        <div className="overflow-auto">
          {loading ? <p className="text-sm text-gray-500">Loading…</p> : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 pr-3">Address</th>
                  <th className="py-2 pr-3">City</th>
                  <th className="py-2 pr-3">State</th>
                  <th className="py-2 pr-3">ZIP</th>
                  <th className="py-2 pr-3">Beds</th>
                  <th className="py-2 pr-3">Baths</th>
                  <th className="py-2 pr-3">Price</th>
                  <th className="py-2 pr-3 text-gray-400">Created</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="py-2 pr-3">{r.address}</td>
                    <td className="py-2 pr-3">{r.city}</td>
                    <td className="py-2 pr-3">{r.state}</td>
                    <td className="py-2 pr-3">{r.zip}</td>
                    <td className="py-2 pr-3">{r.bedrooms}</td>
                    <td className="py-2 pr-3">{r.bathrooms}</td>
                    <td className="py-2 pr-3">${r.purchase_price?.toLocaleString?.() ?? r.purchase_price}</td>
                    <td className="py-2 pr-3">{new Date(r.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {rows.length === 0 && !loading && (
                  <tr><td className="py-3 text-gray-500" colSpan="8">No properties yet</td></tr>
                )}
              </tbody>
            </table>
          )}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  )
}
