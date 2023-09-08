import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)

// dev mock api server
const prepare = async () => {
  if (import.meta.env.DEV === true) {
    const module = await import("@/mocks/cryptocompare/browser")

    const { worker } = module

    return worker.start({ onUnhandledRequest: "bypass" })
  }

  return Promise.resolve()
}

prepare().then(() => app.mount("#app"))
