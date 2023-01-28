const select = document.getElementById("select");
const container = document.querySelector(".container");

window.addEventListener("load", () => {
  getCountries();
});

const getCountries = async () => {
  try {
    const req = await fetch("https://restcountries.com/v3/all");
    const data = await req.json();
    const names = data.map(({ name: { common } }) => common);
    select.addEventListener("change", (e) => {
      countryFind = [];
      data.forEach((x) => {
        x.name.common === select.value && countryFind.push(x);
      });
      createInfo(countryFind);
    });
    createOptions(names);
  } catch (error) {
    console.log(error);
  }
};

const createOptions = (names) => {
  names.forEach((e) => {
    option = document.createElement("option");
    option.innerText = e;
    option.value = e;
    select.appendChild(option);
  });
};

const createInfo = (target) => {
  const {
    borders,
    capital,
    languages,
    maps,
    region,
    currencies,
    flags,
    population,
    name: { common },
  } = target[0];
  // const { name: cName, symbol } = Object.values(currencies)[0];
  currArr = []
  Object.values(currencies).forEach(e => {
    const { name: cName, symbol } = e
    currArr.push(cName + ', ' + symbol)
  })
  div = document.createElement("div");
  div.classList.add('country-card')
  imgDiv = document.createElement("div");
  imgDiv.classList.add('img-div')
  imgDiv.style.backgroundImage = `url(${flags[1]})`;
  infoDiv = document.createElement("div");
  infoDiv.classList.add('info-div')
  h1 = document.createElement("h1");
  h1.innerText = common;
  regionP = document.createElement("p");
  regionS = document.createElement('span')
  regionS.classList.add('span')
  regionS1 = document.createElement('span')
  regionS.innerText= 'Region: '
  regionP.appendChild(regionS)
  regionS1.innerText =  region;
  regionP.appendChild(regionS1)
  capitalP = document.createElement("p");
  capitalS = document.createElement('span')
  capitalS.classList.add('span')
  capitalS1 = document.createElement('span')
  capitalS.innerText = 'Capitals: ' 
  capitalP.appendChild(capitalS)
  capitalS1.innerText = capital.join();
  capitalP.appendChild(capitalS1)
  languagesP = document.createElement("p");
  languagesS = document.createElement('span')
  languagesS1 = document.createElement('span')
  languagesS.classList.add('span')
  languagesS.innerText = 'Languages: '
  languagesP.appendChild(languagesS)
  languagesS1.innerText = Object.values(languages).join();
  languagesP.appendChild(languagesS1)
  currenciesP = document.createElement("p");
  currenciesS = document.createElement('span')
  currenciesS.classList.add('span')
  currenciesS1 = document.createElement('span')
  currenciesS.innerText = 'Currencies: '
  currenciesP.appendChild(currenciesS)
  currenciesS1.innerText =  currArr.join(' | ');
  currenciesP.appendChild(currenciesS1)
  populationP = document.createElement("p");
  populationS = document.createElement('span')
  populationS.classList.add('span')
  populationS1 = document.createElement('span')
  populationS.innerText = 'Population: '
  populationP.appendChild(populationS)
  populationP.appendChild(populationS1)
  populationS1.innerText = population.toLocaleString().replaceAll('.',',');
  bordersP = document.createElement("p");
  bordersS = document.createElement('span')
  bordersS.classList.add('span')
  bordersS1 = document.createElement('span')
  bordersS.innerText = 'Borders: '
  bordersP.appendChild(bordersS)
  bordersS1.innerText = (borders ? borders.join() : 'none')
  bordersP.appendChild(bordersS1)


  map = document.createElement("p");
  mapS = document.createElement('span')
  mapS.classList.add('span')
  mapS.innerText = "Map: "
  mapLink = document.createElement("a");
  mapLink.innerText = 'Go to google map'
  mapLink.href = Object.values(maps)[0];
  mapLink.setAttribute('target', '_blank')
  container.children[1]?.remove()

  div.appendChild(imgDiv)
  div.appendChild(infoDiv)
  infoDiv.appendChild(h1)
  infoDiv.appendChild(regionP)
  infoDiv.appendChild(capitalP)
  infoDiv.appendChild(languagesP)
  infoDiv.appendChild(currenciesP)
  infoDiv.appendChild(populationP)
  infoDiv.appendChild(bordersP)
  map.appendChild(mapS)
  map.appendChild(mapLink)
  infoDiv.appendChild(map)
  container.appendChild(div)
};
