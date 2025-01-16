import React from 'react'
import Card from '../card/Card'
import '../board/Board.css'

const Board = ({cards , onCardClick}) => {
  return (
    <div className='board'>
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={onCardClick}/>
      ))}
      
    </div>
  )
}

export default Board
