import {SwapiServiceConsumer} from "../swapi-service-context";
import ItemDetails, {Record} from "../item-details/item-details";
import React from "react";
import {withSwapiService} from '../hoc-helpers'


const PlanetDetails = (props) => {
    console.log(props, 'props');
    return(
        <ItemDetails {...props}>
            <Record field= "population" label= "Population" />
            <Record field= "rotationPeriod" label= "RotationPeriod" />
            <Record field= "diameter" label= "Diameter" />
        </ItemDetails>
    )
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    }
}
export default withSwapiService(PlanetDetails, mapMethodsToProps)
