// import Deck from "https://deno.land/x/cards@2.0.0/deck.ts"

import { getNewCards } from "./deck.js"
import { Score } from "./poker.js"
import { simpleStrategy } from "./simple-strategy/index.js"

const hand = getNewCards().splice(0,5)
const holds = [1,2,3,4,5].map( ( idx ) => {
  return simpleStrategy( hand ).strategy.indexOf(`HOLD_${idx}`) === -1 ? false : true
})

console.log( hand, holds )