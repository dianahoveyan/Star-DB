import React, {Component} from "react";

import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details/item-details";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";
import SwapiService from "../../services/services";
import ErrorBoundry from "../error-boundry/error-boundry";
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
            getImageUrl = {getPersonImage} />
        )

        const starshipDetails = (
            <ItemDetails 
            itemId= {3} 
            getData = {getStarship}
            getImageUrl = {getStarshipImage} />
        )


        return(
            <ErrorBoundry>

           
            <div className="stardb-app">
                 <Header/>

                 <Row>
                     left ={personDetails}
                     right = {starshipDetails}
                 </Row>


            </div>

        </ErrorBoundry>
        )
        
    }
}