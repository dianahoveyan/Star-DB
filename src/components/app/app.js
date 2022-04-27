import React, {Component} from "react";

import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ItemDetails, { Record } from "../item-details/item-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/services";
import ErrorBoundry from "../error-boundry/error-boundry";
import ErrorButton from "../error-button/error-button";
import Row from "../row/row";

import "./app.css";

export default class App extends Component {

    swapiService = new SwapiService()

    state = {
        hasError: false,
        showRandomPlanet: true
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return{
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };


    componentDidCatch(){
        console.log("component did catch")
        this.setState({hasError: true})
    }

    render(){
        if(this.state.hasError){
            return <ErrorIndicator/>
        }

        const { getPerson, getStarship,
                getPersonImage,getStarshipImage } = this.swapiService
        const planet = this.state.showRandomPlanet?
           <RandomPlanet/>:
           null;

        const personDetails = (
            <ItemDetails
            itemId = {11}
            getData = {getPerson}
            getImageUrl = {getPersonImage}>
                    <Record field= "gender" label= "Gender" />
                    <Record field= "eyeColor" label= "Eye Color" />
            </ItemDetails>
        )

        const starshipDetails = (
            <ItemDetails
                itemId= {3} 
                getData = {getStarship}
                getImageUrl = {getStarshipImage}>

                    <Record field= "model" label= "Model" />
                    <Record field= "length" label= "Length" />
                    <Record field= "costInCredits" label= "Cost" />

            </ItemDetails>
        );


        return(
            <ErrorBoundry>

           
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

                 <Row>
                     left ={personDetails}
                     right = {starshipDetails}
                 </Row>


            </div>

        </ErrorBoundry>
        )
        
    }
}