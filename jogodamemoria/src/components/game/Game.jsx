import React, { useState } from 'react'
import Board from '../board/Board'
import '../game/Game.css'

const shuffleArray = (array) => {   /* funçao para embaralhar  */
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
} 

const generateCards = () => {      /* funçao para gerar cards */

    const values = ['A' ,'B' ,'C' ,'D' ,'E' ,'F' ,'G' ,'H' ] /* valores dos cards */

    const cards = values.map((value) => ({  /* objeto para detectar se o card esta virado ou nao */
        value,
        isFlipped: false
    }));
     /* Duplicando os card pois jogo da memoria precisa de cartas iguais
        O método .concat() combina dois arrays em um único array.
        Ele pega o array cards original e adiciona ao final dele a cópia [...cards]
        O método .map() itera por cada carta no array duplicado adicionando o index para cada elemento.
    */
    const duplicatedCards = cards.concat([...cards]).map((card , index) => ({... card , id: index}))
    return shuffleArray(duplicatedCards)
}
generateCards()

const Game = () => {
  const [cards , setCards] = useState(generateCards())
  const [flippedCards , setFlippedCards] = useState([])
  const [chances , setChances] = useState(15)

  const result = cards.filter((card) => card.isFlipped).length /* Filtra o array cards para incluir apenas as cartas cujo atributo isFlipped seja true */

  const handleCardClick = (clickedCard) => {
    if (chances === 0) return;

    if(flippedCards.length === 2 ) return;

    const newCard = cards.map((card) => {
      return card.id === clickedCard.id ? {...card , isFlipped: true} : card
    });

    setCards(newCard)
    setFlippedCards([...flippedCards , clickedCard])

    if(flippedCards.length === 1) {
      setTimeout(() => {
        const [firstCard] = flippedCards

        if(firstCard.value !== clickedCard.value) {
          const resetCards = cards.map((card) => {
           return card.id === firstCard.id || card.id === clickedCard.id ? {...card , isFlipped: false} : card
          });

          setCards(resetCards)
          setChances((prev)=> prev - 1)
        }
        setFlippedCards([])
      } , 600)
    }
  };


  const resetGame = () => {
    setChances(15)
    setFlippedCards([])
    setCards(generateCards())
  }


  return (
    <div className='game'>
      <Board cards={cards} onCardClick={handleCardClick}/> {/* passando os cards para o component borad */}
      {chances === 0 ? (
        <p>Suas tentativas acabaram</p>
      ) : result === cards.length ? (
        <h2>Parabens Voce Ganhou</h2>
      ): (
        <p>Voce Possui {chances} tentativas </p>
      )}
      <button className="btn" onClick={resetGame}>
        Reiniciar o Game!
      </button>
    </div>
  )
}

export default Game
