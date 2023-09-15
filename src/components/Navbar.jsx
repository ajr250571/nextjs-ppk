"use client"
import { useGlobal } from '@/app/context/GlobalContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

function Navbar() {
  const { user, isLogged, getProfile, logout } = useGlobal()

  const router = useRouter()

  useEffect(() => {
    console.log("Navbar", `email ${user.email}`)
    getProfile()
    if (!user.email) {
      router.push('/login')
      router.refresh()
    } else {
      router.push('/')
      router.refresh()
    }
  }, [router])

  const handleLogout = () => {
    logout()
    console.log("logout", `email ${user.email}`)
    router.push("/login")
    router.refresh()
  }
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

              <li>
                <details>
                  <summary>
                    Produccion
                  </summary>
                  <ul className="p-2 bg-base-100">
                    <li><Link href="">Hilatura</Link></li>
                    <li><Link href="">Tejeduria</Link></li>
                    <li><Link href="">Confeccion</Link></li>
                    <li><Link href="">Cordeleria</Link></li>
                  </ul>
                </details>
              </li>

              <li>
                <details>
                  <summary>
                    Rend.
                  </summary>
                  <ul className="p-2 bg-base-100">
                    <li><Link href="/rend/ranking">Ranking</Link></li>
                    <li><Link href="/rend/diario">Diario</Link></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a href='/' className="btn btn-ghost normal-case text-xl font-bold">Panpack S.A.</a>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">

                <Image
                  src="/images/login.jpg"
                  alt='Perfil'
                  width='60'
                  height={'60'} />

              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <a href="#">{user.email}</a>
              <button className='btn btn-neutral btn-sm btn-outline' onClick={handleLogout}>
                Desconectarse
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div >

  )
}

export default Navbar