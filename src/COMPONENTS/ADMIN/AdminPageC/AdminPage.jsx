import React, {useEffect} from 'react';
import {NavLink, Route, Switch, useLocation} from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import ListForm from "../ListPage/ListForm/ListForm";
import NotFound from "../../Extra/NotFound";
import ChangePW from "../AuthAdmin/ChangePW";
import Search from "../../SearchPage/Search";
import UpdateProductC from "../Product/UpdateProduct/UpdateProductC";
import SearchPageC from "../../SearchPage/SearchPageC";
import CreateProductC from "../Product/CreateProduct/CreateProductC";
import OrdersC from "../Orders/OrdersC";
import OrderEditPageC from "../Orders/OrderEditPageC";
import ListPaneC from "../ListPage/ListPaneC";
import MainAdminPageC from "./MainAdminPageC";
import SliderEditPageC from "../SliderEdit/SliderEditPageC";
import TextEditPageC from "../TextEditPage/TextEditPageC";
import AdminProductsPaneC from "../ProductsPaneA/AdminProductsPaneC";

function AdminPage({deleteAdminAuth, products, productsFound, lists, createList, changePW, pushToHistory, ...props}) {

    let links = [
        // {url: "/", name: "CLIENT"},
        {url: "/admin", name: "ADMIN"},
        {url: "/admin/new", name: "NEW PROD"},
        // {url: "/admin/orders", name: "ORDERS"},
        // {url: "/admin/slider", name: "SLIDER"},
        {url: "/admin/text", name: "TEXT"},
        {url: "/admin/login/pw", name: "edit PW"},
    ];

    let pn = useLocation().pathname;
    useEffect(() => {

    }, [pn]);

    let typesL = [...lists].map(l => {
        let l0 = {...l};
        l0.url = "/admin/lists/" + l0.url;
        return l0;
    });

    const onSubmit = (formData) => {    //  Create List
        createList(formData);
    }

    return (
        <div>

            <div className="admin_header" >
                <div>
                    <div><NavLink to="/admin"><h1>ADMIN</h1></NavLink></div>
<div style={{fontSize: "0.9rem", textDecoration: "underline"}} onClick={deleteAdminAuth}>LOGOUT</div>

                </div>
            </div>
            <div className="middle_pane middle_pane_admin">

                <div className="adminNavbar">
                    <Search redirectTo={"/admin/search"} pushToHistory={pushToHistory} />
                    <Navbar links={links}/>
                    <br/>
                    <h3 style={{fontSize: "1.3rem", textAlign: "center"}} >Lists</h3>
                    <Navbar links={typesL}/>
                    <br/>
                    <h3 style={{fontSize: "1.3rem", textAlign: "center"}} >New list</h3>
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
                                <AdminProductsPaneC products={productsFound}/>
                            </SearchPageC>
                        }/>

                        <Route path="/admin/orders/:orderId" render={() => <OrderEditPageC/>}/>

                        <Route path="/admin/orders" render={() => <OrdersC/>}/>

                        <Route path="/admin/slider" render={() => <SliderEditPageC />}/>

                        <Route path="/admin/text" render={() => <TextEditPageC />}/>

                        <Route path="/admin" render={() => <MainAdminPageC>
                            <AdminProductsPaneC {...props} products={products}/>
                        </MainAdminPageC>}/>
                        <Route render={() => (<NotFound/>)}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;