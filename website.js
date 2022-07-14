// import Deck from "https://deno.land/x/cards@2.0.0/deck.ts"

import { getNewCards } from "./deck.js"
import { score } from "./poker.js"
import { simpleStrategy } from "./simple-strategy/index.js"


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

console.log( hand, strat, result, score( result ) )

// import * as brain from "https://esm.sh/brain.js@2.0.0-beta.15"

// const DECK_ORDER = setupCards([])

// // const hand = ( cards ) => {
// //   return {
// //     card_1: cards[0],
// //     card_2: cards[1],
// //     card_3: cards[2],
// //     card_4: cards[3],
// //     card_5: cards[4],
// //   }
// // }

// const holds = ( input ) => [1,2,3,4,5].map( ( idx ) => {
//   return simpleStrategy( input ).strategy.indexOf(`HOLD_${idx}`) === -1 ? 0 : 1
// })

// // const holds = ( input ) => {
// //   const strat_map = holdsBool( input );
// //   return {
// //     hold_1: strat_map[0],
// //     hold_2: strat_map[1],
// //     hold_3: strat_map[2],
// //     hold_4: strat_map[3],
// //     hold_5: strat_map[4],
// //   }
// // }

// const cardNumbers = ( cards ) => cards.map( ( card ) => {
//   return DECK_ORDER.indexOf(card)
//   // const [value, suit] = card.split("")
//   // return { value, suit }
// })

// const getGame = () => {
//   const cards = getNewCards().splice(0,5)
//   const output = holds( cards )
//   const input = cardNumbers( cards )
//   return { input, output }
// }
// console.log( getGame(), getGame() )

// var net = new brain.NeuralNetwork({
//   binaryThresh: 0.5, // ¯\_(ツ)_/¯
//   hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
//   activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
// });

// const train = [getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame(),getGame()]

// console.log(train);
// net.train(train, {
//   errorThresh: 0.005,  // error threshold to reach
//   iterations: 10000,   // maximum training iterations
//   log: true,           // console.log() progress periodically
//   logPeriod: 10,       // number of iterations between logging
//   learningRate: 0.3    // learning rate
// });

// const new_hand = cardNumbers( getNewCards().splice(0,5) )

// var output = net.run(new_hand); // { white: 0.99, black: 0.002 }

// console.log(new_hand, output)