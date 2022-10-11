const form = document.querySelector("#form-game");
const box = document.querySelector(".box-data");
const gmaesUrl = "https://kitsu.io/api/edge/anime?filter[id]=";

async function responseAPI() {
  const returnApi = await fetch(gmaesUrl + "1");
  const response = await returnApi.json();

  return response;
}

function createNameAnime(slug) {
  const nameAnime = document.createElement("p");

  nameAnime.innerHTML = slug;

  return nameAnime;
}

function createSynopsis(synopsis) {
  const synopsisAnime = document.createElement("p");

  synopsisAnime.innerHTML = synopsis;

  return synopsisAnime;
}

function createImgAnime(original) {
  const imageAnime = document.createElement("img");

  imageAnime.src = original;

  return imageAnime;
}

async function showAnime() {
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

  box.appendChild(createImgAnime(original));
  box.appendChild(createNameAnime(slug));
  box.appendChild(createSynopsis(synopsis));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  showAnime();
});
