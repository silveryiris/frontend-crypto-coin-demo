import { rest } from "msw"

import pricemultiData from "./data/pricemulti"
import totaltoptiervolfullData from "./data/totaltoptiervolfull"

const url = import.meta.env.VITE_CRYPTOCOMPARE_API_URL

export const handlers: any = [
  // Multiple Symbols Price
  rest.get(`${url}/pricemulti`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(pricemultiData))
  }),

  // Top list by 24H Top Tier Volume Full Data
  rest.get(`${url}/top/totaltoptiervolfull`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(totaltoptiervolfullData))
  }),
]
