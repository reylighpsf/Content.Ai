'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import '../login.css'

export default function Page() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Password tidak sama");
    return;
  }

  try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message || "Register gagal");
        return;
      }
  
      alert("Register berhasil 🎉");
      // optional redirect
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  };


  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-header">
          <h1>Register</h1>
          <p>Buat akun baru</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label>Nama Lengkap</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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

          {/* Confirm Password */}
          <div className="form-group">
            <label>Konfirmasi Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="register-button">
            Daftar
          </button>
        </form>

        <p className="register-footer">
          Sudah punya akun? <a href="/login">Login</a>
        </p>

      </div>
    </div>
  )
}
