import React from 'react';
import PhotoForm from "./PhotoForm";
import {MainContextConsumer} from "../../../../UTILS/mainContext";
import list from "../../ItemsList/ItemsList.module.css";
import ItemsList from "../../ItemsList/ItemsList";
import s from "./PhotosPane.module.css";

function PhotosPane({photos, prodId, addPhoto, deletePhotos}) {

    let photo = null;

    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            photo = e.target.files[0];
        }
    }

    const onSubmit = (values) => {
        //console.log(values, photo);
        addPhoto(prodId, photo, values.mainColor, values.pillColor)
    }

    const onPhotoDelete = (photoIdArr) => {
        let fileNameArr=[];
        for (let i=0; i<photoIdArr.length; i++) {
            let photo = photos.find(p => p._id===photoIdArr[i]);
            if (photo) {
                fileNameArr.push(photo.path.split('/').pop());
            }
        }
        deletePhotos(prodId, fileNameArr);
    }

    const PhotoItem = ({photo}) => {
        return <MainContextConsumer>
            {context => (
                <>
                    <div className={list.photoBox}>
                        <a target="_blank" rel="noreferrer" href={context.apiURL + photo.path}><img className={list.photo} src={context.apiURL + photo.path} alt="product"/></a>
                    </div>
                    <p>{photo.mainColor}</p>
                    <p>{photo.pillColor}</p>
                </>)}
        </MainContextConsumer>
    }

    return (
        <div className={s.photoPane}>
            <p>photo</p>
            <input type="file" onChange={onPhotoSelected} />
        <PhotoForm onSubmit={onSubmit} />
        <ItemsList items={photos} deleteItems={onPhotoDelete} >
            {photo=> <PhotoItem photo={photo} />}
        </ItemsList>
        </div>
    );
}

export default PhotosPane;