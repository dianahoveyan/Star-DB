const API_URL = "https://swapi.dev/api"

export default class SwapiService {

    getResource = async (url) =>{
        const res = await fetch(API_URL + url );

    if(!res.ok){
        throw new Error (`Could not fetch ${url}` + 
        `, received ${res.status}`)
    }
    return await res.json();
 }


 getAllPeople = async () => {
  const res = await this.getResource(`/people`)
  return res.results.map(this._transformPerson)
}

 getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`)
    return this._transformPerson(person);
}

 getAllPlanets = async () =>{
    const res = await this.getResource(`/planets/`)
    return res.results.map(this._transformPlanet); 
  }
  
 getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
      return this._transformPlanet(planet)
  }


 getAllStarships = async () => {
    const res = await this.getResource(`/starships/`)
    return res.results.map(this._transformStarship)
}
  
 getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`)
      return this._transformStarship
  }  

_extractID = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
}


_transformPlanet = (planet) => {
    
    return{
        id: this._extractID(planet),
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter
   }

}

_transformStarship = (starship) => {
    return{
        id: this._extractID(starship),
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.costInCredits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargoCapacity
    }
}

_transformPerson = (person) => {
    return {
        id: this._extractID(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birthYear,
        eyeColor: person.eyeColor

    }
}


}  


const swapi = new SwapiService();

swapi.getAllPeople().then ((body) => {
    console.log(body)
})

