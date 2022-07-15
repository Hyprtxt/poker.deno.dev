// import Deck from "https://deno.land/x/cards@2.0.0/deck.ts"
import { getNewCards } from "./deck.js"
import { score } from "./poker.js"
import { simpleStrategy } from "./simple-strategy/index.js"
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { logger, timer, errorLogger, noCors, logStartMessage } from "./middleware.js"

const app = new Application();

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

const playPoker = (ctx) => {
  const ID = parseInt(ctx.params.id)
  // console.log( ID )
  const NUMBER_GAMES = ID ? ID : 5
  const run = ( NUMBER_GAMES ) => {
    let games = []  
    const spend = Array(NUMBER_GAMES).fill().map((x,i)=>i).reduce( ( prev ) => {
      const play = game()
      games.push(play)
      return prev + play.win
    }, 0 ) - NUMBER_GAMES * 5
    return { NUMBER_GAMES, spend, games }
  }
  // console.log( run( NUMBER_GAMES ) )
  ctx.response.body = run( NUMBER_GAMES );
}

const router = new Router();

router.get("/", playPoker);
router.get("/:id", playPoker);

app.use(logger);
app.use(timer);
app.use(noCors);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(errorLogger);

app.addEventListener("listen", logStartMessage);

await app.listen({ port: 8000 });