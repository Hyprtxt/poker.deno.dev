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
  const poker = score( result )
  const cost = 5
  return {
    cost, hand, ...strat, result, ...poker, net: poker.win - 5
  }
}

const NUMBER_GAMES = 50
const run = ( NUMBER_GAMES ) => {
  let games = []  
  const spend = Array(NUMBER_GAMES).fill().map((x,i)=>i).reduce( ( prev ) => {
    const play = game()
    games.push(play)
    return prev + play.win
  }, 0 ) - NUMBER_GAMES * 5
  return { games, spend, NUMBER_GAMES }
}
console.log( run( NUMBER_GAMES ) )
