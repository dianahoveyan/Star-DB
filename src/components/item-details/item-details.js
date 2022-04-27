import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React, {Component} from "react";
import SwapiService from "../../services/services";

import './item-details.css'

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        image: null
    };

    componentDidMount() {
        this.updateitem()
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId){
            this.updateitem();
        }
    }

    updateitem(){
        const { itemId, getData,getImageUrl } = this.props;
        if (!itemId ){
            return;
        }
        getData(itemId)
        .then((item) =>{
            this.setState({ 
                item, 
                image: getImageUrl(item)
            });
        });
    }

    render() {
        const{item, image} = this.state;

        if(!item){
            return <span>Select a item from a list</span>
        }

        const { id, name, gender,
                birth_year, eye_color} = item;

        return (
            <div className="item-details card">
                <img className="item-image"
                 src={image}/>

                <div className="card-body">
                    <h4>{name} {this.props.itemId}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birth_year}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eye_color}</span>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}