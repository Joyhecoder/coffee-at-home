import React from 'react'
import { useLocation } from "react-router-dom";

const Details = () => {
    const location = useLocation()
    const id = location.state
    console.log(id)
  return (
    <div>

        details 

        
    </div>
  )
}

export default Details