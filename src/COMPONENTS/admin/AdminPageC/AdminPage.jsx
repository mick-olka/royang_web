import React, {useEffect} from 'react';
import {NavLink, Route, Switch, useLocation} from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import ListForm from "../ListPage/ListForm/ListForm";
import NotFound from "../../extra/NotFound";
import ChangePW from "../AuthAdmin/ChangePW";
import Search from "../../SearchPage/Search";
import ProductItem from "../Product/ProductItem";
import ItemsListC from "../ItemsList/ItemsListC";
import UpdateProductC from "../Product/UpdateProduct/UpdateProductC";
import SearchPageC from "../../SearchPage/SearchPageC";
import CreateProductC from "../Product/CreateProduct/CreateProductC";
import OrdersC from "../Orders/OrdersC";
import OrderEditPageC from "../Orders/OrderEditPageC";
import ListPaneC from "../ListPage/ListPaneC";
import MainAdminPageC from "./MainAdminPageC";
import SliderEditPageC from "../SliderEdit/SliderEditPageC";
import TextEditPageC from "../TextEditPage/TextEditPageC";

function AdminPage({
                       deleteAdminAuth, products, productsFound, lists,
                       deleteProducts, createList, changePW,
                       setCurrentPageAC, getProducts,
                       updateList, deleteList, deleteElement, listPageProps, getListByUrl,
                       chosenProduct, updateProduct, setChosenProductAC,
                       addElement, itemsIdsArr,
                       ...props
                   }) {

    let links = [
        {url: "/", name: "CLIENT"},
        {url: "/admin", name: "ADMIN"},
        {url: "/admin/new", name: "NEW PROD"},
        {url: "/admin/orders", name: "ORDERS"},
        {url: "/admin/slider", name: "SLIDER"},
        {url: "/admin/text", name: "TEXT"},
        {url: "/admin/login/pw", name: "edit PW"},
    ];

    let pn = useLocation().pathname;
    useEffect(() => {

    }, [pn]);
    //
    // const onPageChanged = (pageNumber) => {
    //         setCurrentPageAC(pageNumber);
    //         getProducts(pageNumber);
    // }

    let typesL = [...lists].map(l => {
        let l0 = {...l};
        l0.url = "/admin/lists/" + l0.url;
        return l0;
    });

    const onSubmit = (formData) => {    //  Create List
        createList(formData.name, formData.url);
    }

    // const ProductItem = ({item}) => {
    //     return (<>
    //                 <div className={list.photoBox}>
    //                     <img className={list.photo} src={item.thumbnail ? item.thumbnail : chairIcon}
    //                          alt="img"/>
    //                 </div>
    //                 <p><NavLink to={"/admin/products/" + item._id}>{item.name}</NavLink></p>
    //                 <p>$ {item.price}</p>
    //             </>
    //     );
    // }

    const PaneWithProducts = ({products}) => {

        const updateSimilarOrRelated = (data) => {
            updateProduct(chosenProduct._id, data);
            console.log(data);
            setChosenProductAC(null);
            props.history.push("/admin/products/"+chosenProduct._id);
        }

        const onSetAsSimilar =()=> {
            let newSimilarProds = {similarProducts: [...chosenProduct.similarProducts, ...itemsIdsArr]}
            updateSimilarOrRelated(newSimilarProds);
        }

        const onSetAsRelated =()=> {
            let newRelatedProds = {relatedProducts: [...chosenProduct.relatedProducts, ...itemsIdsArr]}
            updateSimilarOrRelated(newRelatedProds);
        }

        return <div>
            {chosenProduct ? <div><h3>Choose related to {chosenProduct.name}</h3>
                <button onClick={onSetAsRelated} >Set as related</button>
                <button onClick={onSetAsSimilar} >Set as similar</button>
            </div> : null}
            <ItemsListC items={products} deleteItems={deleteProducts}>
                {item => <ProductItem item={item}/>}
            </ItemsListC>
        </div>;
    }

    //console.log("R AdminPane^");
    return (
        <div>
            <div className="admin_header" >
            <NavLink to="/admin"><h1>ADMIN</h1></NavLink>
            <button style={{marginLeft: "auto"}} onClick={deleteAdminAuth}>LOGOUT</button>
            </div>
            <div className="middle_pane">

                <div className="adminNavbar">
                    <Search redirectTo={"/admin/search"} {...props} />
                    <Navbar links={links}/>
                    <p>----------------</p>
                    <p>Lists</p>
                    <Navbar links={typesL}/>
                    <br/>
                    <p>--Create list---</p>
                    <ListForm onSubmit={onSubmit}/>
                </div>

                <div className="content_pane">
                    <Switch>
                        <Route path="/admin/products/:prodId?" render={() => <UpdateProductC/>}/>

                        <Route path="/admin/lists/:listUrl" render={() => <ListPaneC/>}/>

                        <Route path="/admin/login/pw" render={() => <ChangePW changePW={changePW}/>}/>
                        <Route path="/admin/new" render={() => <CreateProductC/>}/>
                        <Route path="/admin/search" render={() =>
                            <SearchPageC>
                                <PaneWithProducts products={productsFound}/>
                            </SearchPageC>
                        }/>

                        <Route path="/admin/orders/:orderId" render={() => <OrderEditPageC/>}/>

                        <Route path="/admin/orders" render={() => <OrdersC/>}/>

                        <Route path="/admin/slider" render={() => <SliderEditPageC />}/>

                        <Route path="/admin/text" render={() => <TextEditPageC />}/>

                        <Route path="/admin" render={() => <MainAdminPageC>
                            <PaneWithProducts products={products}/>
                        </MainAdminPageC>}/>
                        <Route render={() => (<NotFound/>)}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;