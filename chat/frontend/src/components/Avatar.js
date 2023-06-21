import React from 'react'
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
function Avatar({name}) {
  return (
    <InitialsAvatar name={name} />
  )
}

export default Avatar