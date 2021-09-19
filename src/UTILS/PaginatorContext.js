import React, {Component} from "react";
import {apiURL} from "../API/api.js";

const Context = React.createContext();

class PaginatorContext extends Component {
        
    state ={
        apiURL: apiURL,
    }

    render() {
        return (
            <Context.Provider value={this.state} >
                {this.props.children}
            </Context.Provider>
        );
    }
}
const PaginatorContextConsumer = Context.Consumer;

export {PaginatorContext, PaginatorContextConsumer};