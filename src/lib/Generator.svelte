<script lang="ts">
  let repo = "";
  let error = "";
  let output = "";
  let columnCount = 6;

  async function generate(event) {
    event.preventDefault();
    error = "";

    if (!repo) {
      error = "Repository name cannot be empty";
      return;
    }
    if (!columnCount) {
      error = "Column count cannot be empty";
      return;
    }
    const parsedRepo = repo.match(
      /https:\/\/github\.com\/(?<username>[a-z-]+)\/(?<reponame>[a-z-]+)/
    );
    const username = parsedRepo.groups.username;
    const reponame = parsedRepo.groups.reponame;

    if (!username || !reponame) {
      error = "Invalid repo url";
      return;
    }

    const rawResponse = await fetch(
      `https://api.github.com/repos/${username}/${reponame}/contributors?page=1&per_page=100`
    );
    const response = await rawResponse.json();

    const details = response.map((value) => ({
      url: value.html_url,
      avatar: value.avatar_url,
      name: value.login,
    }));
    prepareTable(details, columnCount);
  }

  function prepareTable(details, columnCount) {
    let data = "";
    data = "<table><tr>";
    details.map((item, index) => {
      if (index > 0 && index % columnCount === 0) {
        data += "</tr><tr>";
      }
      data += `<td align="center"><a href="${item.url}"><img alt="${item.name}" src="${item.avatar}" width="117" /><br />${item.name}</a></td>`;
    });
    data += "</tr></table>";

    output = data;
  }

  function copy() {
    const copyText = document.querySelector(
      "#generatedText"
    ) as HTMLTextAreaElement;
    copyText.select();
    document.execCommand("copy");
  }
</script>

<div
  class="container mx-auto flex-1 grid grid-cols-2 gap-8 max-w-4xl p-4 items-center"
>
  <form>
    <div class="grid grid-cols-1 gap-6 mt-4">
      <div>
        <label class="text-gray-700 dark:text-gray-200" for="username"
          >GitHub Repo URL</label
        >
        <input
          id="username"
          type="text"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          bind:value={repo}
        />
      </div>

      <div>
        <label class="text-gray-700 dark:text-gray-200" for="columns"
          >Table Column Count</label
        >
        <input
          id="columns"
          type="number"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          bind:value={columnCount}
        />
      </div>
    </div>

    <div class="flex justify-end mt-6">
      <button
        on:click={generate}
        class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >Generate Table</button
      >
    </div>

    {#if error}
      <div
        class="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {error}
      </div>
    {/if}
  </form>

  <div class="w-full bg-white p-5 rounded-lg rounded-l-none">
    {#if output}
      <div>
        <label class="text-gray-700 dark:text-gray-200" for="generated-output"
          >Markdown Table</label
        >
        <textarea
          id="generatedText"
          class="block my-2 w-full h-44 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          name="generated-output">{output}</textarea
        >
      </div>
      <button
        class="ml-auto flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
        on:click={copy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 mx-1"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path
            d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
          />
        </svg>
        <span class="mx-1">Copy to clipboard</span>
      </button>
    {:else}
      <div class="">
        <h2 class="mb-2 text-lg font-semibold">How to generate</h2>
        <p class="text-sm text-gray-700">
          Copy and paste your public GitHub repo URL in the input field, select
          the number of columns you need in the generated table and click
          Generate.
        </p>
      </div>
    {/if}
  </div>
</div>
