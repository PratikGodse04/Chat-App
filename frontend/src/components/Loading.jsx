import React from 'react'
import gif from "../../public/images/giphy.gif"

export default function Loading() {
  return (
    <div >
      <img src={gif} alt="Loading Image "style={{height:"150px",width:"300px"}} />
    </div>
  )
}
