import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

export default function PlacePage() {
  const {id} = useParams()
  const [place, setPlace] = useState(null)
  useEffect(()=>{
    if(!id){
      return
    }
axios.get(`/places/${id}`).then(response =>{
  setPlace(response.data)
})
  },[id])

  if(!place) return ''
  return (
    <div className="mt-8 bg-gray-100 -mx-8">
      <h1 className="text-2xl">{place.title}</h1>
    </div>
  )
}