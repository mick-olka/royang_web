import React, {Component} from "react";
const Context = React.createContext();

class MainContextProvider extends Component {

    state ={
        apiURL: "http://192.168.1.162:7500/"
    }

    render() {
        return (
            <Context.Provider value={this.state} >
                {this.props.children}
            </Context.Provider>
        );
    }
}
const MainContextConsumer = Context.Consumer;

export {MainContextProvider, MainContextConsumer};