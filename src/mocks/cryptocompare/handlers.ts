import { rest } from "msw"

import pricemultiData from "./data/pricemulti"
import totaltoptiervolfullData from "./data/totaltoptiervolfull"

const url = import.meta.env.VITE_CRYPTOCOMPARE_API_URL

export const handlers: any = [
  // Multiple Symbols Price
  rest.get(`${url}/pricemulti`, (req, res, ctx) => {
    const generateData = (t: string, f: string) => {
      const tList = t.split(",")
      const fList = f.split(",")

      const result = fList.reduce((acc, cur) => {
        let tData = {}

        for (const x of tList) {
          const rand = Math.floor(Math.random() * 10000000) / 100
          tData = { ...tData, [x]: rand }
        }

        return { ...acc, [cur]: tData }
      }, {})

      return result
    }

    const tsyms = req.url.searchParams.get("tsyms")
    const fsyms = req.url.searchParams.get("fsyms")

    const data = tsyms && fsyms ? generateData(tsyms, fsyms) : pricemultiData

    return res(ctx.status(200), ctx.delay(200), ctx.json(data))
  }),

  // Top list by 24H Top Tier Volume Full Data
  rest.get(`${url}/top/totaltoptiervolfull`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(200), ctx.json(totaltoptiervolfullData))
  }),
]
