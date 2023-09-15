"use client"
import ViewImage from '@/components/ViewImage'
import { useGlobal } from '@/app/context/GlobalContext'

function RendPage() {
  const { isLogged } = useGlobal()
  isLogged()

  return (
    <div>
      <h1 className="text-primary text-2xl font-bold">Rend. Ranking</h1>
      <div className="mt-4">
        <ViewImage imagen="/RendElitex.jpg" />
        <ViewImage imagen="/RendCirc.jpg" />
      </div>
    </div>
  )
}

export default RendPage