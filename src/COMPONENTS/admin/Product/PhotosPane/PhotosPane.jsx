import React from 'react';
import PhotoForm from "./PhotoForm";
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

    const onPhotoDelete = (photoIdsArr) => {
        // let photoIdsArr = [];
        // for (let i = 0; i < photoIdArr.length; i++) {
        //     // let photo = photos.find(p => p._id === photoIdArr[i]);
        //     // if (photo) {
        //         photoIdsArr.push(photo._id);
        //     // }
        // }
        deletePhotos(prodId, photoIdsArr);
    }

    const PhotoItem = ({photo}) => {
        return <div>
            <div className={list.photoBox}>
                <a target="_blank" rel="noreferrer" href={photo.src}>
                    <img className={list.photo} src={photo.src} alt="product"/>
                </a>
            </div>
            <p>{photo.mainColor}</p>
            <p>{photo.pillColor}</p>
        </div>
    }

    return (
        <div className={s.photoPane}>
            <p>photo</p>
            <input type="file" onChange={onPhotoSelected}/>
            <PhotoForm onSubmit={onSubmit}/>
            <ItemsList items={photos} deleteItems={onPhotoDelete}>
                {photo => <PhotoItem photo={photo}/>}
            </ItemsList>
        </div>
    );
}

export default PhotosPane;