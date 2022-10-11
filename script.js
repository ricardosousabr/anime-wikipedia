const form = document.querySelector("#form-game");
const box = document.querySelector(".box-data");
const gmaesUrl = "https://kitsu.io/api/edge/anime?filter[id]=";

async function responseAPI() {
  const returnApi = await fetch(gmaesUrl + "1");
  const response = await returnApi.json();

  return response;
}

async function showGame() {
  let response;

  try {
    response = await responseAPI();
  } catch (err) {
    console.log("Deu errado");
  }

  const { data } = response;
  const { id, attributes } = data[0];
  const { slug, synopsis, posterImage } = attributes;
  const { original } = posterImage;

  console.log(id, slug, synopsis, original);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  showGame();
});
