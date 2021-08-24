// import React from 'react';
// import SectionsPane from "./SectionsPane";
// import {compose} from "redux";
// import { connect } from "react-redux";
// import {getProducts} from "../../../REDUX/reducers/productsReducer";

// class SectionsPaneC extends Component {
//
//     componentDidMount() {
//         this.props.getProducts();
//     }
//
//     render() {
//         return (
//             <div>
//                 <SectionsPaneC products={this.props.products} />
//             </div>
//         );
//     }
// }

// let mapStateToProps = (state) => {
//     return{
//         products: state.productsReducer.products,
//     }
// }
//
// export default compose(
//     connect(mapStateToProps, {getProducts}),
// )(SectionsPane);