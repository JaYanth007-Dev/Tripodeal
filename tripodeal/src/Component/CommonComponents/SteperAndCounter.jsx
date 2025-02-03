import React from 'react'
import Steper from './Steper'
import CountdownTimer from '../Counter/CountdownTimer'

const SteperAndCounter = () => {
  return (
    <div>
    <CountdownTimer timeInMinutes={45} />
      <Steper/>
    </div>
  )
}

export default SteperAndCounter
