import React, {Component} from "react";
import SwapiService from "../../services/services";
import Spinner from "../spinner/spinner";

import './item-list.css'


class ItemList extends Component {



    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item

            const label = this.props.children(item);
            return(
                <li className="list-group-item"
                    key={id}
                    onClick = {() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {data} = this.props


        const items = this.renderItems(itemList)


        return(
            <ul className="item-list list-group">
                {items}
            </ul>
        )
    }
}


const withData = (View) => {
    return class extends Component{


        state = {
            data: null
        }
    
        componentDidMount(){
    
            const { getData } = this.props;
    
           getData()
            .then((data) => {
                this.setState({
                    data
                })
            })
    
        }


        render() {

            const { data} = this.state;
 
            if(!data) {
                return <Spinner/>
            }
            return <View {...this.props} data={data}/>
        }
    };
};

export default withData(ItemList)