import React from 'react';

function ProductPage(props) {

    // let pr = useParams();
    // console.log(JSON.stringify(pr));
    return (<div>
                <div>PRODUCT</div>
                {props.prodId}
                <p>{props.productData.name}</p>
        </div>
    );
}

export default ProductPage;