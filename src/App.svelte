<script lang="ts">
  import Generator from "./lib/Generator.svelte";
</script>

<main class="min-h-screen flex flex-col">
  <nav class="bg-white shadow dark:bg-gray-800">
    <div class="container px-6 py-4 mx-auto flex justify-center">
      <a
        class="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
        href="/">GitHub Contributors Readme Table Generator</a
      >
    </div>
  </nav>

  <Generator />

  <footer
    class="flex flex-col items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 sm:flex-row"
  >
    <span>
      Built by
      <a
        href="https://apvarun.com"
        target="_blank"
        class="mx-1 font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >apvarun</a
      >|
      <a
        href="https://twitter.com/apvarun"
        target="_blank"
        class="ml-1 font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 inline"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"
          />
        </svg>
      </a>
    </span>

    <p class="py-2 text-gray-500 dark:text-white sm:py-0">
      Contributors Readme Table Generator
    </p>
  </footer>
</main>
