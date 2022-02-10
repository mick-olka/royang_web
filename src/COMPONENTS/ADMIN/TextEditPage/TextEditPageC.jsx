import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ItemsListC from "../ItemsList/ItemsListC";
import EditTextForm from "./EditTextForm";
import {createText, deleteText, getAllText, updateText} from "../../../REDUX/reducers/textReducer";


class TextEditPageC extends Component {

    constructor(props) {
        super(props);

        this.onTextDelete = this.onTextDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getAllText();
    }

    onSubmit(formData) {
        this.props.updateText(formData.name, formData.text, formData.nav_link);
        this.props.getAllText();
    }

    onTextDelete(idsArr) {
        // for (let i=0; i<idsArr.length; i++) {
        //     this.props.deleteText(idsArr[i]);
        // }
        // this.props.getAllText();
        alert("You cant delete this text yet");
    }


    render() {

        return (
            <div>

                <ItemsListC items={this.props.text_blocks} deleteItems={this.onTextDelete} >
                    {(item)=>(<EditTextForm initValues={item} onSubmit={this.onSubmit} />)}
                </ItemsListC>

            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return ({
        text_blocks: state.textReducer.text_blocks,
    });
}

export default compose(
    connect(mapStateToProps, {
        getAllText, createText, deleteText, updateText,
    }),
    withRouter,
)(TextEditPageC);