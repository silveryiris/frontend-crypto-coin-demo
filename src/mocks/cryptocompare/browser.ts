import { setupWorker } from "msw"
import { handlers } from "./handlers"

export const worker: any = setupWorker(...handlers)
