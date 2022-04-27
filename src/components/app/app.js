import React, {Component} from "react";

import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/preson-details"

import "./app.css";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";
import SwapiService from "../../services/services";

export default class App extends Component {

    swapiService = new SwapiService()

    state = {
        hasError: false
    }


    componentDidCatch(){
        console.log("component did catch")
        this.setState({hasError: true})
    }

    render(){
        if(this.state.hasError){
            return <ErrorIndicator/>
        }
        return(
            <div className="stardb-app">
            <Header/>
            <RandomPlanet/>
            <div className="row mb2 button-row">
                <ErrorButton/>
            </div>

            <PeoplePage/>

            <div className="row mb2">
                  <div className="col-md-6">
                     <ItemList 
                     onItemSelected ={this.onPersonSelected}
                     getData = {this.swapiService.getAllPlanets}
                     renderItem = {(item) => item.name}/>
                  </div>
                  <div className="col-md-6">
                     <PersonDetails personId = {this.state.selectedPerson}/>
                  </div>
             </div>     

             <div className="row mb2">
                  <div className="col-md-6">
                     <ItemList 
                     onItemSelected ={this.onPersonSelected}
                     getData = {this.swapiService.getAllStarships}
                     renderItem = {(item) => (
                     <span>{item.name} <button>!</button></span>
                     )}/>
                  </div>
                  <div className="col-md-6">
                     <PersonDetails personId = {this.state.selectedPerson}/>
                  </div>
             </div>        

        </div>
        )
        
    }
}