import React from 'react'
import "./Status.scss"
export default function Status( {status}) {
  return (
    <p className={`status-text ${status === 'In Stock' ? 'status-text--in' : 'status-text--out'}`}>{status}</p>
  )
}
