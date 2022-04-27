import React, { Component } from "react";
import SwapiService from "../../services/services";
import ErrorIndicator from "../error-indicator/error-indicator";
import ItemList from "../item-list/item-list";
import PersonDetails from "../item-details/item-details";

import './people-page.css';

class ErrorBoundry extends Component{

    state = {
        hasError: false
    }
    componentDidCatch(){
        
        this.setState({
            hasError: true
        })
    }

    render(){
        if(this.state.hasError){
            return <ErrorIndicator/>
        }
        return this.props.children;
    }
}

const Row = ({left, right}) => {
    return (
     <div className="row mb2">
        <div className="col-md-6">
           {left}
        </div>
        <div className="col-md-6">
           {right}
        </div>
     </div>        
    )
}

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