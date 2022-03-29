import React, {useEffect, useState} from 'react';
import {NavLink, Route, Switch, useLocation} from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import ListForm from "../ListPage/ListForm/ListForm";
import NotFound from "../../Extra/NotFound";
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
import Settings from "./Settings";

function AdminPage({deleteAdminAuth, products, productsFound, lists, createList, changePW, pushToHistory, ...props}) {

    let links = [
        // {url: "/", name: "CLIENT"},
        {url: "/admin", name: "Main"},
        {url: "/admin/new", name: "New Prod"},
        // {url: "/admin/orders", name: "ORDERS"},
        // {url: "/admin/slider", name: "SLIDER"},
        {url: "/admin/text", name: "Text"},
        {url: "/admin/settings", name: "Settings"},
    ];

    const [showListForm, setShowListForm] = useState(false);

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
                    <div><NavLink to="/admin"><h1 className="admin_header_name" >ROTANG <span style={{fontSize: '1rem'}} >admin</span></h1></NavLink></div>
<div style={{fontSize: "0.9rem", textDecoration: "underline"}} onClick={deleteAdminAuth}>LOGOUT</div>
            </div>
            <div className="middle_pane middle_pane_admin">

                <div className="adminNavbar">
                    <Search redirectTo={"/admin/search"} pushToHistory={pushToHistory} />
                    <Navbar links={links}/>
                    <hr/>
                    <Navbar links={typesL}/>
                    <br/>
                    <h3 style={{fontSize: "1.5rem", textDecoration: 'underline'}} onClick={()=>setShowListForm(!showListForm)} >new list {showListForm ? '△':'▽'}</h3>
                    <div style={showListForm ? {display: 'block'}:{display: 'none'}} >
                        <ListForm onSubmit={onSubmit}/>
                    </div>
                </div>

                <div className="content_pane">
                    <Switch>
                        <Route path="/admin/products/:prodId?" render={() => <UpdateProductC/>}/>

                        <Route path="/admin/lists/:listUrl" render={() => <ListPaneC/>}/>

                        <Route path="/admin/settings" render={() => <Settings changePW={changePW}/>}/>
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