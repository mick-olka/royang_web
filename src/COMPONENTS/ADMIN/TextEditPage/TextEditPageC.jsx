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
        alert("You can't delete this text, ask developer to do this");
    }
    render() {
        return (
            <div>
                <ItemsListC items={this.props.text_blocks} deleteItems={this.onTextDelete} >
                    {(item)=>(<EditTextForm initValues={item} onSubmit={this.onSubmit} />)}
                </ItemsListC>
                <div className={'hints_block'} >
                    <h3>Hints</h3><br/>
                    <p>{"<br/> - new line"}</p>
                    <p>{"<p>text</p> - new line + indent"}</p>
                    <p>{"<b>text</b> - bold"}</p>
                    <p>{"<h3>text</h3> - subheader"}</p>
                    <p>{"<a href='https://rotang.ua' >text</a> - link to url"}</p>
                    <p>{"<a href='mailto:mail@rotang.ua' >text</a> - link to email"}</p>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return ({text_blocks: state.textReducer.text_blocks,});
}

export default compose(
    connect(mapStateToProps, {
        getAllText, createText, deleteText, updateText,
    }), withRouter,
)(TextEditPageC);