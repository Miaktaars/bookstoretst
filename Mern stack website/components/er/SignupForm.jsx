'use client'
import { useState } from 'react'

export default function SignupForm({ switchToLogin, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
      } else {
        localStorage.setItem('user', JSON.stringify({ email: email, isAdmin: email === 'bookkeeper_admin@gmail.com' }))
        onClose()
        location.reload()
      }
    } catch (err) {
      setError('Signup failed')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      <h2 className="text-white text-2xl font-bold">Create Account</h2>
      <p className="text-sm text-gray-400">Register to access the bookstore</p>

      <input
        type="text"
        placeholder="Name"
        className="p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="p-2 rounded"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-orange-500 text-white p-2 rounded font-bold hover:bg-orange-600"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      <p className="text-sm text-gray-400">
        Already have an account?{' '}
        <span onClick={switchToLogin} className="text-orange-400 cursor-pointer">
          Login
        </span>
      </p>
    </form>
  )
}
