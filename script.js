const form = document.querySelector("#form-anime");
const inputAnime = document.querySelector(".input-anime");
const box = document.querySelector(".box-data");
const gmaesUrl = "https://kitsu.io/api/edge/";

async function fetchAPI(idAnime) {
  const returnApi = await fetch(gmaesUrl + "anime?filter[text]=" + idAnime);
  const response = await returnApi.json();

  return response;
}

function createNameAnime(slug) {
  const nameAnime = document.createElement("p");

  nameAnime.classList.add("title-anime");
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

async function showAnime(idAnime) {
  let response;

  try {
    response = await fetchAPI(idAnime);
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

function clearAnime() {
  box.innerHTML = "";
}

function clearInputAnime() {
  inputAnime.value = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = inputAnime.value.trim();
  const idAnime = inputValue || "cowboy-bebop";

  clearAnime();
  showAnime(idAnime);
  clearInputAnime();
});
