import React, { Component } from "react";
import SwapiService from "../../services/services";
import ErrorIndicator from "../error-indicator/error-indicator";
import ItemList from "../item-list/item-list";
import PersonDetails from "../item-details/item-details";
import Row from "../row/row";
import ErrorBoundry from "../error-boundry/error-boundry";

import './people-page.css';





export default class PeoplePage extends Component {

    swapiService = new SwapiService()

    state = {
        selectedPerson: 3,
    }



    onPersonSelected = (selectedPerson) => {
        this.setState({
            selectedPerson
        })
    }



    render(){

        if(this.state.hasError){
            return<ErrorIndicator/>
        }

        const itemList = (
            <ItemList 
                 onItemSelected ={this.onPersonSelected}
                 getData = {this.swapiService.getAllPeople}>
                  {(i) => ( 
                        `${i.name} (${i.birth_year})`
                    )}                              

            </ItemList>                         
        );

        const personDetails = (
            <PersonDetails personId = {this.state.selectedPerson}/>
        )

        return (
            <ErrorBoundry>
                <Row left = {itemList} right = {personDetails}/>
            </ErrorBoundry>           
        
        )
    }
}