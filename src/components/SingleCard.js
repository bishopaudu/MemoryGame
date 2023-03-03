import React from 'react'
import './singlecard.css';

export default function SingleCard({card,handleChoice,flipped,disabled}) {
  const handelClick =  () => {
    if(!disabled ){
      handleChoice(card)
    }
    

  }
  return (
    <div className='card'>
        <div className={flipped ? "flipped" : ""}>
        <img className='front' src={card.src} alt ='card front' />
        <img className='back' src="/img/cover.png" 
        onClick={handelClick} 
        alt ='card back' />
        </div>
         </div>
  )
}
