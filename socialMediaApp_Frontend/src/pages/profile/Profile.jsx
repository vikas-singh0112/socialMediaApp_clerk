import React from 'react'
import { Link } from 'react-router-dom'

function Profile() {
  return (
    <Link to={"/profile/update-info"}>Profile</Link>

  )
}

export default Profile