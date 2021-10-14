import React from 'react';
import PhotoForm from "./PhotoForm";
import list from "../../ItemsList/ItemsList.module.css";
import s from "./PhotosPane.module.css";
import ItemsListC from "../../ItemsList/ItemsListC";

function PhotosPane({images, prodId, addPhotos, deletePhotos}) {

    let selectedPhotos = null;

    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            selectedPhotos = e.target.files;
        }
    }

    const onSubmit = (values) => {
        //console.log(values, photo);
        addPhotos(prodId, selectedPhotos, values.mainColor, values.pillColor)
    }

    const onPhotoDelete = (photosId) => {
        deletePhotos(prodId, photosId[0]);
    }

    const PhotosItem = ({imagesItem}) => {
        return <div>
            <div className={list.photoBox}>
                {imagesItem.pathArr.map(p=>{
                    return  <a key={p} target="_blank" rel="noreferrer" href={p}>
                        <img className={list.photo} src={p} alt="product"/>
                    </a>
                })}
            </div>
            <p>{imagesItem.mainColor}</p>
            <p>{imagesItem.pillColor}</p>
        </div>
    }

    return (
        <div className={s.photoPane}>
            <p>photo</p>
            <input type="file" name="pathArr" onChange={onPhotoSelected} multiple />
            <PhotoForm onSubmit={onSubmit}/>
            <ItemsListC items={images} deleteItems={onPhotoDelete} >
                {imagesItem => <PhotosItem imagesItem={imagesItem}/>}
            </ItemsListC>
        </div>
    );
}

export default PhotosPane;