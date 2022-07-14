// import Deck from "https://deno.land/x/cards@2.0.0/deck.ts"

import { getNewCards } from "./deck.js"
import { score } from "./poker.js"
import { simpleStrategy } from "./simple-strategy/index.js"

const game = () => {
  const deck = getNewCards()
  const hand = deck.splice(0,5)
  const strat = simpleStrategy( hand )
  const result = hand.map( ( val, idx ) => {
    const strat_idx = strat.strategy.map( (val) => {
      return parseInt( val.replace('HOLD_', "") )
    })
    const hold = strat_idx.indexOf( idx+1 ) === -1 ? false : true
    if ( !hold ) {
      return deck.splice(0,1)[0]
    }
    return val
  })
  return {
    hand, ...strat, result, ...score( result )
  }
}

let games = []  

const NUMBER_GAMES = 50

const spend = Array(NUMBER_GAMES).fill().map((x,i)=>i).reduce( ( prev, curr ) => {
  const play = game()
  // games.push(play)
  return prev + play.win
}, 0 ) - NUMBER_GAMES * 5

console.log( `Spent ${NUMBER_GAMES * 5}, result: ${spend}` )
