import React, {Component} from "react";

import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import SwapiService from "../../services/services";
import ErrorBoundry from "../error-boundry/error-boundry";
import ErrorButton from "../error-button/error-button";
import Row from "../row/row";
import {SwapiServiceProvider} from "../swapi-service-context";
import { PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList } from "../sw-components";


import "./app.css";
import {PeoplePage, PlanetsPage, StarshipsPage} from "../pages";


export default class App extends Component {

    swapiService = new SwapiService()

    state = {
        hasError: false,
        showRandomPlanet: true
    }

    // toggleRandomPlanet = () => {
    //     this.setState((state) => {
    //         return{
    //             showRandomPlanet: !state.showRandomPlanet
    //         }
    //     });
    // };

    render(){
        const planet = this.state.showRandomPlanet ?
            <RandomPlanet /> :
            null;

        return(
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                <div className="stardb-app">
                 <Header/>
                 {planet}

                 <div className="row mb2 button-row">
                     <button
                       className="toggle-planet btn btn-warning btn-lg"
                       onClick={this.toggleRandomPlanet}>
                       Toggle Random Planet
                     </button>
                    <ErrorButton />
                 </div>
                    <PeoplePage />
                    <PlanetsPage />
                    <StarshipsPage />
            </div>
         </SwapiServiceProvider>
        </ErrorBoundry>
        )

    }
}
