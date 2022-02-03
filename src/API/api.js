import * as axios from "axios";

export const apiURL = 'http://178.54.240.228:7500/';
axios.defaults.withCredentials = true;
const instance = axios.create({
    withCredentials: true,
    baseURL: apiURL,
    headers: {},
});

export const showPopup = (text) => {
    let small_popup = document.getElementById("small_popup");
    small_popup.innerText = text;
    small_popup.style.right = "1px";
    small_popup.style.opacity="1";
    setTimeout(() => {
        small_popup.style.right = "-15rem";
        small_popup.style.opacity="0";
    }, 2000);
}

export const productsAPI = {

    getProducts(page = 1, limit = 6) {
        return instance.get(
            `products?page=${page}&limit=${limit}`,
        ).then(response => {
            console.log(response);
            return response.data;
        });
    },

    getProductById(id) {
        return instance.get(
            'products/' + id,
        ).then(response => {
            return response.data;
        });
    },

    createProduct(productData) {
        return instance.post(
            'products',
            {...productData}
        ).then(res => {
            return res.data;
        });
    },

    updateProduct(id, formData) {
        return instance.patch(
            'products/' + id,
            {...formData}
        ).then(res => {
            return res.data;
        });
    },

    deleteProduct(id) {
        return instance.delete(
            'products/' + id,
        ).then(res => {
            return res.data;
        });
    },

    findProducts(str = "", page = 1, limit = 2) {
        return instance.get(
            `search?str=${str}&page=${page}&limit=${limit}`,
        ).then(res => {
            return res.data;
        });
    }

}

export const photosAPI = {

    setThumbnail(id, file) {
        let formData = new FormData();
        formData.append("thumbnail", file);
        return instance.post(
            'photos/thumbnail/' + id, formData,
            {headers: {"Content-Type": "multipart/form-data"}},
        ).then(response => {
            return response.data;
        });
    },

    addPhotos(id, files, mainColor, pillColor) {
        let formData = new FormData();
        //formData.append("pathArr", files);
        for (let i = 0; i < files.length; i++) {
            formData.append('pathArr', files[i]);
        }
        formData.append("mainColor", mainColor);
        formData.append("pillColor", pillColor);
        return instance.post(
            'photos/' + id, formData,
            {headers: {"Content-Type": "multipart/form-data"}},
        ).then(response => {
            return response.data;
        });
    },

    deletePhotos(id, photosId) {
        return instance.delete(
            `photos/${id}/${photosId}`,
        ).then(response => {
            return response.data;
        });
    },

    getGallery() {
        return instance.get(
            `photos/gallery`,
        ).then(response => {
            return response.data;
        });
    },

    getColors() {
        return instance.get(
            `photos/colors`,
        ).then(response => {
            return response.data;
        });
    },

}

export const adminAPI = {

    setAuth(password) {
        return instance.post(
            'admin/login',
            {data: password}
        ).then(response => {
            return response.data;
        }).catch(function (error) {
            if (error.response) {
                showPopup(error.response.data.error);
            }
        });
    },

    getAuth() {
        return instance.get(
            'admin/login/check',
        ).then(response => {
            return response.data;
        });
    },

    changePW(password, oldPassword) {
        return instance.post(
            'admin/login/pw',
            {data: password, oldData: oldPassword}
        ).then(response => {
            return response.data;
        })
    },

    deleteAuth() {
        return instance.delete(
            'admin/login',
        ).then(response => {
            return response.data;
        });
    }
}

export const listsAPI = {

    getLists() {
        return instance.get(
            'lists',
        ).then(response => {
            return response.data;
        });
    },

    getListByUrl(url, page = 1, limit = 2) {
        return instance.get(
            `lists/${url}?page=${page}&limit=${limit}`,
        ).then(response => {
            return response.data;
        });
    },

    createList(name, url) {
        return instance.post(
            'lists/',
            {name: name, url: url}
        ).then(res => {
            return res.data;
        });
    },

    updateList(url, name, newUrl, index = 0) {
        return instance.patch(
            'lists/' + url,
            {name: name, url: newUrl, index: index}
        ).then(res => {
            return res.data;
        });
    },

    deleteList(url) {
        return instance.delete(
            'lists/' + url,
        ).then(res => {
            return res.data;
        });
    },

    addElement(listUrl, prodId) {
        return instance.post(
            'list_elements/' + listUrl,
            {prodId: prodId}
        ).then(res => {
            return res.data;
        });
    },

    deleteElement(listUrl, prodId) {
        return instance.delete(
            `list_elements/${listUrl}/${prodId}`,
            {prodId: prodId}
        ).then(res => {
            return res.data;
        });
    },

}

export const orderApi = {

    getOrders(page = 1, limit = 6) {
        return instance.get(
            `orders?page=${page}&limit=${limit}`,
        ).then(response => {
            return response.data;
        });
    },

    getOrderById(id) {
        return instance.get(
            'orders/' + id,
        ).then(response => {
            return response.data;
        });
    },

    createOrder({name, phone, message, cart, sum}) {
        return instance.post(
            'orders',
            {name: name, phone: phone, message: message, cart: cart, sum: sum}
        ).then(res => {
            return res.data;
        });
    },

    updateOrder(id, {name, phone, message, cart, sum, status}) {
        return instance.patch(
            'orders/' + id,
            {name: name, phone: phone, message: message, cart: cart, sum: sum, status: status}
        ).then(res => {
            return res.data;
        });
    },

    deleteOrder(id) {
        return instance.delete(
            'orders/' + id,
        ).then(res => {
            return res.data;
        });
    },

}

export const sliderApi = {

    getSlides() {
        return instance.get(
            `slider`,
        ).then(response => {
            return response.data;
        });
    },

    createSlide({text, lower_text, img, nav_link}) {

        let formData = new FormData();
        formData.append("img", img);
        formData.append("text", text);
        formData.append("lower_text", lower_text);
        formData.append("nav_link", nav_link);
        return instance.post(
            'slider', formData,
            {headers: {"Content-Type": "multipart/form-data"}},
        ).then(res => {
            return res.data;
        });
    },

    deleteSlide(id) {
        return instance.delete(
            'slider/' + id,
        ).then(res => {
            return res.data;
        });
    },

}

export const textAPI = {

    getAllText() {
        return instance.get(
            'text',
        ).then(response => {
            return response.data;
        });
    },

    getTextByName(name) {
        return instance.get(
            `text/${name}`,
        ).then(response => {
            return response.data;
        });
    },

    createText(name, text, nav_link) {
        return instance.post(
            'text/',
            {name: name, text: text, nav_link: nav_link}
        ).then(res => {
            return res.data;
        });
    },

    updateText(name, text, nav_link) {
        return instance.patch(
            'text/' + name,
            {name: name, text: text, nav_link: nav_link}
        ).then(res => {
            return res.data;
        });
    },

    deleteText(name) {
        return instance.delete(
            'text/' + name,
        ).then(res => {
            return res.data;
        });
    },

}