import { bold, cyan, green, yellow } from "https://deno.land/std@0.140.0/fmt/colors.ts";

export const logger = async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(
    `${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)} - ${bold(String(rt))}`,
  );
}

export const timer = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
}

export const errorLogger = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof CustomPublicError) {
      ctx.response.body = { error: err.message };
    } else {
      throw err;
    }
  }
}

export const noCors = (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  return next();
}

export const logStartMessage = ({ hostname, port, serverType }) => {
  console.log(
    bold("Start listening on ") + yellow(`${hostname}:${port}`),
  );
  console.log(bold("  using HTTP server: " + yellow(serverType)));
}