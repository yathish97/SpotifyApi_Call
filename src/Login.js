import React from 'react'
import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';

export default function Login() {
  const CLIENT_ID = "2944d8c8ce8b40dc8085101f035b73f6"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE= "user-read-playback-state user-modify-playback-state"

  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])
  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    console.log("login Page")
  }

  return (
    <div>
      {token ?
      <Dashboard TOKEN={token} LOGOUT={logout}/>:<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
            to Spotify</a>
      }
      
    </div>
  )
}
