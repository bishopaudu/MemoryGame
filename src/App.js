import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/helmet-1.png",matched:false},
  {"src": "/img/potion-1.png",matched:false},
  {"src": "/img/ring-1.png",matched:false},
  {"src": "/img/scroll-1.png",matched:false},
  {"src": "/img/shield-1.png",matched:false},
  {"src": "/img/sword-1.png",matched:false}
]
function App() {
  const[cards,setCards] = useState([])
  const[turns,setTurns] = useState(0)
  const[choiceOne,setChoiceOne] = useState(null)
  const[choiceTwo,setChoiceTwo] = useState(null)
  const[disabled,setDisable] = useState(false)
  //shuffle cards
  const shuffleCard = () => {
    const shuffleCard = [...cardImages,...cardImages]
    .sort( () => Math.random() - 0.5)
    .map((card) => ({...card,id:Math.random()}))
    setCards(shuffleCard)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
  }
 // console.log(cards,turns)
  //handle a choice

  const handleChoice = card => {
    //console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected card


  useEffect(() => {
  if(choiceOne && choiceTwo){
      setDisable(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card =>{
            if(card.src === choiceOne.src){
              return{...card,matched:true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else{
        console.log('cards mismatch')
       setTimeout(() =>  resetTurn(),1000)
      }
    }

  },[choiceOne,choiceTwo])
  //console.log(cards)

  useEffect(() =>shuffleCard()
  ,[])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns++)
    setDisable(false)
  }
  return (
    <div className="App">
     <h1>Magic Match</h1>
     <button onClick={shuffleCard}>New Game</button>
     <div className = 'card-grid'>
       {cards.map(card => (
         <SingleCard 
         key={card.id} 
         card ={card} 
         handleChoice = {handleChoice}
         flipped = {card === choiceOne || card === choiceTwo || card.matched}
         disabler ={disabled}
         />
       ))}
     </div>
     <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
