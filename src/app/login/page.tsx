'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import './login.css'

export default function Page() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message || "Login gagal");
        return;
      }
  
      alert("Login berhasil 👋");
      console.log("User:", data.user);
  
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };


  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1>Login</h1>
          <p>Masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          Belum punya akun? <a href="/login/register">Daftar</a>
        </p>

      </div>
    </div>
  )
}
