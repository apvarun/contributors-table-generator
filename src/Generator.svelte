<script>
  let username = "";
  let repo = "";
  const API = () =>
    `https://api.github.com/repos/${username}/${repo}/contributors?page=1&per_page=100`;
  let error = "";
  let output = "";
  let columnCount = 6;

  async function generate(event) {
    event.preventDefault();

    if (!username) {
      error = "Username cannot be empty";
      return;
    }
    if (!repo) {
      error = "Repository name cannot be empty";
      return;
    }

    const rawResponse = await fetch(API());
    const response = await rawResponse.json();

    const details = response.map(value => ({
      url: value.html_url,
      avatar: value.avatar_url,
      name: value.login
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
      data += `<td align="center"><a href="${item.url}"><img alt="${
        item.name
      }" src="${item.avatar}" width="117" /><br />${item.name}</a></td>`;
    });
    data += "</tr></table>";

    output = data;
  }

  function copy() {
    const copyText = document.querySelector("#generatedText");
    copyText.select();
    document.execCommand("copy");
  }
</script>

<div class="container mx-auto">
  <div class="flex justify-center px-6 my-12">
    <!-- Row -->
    <div class="w-full xl:w-3/4 lg:w-11/12 flex">
      <!-- Col -->
      <div class="w-full w-1/2 bg-white p-5 rounded-lg rounded-r-none">
        <h3 class="pt-4 text-xl text-center">Contributors list table generator</h3>
        <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="username">
              Github username
            </label>
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
              bind:value={username}
            />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="username">
              Name of repo
            </label>
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Repository"
              bind:value={repo}
            />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="username">
              Column count
            </label>
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Column count"
              bind:value={columnCount}
            />
          </div>
          <div class="mb-4">
            <button on:click={generate} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate</button>
          </div>
          {#if error}
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>
          {/if}
        </form>
      </div>
      
      <!-- Col -->
      <div class="w-full w-1/2 bg-white p-5 rounded-lg rounded-l-none">
        {#if output}
          <textarea id="generatedText" class="text-grey-darkest flex-1 p-2 m-1 bg-transparent w-full h-64 border-gray-400 border-2 rounded" name="tt">{output}</textarea>
          <button class="block ml-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded items-center" on:click={copy}>Copy to clipboard</button>
        {:else}
          <div class="pl-4 pr-4 pt-4 mb-4 text-left relative flex-grow">
            <h3 class="text-lg font-bold text-gray-darkest mr-10">
              <span class="skeleton-box h-3 w-1/6 inline-block bg-gray-400"></span>
              <span class="skeleton-box h-3 w-1/2 inline-block bg-gray-400"></span>
              <span class="skeleton-box h-3 w-2/4 inline-block bg-gray-400"></span>
              <span class="skeleton-box h-3 w-2/5 inline-block bg-gray-400"></span>
            </h3>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>