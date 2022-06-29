import * as axios from "axios";
import global_data from "../REDUX/global_data";

// export const apiURL = 'http://192.168.0.113:7500/';
export const apiURL = 'https://rotang.biz/api/';
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
            `products?page=${page}&limit=${limit}&isAdmin=true`,
        ).then(response => {
            return response.data;
        });
    },

    getProductById(id) {
        return instance.get(
            `products/${id}?isAdmin=true`,
        ).then(response => {
            return response.data;
        });
    },

    createProduct(productData) {
        return instance.post(
            'products',
            {...productData}
        ).then(res => {
            showPopup('Created');
            return res.data;
        });
    },

    updateProduct(id, formData) {
        return instance.patch(
            'products/' + id,
            {...formData}
        ).then(res => {
            showPopup('Updated');
            return res.data;
        });
    },

    deleteProduct(id) {
        return instance.delete(
            'products/' + id,
        ).then(res => {
            showPopup('Deleted');
            return res.data;
        });
    },

    findProducts(str = "", page = 1, limit = 2, locale="ua") {
        return instance.get(
            `products?str=${str}&page=${page}&limit=${limit}&locale=${locale}&isAdmin=true`,
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
            showPopup('Updated');
            return response.data;
        });
    },

    addPhotos(id, files, mainColor, pillColor) {
        let formData = new FormData();
        //formData.append("pathArr", files);
        for (let i = 0; i < files.length; i++) {
            formData.append('pathArr', files[i]);
        }
        formData.append("mainColorUA", mainColor['ua']);
        formData.append("mainColorRU", mainColor['ru']);
        formData.append("pillColorUA", pillColor['ua']);
        formData.append("pillColorRU", pillColor['ru']);
        return instance.post(
            'photos/' + id, formData,
            {headers: {"Content-Type": "multipart/form-data"}},
        ).then(response => {
            showPopup('Added');
            return response.data;
        });
    },

    deletePhotos(id, photosId) {
        return instance.delete(
            `photos/${id}/${photosId}`,
        ).then(response => {
            showPopup('Deleted');
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
            showPopup('Changed');
            return response.data;
        })
    },

    deleteAuth() {
        return instance.delete(
            'admin/login',
        ).then(response => {
            return response.data;
        });
    },
    makeBackup() {
        return instance.get(
            'make_backup',
        ).then(response => {
            showPopup('Backup Made');
            return response.data;
        });
    },
    restoreBackup() {
        return instance.get(
            'restore_backup',
        ).then(response => {
            showPopup('Backup Restored');
            return response.data;
        });
    }
}

export const listsAPI = {

    getLists() {
        return instance.get(
            'lists?isAdmin=true',
        ).then(response => {
            return response.data;
        });
    },

    getListByUrl(url, page = 1, limit = global_data.page_limit) {
        return instance.get(
            `lists/${url}?page=${page}&limit=${limit}&isAdmin=true`,
        ).then(response => {
            return response.data;
        });
    },

    createList(formData) {
        return instance.post(
            'lists/',
            {...formData}
        ).then(res => {
            showPopup('Created');
            return res.data;
        });
    },

    updateList(url, dat) {
        return instance.patch(
            'lists/' + url,
            {name: dat.name, url: dat.url, index: dat.index, description: dat.description, keywords: dat.keywords}
        ).then(res => {
            showPopup('Updated');
            return res.data;
        });
    },

    deleteList(url) {
        return instance.delete(
            'lists/' + url,
        ).then(res => {
            showPopup('Deleted');
            return res.data;
        });
    },

    addElement(listUrl, prodId) {
        return instance.post(
            'list_elements/' + listUrl,
            {prodId: prodId}
        ).then(res => {
            showPopup('Added');
            return res.data;
        });
    },

    deleteElement(listUrl, prodId) {
        return instance.delete(
            `list_elements/${listUrl}/${prodId}`,
            {prodId: prodId}
        ).then(res => {
            showPopup('Deleted');
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
            {name: name, text: {ua: text, ru: text+" ru"}, nav_link: nav_link}
        ).then(res => {
            showPopup('Created');
            return res.data;
        });
    },

    updateText(name, text, nav_link) {
        return instance.patch(
            'text/' + name,
            {name: name, text: text, nav_link: nav_link}
        ).then(res => {
            showPopup('Updated');
            return res.data;
        });
    },

    deleteText(name) {
        return instance.delete(
            'text/' + name,
        ).then(res => {
            showPopup('Deleted');
            return res.data;
        });
    },

}
