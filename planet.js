let currentPageUrl = 'https://swapi.dev/api/planets/';



window.onload = async () => {
  try {
    await loadPlanets(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar cards');
  }

  

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);

  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadPlanets(url) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Limpa os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((planets) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`
      card.className = "cards"
      const PlanetNameBG = document.createElement("div")
      PlanetNameBG.className = "Planet-name-bg"
      const PlanetName = document.createElement("span")
      PlanetName.className = "planet-name"
      PlanetName.innerText = `${planets.name}`
      PlanetNameBG.appendChild(PlanetName)
      card.appendChild(PlanetNameBG)

      card.onclick = () => {
        const modal = document.getElementById("modalPlanet")
        modal.style.visibility = "visible"
        
        const modalContent = document.getElementById("modalPlanet-content")
        modalContent.innerHTML = ''

        const planetImage = document.createElement("div")
        planetImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`
        planetImage.className = "planet-image"

        const name = document.createElement("span")
        name.className = "planet-details"
        name.innerText = `Nome: ${planets.name}`

        const planetClimate = document.createElement("span")
        planetClimate.className = "planet-details"
        planetClimate.innerText = `Clima: ${planets.climate}`

        const diameter = document.createElement("span")
        diameter.className = "planet-details"
        diameter.innerText = `Diametro: ${planets.diameter}`

        const population = document.createElement("span")
        population.className = "planet-details"
        population.innerText = `Populacao: ${planets.population}`

        const orbital_period = document.createElement("span")
        orbital_period.className = "planet-details"
        orbital_period.innerText = `Periodo Orbital: ${planets.orbital_period}`

        

        modalContent.appendChild(planetImage)
        modalContent.appendChild(name)
        modalContent.appendChild(planetClimate)
        modalContent.appendChild(diameter)
        modalContent.appendChild(population)
        modalContent.appendChild(orbital_period)
       
      }
      const mainContent = document.getElementById('main-content');
      mainContent.appendChild(card);

    });

    // Habilita ou desabilita os botões de acordo com a presença de URLs de próxima e página anterior
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');
    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;

    backButton.style.visibility = responseJson.previous ? "visible" : "hidden";

    currentPageUrl = url;
  } catch (error) {
    throw new Error('Erro ao carregar planetas');
  }
}





async function loadNextPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadPlanets(responseJson.next);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar a próxima página');
  }
}

async function loadPreviousPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadPlanets(responseJson.previous);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar a página anterior');
  }
}

function hideModalPlanet(){
    const modal = document.getElementById("modalPlanet")
    modal.style.visibility = "hidden"
}

