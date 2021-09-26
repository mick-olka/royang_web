import React from 'react';
import {NavLink, Route, Switch, useLocation} from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import ListForm from "../ListPage/ListForm/ListForm";
import CreateProductC from "../Product/CreateProductC";
import NotFound from "../../extra/NotFound";
import UpdateProductC from "../Product/UpdateProductC";
import ItemsList from "../ItemsList/ItemsList";
import list from "../ItemsList/ItemsList.module.css";
import chairIcon from "../../../IMGS/chair.png";
import ChangePW from "../AuthAdmin/ChangePW";
import Search from "../../Content/SearchPage/Search";
import SearchWrapper from "../../Content/SearchPage/SearchWrapper";
import Paginator from "../../extra/Paginator/Paginator";
import ListPaneC from "../ListPage/ListPaneC";

function AdminPage({deleteAdminAuth, products, productsFound, lists,
                       deleteProducts, createList, changePW, findProducts,
                       paginatorData, setCurrentPageAC, setPortionNumAC, getProducts,
                       ...props}) {

    let links = [
        {url: "/", name: "Client"},
        {url: "/admin", name: "Admin"},
        {url: "/admin/new", name: "New Product"},
        {url: "/admin/login/pw", name: "PW mod"},
    ];

    let pn = useLocation().pathname;

    const onPageChanged = (pageNumber) => {
        if (pn==='/admin') {
            setCurrentPageAC(pageNumber);
            getProducts(pageNumber, paginatorData.pageLimit);
        }
    }

    let typesL = [...lists].map(l => {
        let l0 = {...l};
        l0.url = "/admin/lists/" + l0.url;
        return l0;
    });

    const onSubmit = (formData) => {    //  Create List
        createList(formData.name, formData.url);
    }

    const ProductItem = ({item}) => {
        return (<>
                    <div className={list.photoBox}>
                        <img className={list.photo} src={item.thumbnail ? item.thumbnail : chairIcon}
                             alt="img"/>
                    </div>
                    <p><NavLink to={"/admin/products/" + item._id}>{item.name}</NavLink></p>
                    <p>$ {item.price}</p>
                </>
        );
    }

    const MainAdminPage = ({products}) => {
        return <div>
            <h1>All Products</h1>
            <ItemsList items={products} deleteItems={deleteProducts}>
                {item => <ProductItem item={item}/>}
            </ItemsList>
        </div>;
    }

    return (
        <div>
            <NavLink to="/admin"><h1>ADMIN</h1></NavLink>
            <button onClick={deleteAdminAuth}>LOGOUT</button>
            <div className="middle_pane">

                <div className="adminNavbar">
                    <Search redirectTo={"/admin/search"} {...props} />
                    <Navbar links={links}/>
                    <p>----------</p>
                    <p>Lists</p>
                    <Navbar links={typesL}/>
                    <ListForm onSubmit={onSubmit}/>
                </div>

                <div className="content_pane">
                    <Switch>
                        <Route path="/admin/products/:prodId?" render={() => <UpdateProductC/>}/>
                        <Route path="/admin/lists/:listUrl" render={() => <ListPaneC/>}/>
                        <Route path="/admin/login/pw" render={() => <ChangePW changePW={changePW} />}/>
                        <Route path="/admin/new" render={() => <CreateProductC/>}/>
                        <Route path="/admin/search" render={() =>
                            // <MainAdminPage products={productsFound} />
                            <SearchWrapper
                                products={productsFound}
                                findProducts={findProducts}
                                paginatorData={paginatorData}
                                setCurrentPage={setCurrentPageAC}
                                setPortionNum={setPortionNumAC} >
                                <MainAdminPage products={productsFound} />
                            </SearchWrapper>
                        }/>

                        <Route path="/admin" render={() => <div><MainAdminPage products={products} />
                            <Paginator
                            paginatorData={paginatorData}
                            setPortionNum={setPortionNumAC}
                            onPageChanged={onPageChanged}
                        />
                        </div>}/>
                        <Route render={() => (<NotFound/>)}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;