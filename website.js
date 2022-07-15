// import Deck from "https://deno.land/x/cards@2.0.0/deck.ts"
import { getNewCards } from "./deck.js"
import { score } from "./poker.js"
import { simpleStrategy } from "./simple-strategy/index.js"
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { bold, cyan, green, yellow } from "https://deno.land/std@0.140.0/fmt/colors.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(
    `${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)} - ${bold(String(rt))}`,
  );
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

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

const router = new Router();

// router.get("/type", AllTypesMiddleware);
// router.get("/type/:type", TypeMiddleware);

const PlayPoker = (ctx) => {
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

router.get("/", PlayPoker);
router.get("/:id", PlayPoker);

// No CORS
app.use((ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  return next();
})

// Error Handling
app.use( async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof CustomPublicError) {
      ctx.response.body = { error: err.message };
    } else {
      throw err;
    }
  }
})

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(
    bold("Start listening on ") + yellow(`${hostname}:${port}`),
  );
  console.log(bold("  using HTTP server: " + yellow(serverType)));
});

await app.listen({ port: 8000 });