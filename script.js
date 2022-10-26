const form = document.querySelector("#form-anime");
const inputAnime = document.querySelector(".input-anime");
const box = document.querySelector(".box-data");
const checkBoxAnime = document.querySelector(".chek-box-anime");
const checkBoxManga = document.querySelector(".chek-box-manga");
const animeUrl = "https://kitsu.io/api/edge/";
let enpoint = "";
let page = 0;
let nextPage = "";

async function fetchAPI(idAnime) {
  const returnApi = await fetch(
    nextPage ||
      animeUrl +
        enpoint +
        "?filter%5Btext%5D=" +
        idAnime +
        "&page%5Blimit%5D=10&page%5Boffset%5D=" +
        page
  );
  const response = await returnApi.json();

  return response;
}

function endpointAnime() {
  checkBoxAnime.addEventListener("click", () => {
    if (checkBoxAnime.checked) {
      enpoint = "anime";
      checkBoxManga.checked = false;
      clearAnime();
    }
  });
}

function endpointManga() {
  checkBoxManga.addEventListener("click", () => {
    if (checkBoxManga.checked) {
      enpoint = "manga";
      checkBoxAnime.checked = false;
      clearAnime();
    }
  });
}

function createButtonNextPage(links) {
  const buttonNext = document.createElement("button");

  buttonNext.innerHTML = "Next";
  buttonNext.addEventListener("click", () => {
    nextPage = links.next;
    page + 10;
    clearAnime();
    showAnime();
  });

  return buttonNext;
}

function createNameAnime(slug) {
  const nameAnime = document.createElement("p");

  nameAnime.classList.add("title-anime");
  nameAnime.innerHTML = slug;

  return nameAnime;
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

  const { data, links } = response;
  for (let anime of data) {
    const { attributes } = anime;
    const { slug, posterImage } = attributes;
    const { original } = posterImage;
    const boxAnime = document.createElement("div");

    boxAnime.classList.add("box-anime");
    boxAnime.appendChild(createImgAnime(original));
    boxAnime.appendChild(createNameAnime(slug));
    box.appendChild(boxAnime);
  }
  box.appendChild(createButtonNextPage(links));
}

function clearAnime() {
  box.innerHTML = "";
}

function clearInputAnime() {
  inputAnime.value = "";
}

endpointAnime();
endpointManga();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = inputAnime.value.trim();
  const idAnime = inputValue || "cowboy-bebop";

  clearAnime();
  nextPage = "";
  showAnime(idAnime);
  clearInputAnime();
});
