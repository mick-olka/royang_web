import React from 'react';
import {NavLink, Route, Switch} from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import ListForm from "../ListPage/ListForm/ListForm";
import NotFound from "../../extra/NotFound";
import ChangePW from "../AuthAdmin/ChangePW";
import Search from "../../Content/SearchPage/Search";
import SearchWrapper from "../../Content/SearchPage/SearchWrapper";
import Paginator from "../../extra/Paginator/Paginator";
import UpdateProduct from "../Product/UpdateProduct";
import CreateProduct from "../Product/CreateProduct";
import ListPane from "../ListPage/ListPane";
import ProductItem from "../Product/ProductItem";
import ItemsList from "../ItemsList/ItemsList";

function AdminPage({deleteAdminAuth, products, productsFound, lists,
                       deleteProducts, createList, changePW, findProducts,
                       paginatorData, setCurrentPageAC, setPortionNumAC, getProducts,
    getProductById, updateProduct, addElement, addPhotos, deletePhotos, updateProductProps, setChosenProductAC,
    createProduct, idOfCreated,
    pushToHistory, setIdOfCreatedAC,
                       updateList, deleteList, deleteElement, listPageProps, getListByUrl,
                       chosenProduct, chosenItemsIds, setChosenItemsIdsAC,
                       ...props}) {

    let links = [
        {url: "/", name: "Client"},
        {url: "/admin", name: "Admin"},
        {url: "/admin/new", name: "New Product"},
        {url: "/admin/login/pw", name: "PW mod"},
    ];

    //let pn = useLocation().pathname;

    const onPageChanged = (pageNumber) => {
            setCurrentPageAC(pageNumber);
            getProducts(pageNumber, paginatorData.pageLimit);
    }

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

    const MainAdminPage = ({products}) => {
        //let [itemsIdArr, setItemsIdArr] = useState([]);
        console.log("R MainAdminPane");
        return <div>
            <h1>All Products</h1>
            {chosenProduct? <div><h3>Choose related to {chosenProduct.name}</h3>
                <button>Set as related</button>
                <button>Set as similar</button>
            </div> : null}
            <ItemsList items={products} deleteItems={deleteProducts} itemsIdArr={chosenItemsIds} setItemsIdArr={setChosenItemsIdsAC} >
                {item => <ProductItem item={item}/>}
            </ItemsList>
        </div>;
    }

    console.log("R AdminPane^");
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
                        <Route path="/admin/products/:prodId?" render={() => <UpdateProduct
                            getProductById={getProductById} updateProduct={updateProduct}
                            addElement={addElement} addPhotos={addPhotos} deletePhotos={deletePhotos}
                            pushToHistory={pushToHistory} setIdOfCreatedAC={setIdOfCreatedAC}
                            setChosenProductAC={setChosenProductAC}
                            {...updateProductProps}
                        />}/>

                        <Route path="/admin/lists/:listUrl"
                               render={() => <ListPane {...listPageProps}
                                                       updateList={updateList}
                                                       deleteList={deleteList}
                                                       getListByUrl={getListByUrl}
                                                       deleteElement={deleteElement} />}/>

                        <Route path="/admin/login/pw" render={() => <ChangePW changePW={changePW} />}/>
                        <Route path="/admin/new" render={() => <CreateProduct createProduct={createProduct}
                                                                              lists={lists} pushToHistory={pushToHistory} idOfCreated={idOfCreated} />}/>
                        <Route path="/admin/search" render={() =>
                            // <MainAdminPage products={productsFound} />
                            <SearchWrapper
                                products={productsFound}
                                paginatorData={paginatorData}
                                findProducts={findProducts}
                                setCurrentPage={setCurrentPageAC}
                                setPortionNum={setPortionNumAC} >
                                <MainAdminPage products={productsFound}  />
                            </SearchWrapper>
                        }/>

                        <Route path="/admin" render={() => <div>
                            <MainAdminPage products={products} chosenProduct={chosenProduct} />
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