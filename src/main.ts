import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)

// dev mock api server
if (import.meta.env.DEV === true) {
  import("@/mocks/cryptocompare/browser").then((module) => {
    const { worker } = module

    worker.start({ onUnhandledRequest: "bypass" })
  })
}

app.mount("#app")
