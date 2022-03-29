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
        if (!selectedPhotos) {
            alert("No photos :(");
        } else addPhotos(prodId, selectedPhotos, values.mainColor, values.pillColor)
    }

    const onPhotoDelete = (photosId) => {
        deletePhotos(prodId, photosId[0]);
    }

    const PhotosItem = ({imagesItem}) => {
        return <div className={s.images_list_item} >
            <div className={list.photoBox}>
                {imagesItem.pathArr.map(p=>{
                    return  <a key={p} target="_blank" rel="noopener noreferrer" href={p}>
                        <img className={list.photo} src={p} alt="photo"/>
                    </a>
                })}
            </div>
            <p className={s.color_name} >{imagesItem.mainColor['ua']}</p>
            <p className={s.color_name} >{imagesItem.pillColor['ua']}</p>
        </div>
    }

    return (
        <div className={s.photoPane}>
            <p style={{fontSize: "1.5rem"}} >Add Photos</p>
            <input type="file" name="pathArr" onChange={onPhotoSelected} multiple />
            <PhotoForm onSubmit={onSubmit}/>
            <ItemsListC items={images} deleteItems={onPhotoDelete} >
                {imagesItem => <PhotosItem imagesItem={imagesItem}/>}
            </ItemsListC>
        </div>
    );
}

export default PhotosPane;