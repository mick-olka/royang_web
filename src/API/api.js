import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.1.162:7500',
    headers: {

    },
});

export const productsAPI = {

    getProducts () {
        return instance.get(
            'products',
        ).then(response => {
            return response.data;
        });
    },

    getProductById (id) {
        return instance.get(
            'products/'+id,
        ).then(response => {
            return response.data;
        });
    },

    createProduct ({name, code, price, oldPrice, features}) {
        return instance.post(
            'products',
            { name: name, code: code, price: price, oldPrice: oldPrice, features: features }
        ).then(res => {
            return res.data;
        });
    },

    updateProduct (id, {name, code, price, figures, features,
                       images, relatedProducts, similarProducts}) {
        return instance.patch(
            'products/'+id,
            { name: name, code: code, price: price,
                figures: figures, features: features,
                images: images, relatedProducts:
                relatedProducts, similarProducts: similarProducts }
        ).then(res => {
            return res.data;
        });
    },

    deleteProduct (id) {
        return instance.delete(
            'products/'+id,
        ).then(res => {
            return res.data;
        });
    }

}

export const photosAPI = {

    setThumbnail (id, file) {
        let formData = new FormData();
        formData.append("thumbnail", file);
        return instance.post(
            'photos/thumbnail/'+id, formData,
            {headers: {"Content-Type": "multipart/form-data"} },
        ).then(response => {
            return response.data;
        });
    },

    addPhoto (id, file, mainColor, pillColor) {
        let formData = new FormData();
        formData.append("path", file);
        formData.append("mainColor", mainColor);
        formData.append("pillColor", pillColor);
        return instance.post(
            'photos/'+id, formData,
            {headers: {"Content-Type": "multipart/form-data"} },
        ).then(response => {
            return response.data;
        });
    },

    deletePhoto (id, photoId) {
        return instance.delete(
            `photos/${id}/${photoId}`,
        ).then(response => {
            return response.data;
        });
    },

}

export const adminAPI = {

    setAuth (password) {
        return instance.post(
            'admin/login',
            {data: password}
        ).then(response => {
            return response.data;
        });
    },

    getAuth () {
        return instance.get(
            'admin/login/check',
        ).then(response => {
            return response.data;
        });
    },

    changePW (password, oldPassword) {
        return instance.post(
            'admin/login/pw',
            {data: password, oldData: oldPassword}
        ).then(response=>{
            return response.data;
        })
    },

    deleteAuth () {
        return instance.delete(
            'admin/login',
        ).then(response => {
            return response.data;
        });
    }
}

export const listsAPI = {

    getLists () {
        return instance.get(
            'lists',
        ).then(response => {
            return response.data;
        });
    },

    getListByUrl (url) {
        return instance.get(
            'lists/'+url,
        ).then(response => {
            return response.data;
        });
    },

    createList (name, url) {
            return instance.post(
                'lists/',
                { name: name, url: url }
            ).then(res => {
                return res.data;
            });
    },

    updateList (url, name, newUrl) {
        return instance.patch(
            'lists/'+url,
            { name: name, url: newUrl }
        ).then(res => {
            return res.data;
        });
    },

    deleteList (url) {
        return instance.delete(
            'lists/'+url,
        ).then(res => {
            return res.data;
        });
    },

    addElement (listUrl, prodId) {
        return instance.post(
           'list_elements/'+listUrl,
            {prodId: prodId}
        ).then(res => {
            return res.data;
        });
    },

    deleteElement (listUrl, prodId) {
        return instance.delete(
            `list_elements/${listUrl}/${prodId}`,
            {prodId: prodId}
        ).then(res => {
            return res.data;
        });
    },

}