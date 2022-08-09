import React from "react";
import {SwapiServiceConsumer} from "../swapi-service-context";

const withSwapiService = (Wrapped, mapMethodsToProps) => {
    return (props) => {
        return(
            <SwapiServiceConsumer>
                {(swapiService) => {
                    const serviceProps = mapMethodsToProps(swapiService)
                    const test = {...props, ...serviceProps};
                    return(
                        <Wrapped {...test}/>
                    )}
                }
            </SwapiServiceConsumer>
        )
    }
}
export default withSwapiService
