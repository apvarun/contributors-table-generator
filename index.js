import App from "./src/App.svelte";

const app = new App({
  target: document.body
});

document.body.classList.add("bg-gray-400");

export default app;
