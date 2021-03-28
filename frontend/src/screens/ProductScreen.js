import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import {detailsProduct} from '../actions/productActions';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, products} = productDetails;
   
    useEffect(()=> {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId] );
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    return (
        <div>
              {loading ? <LoadingBox></LoadingBox>
              :
              error?<MessageBox variant="danger">{error}</MessageBox>
              : (
                <div>
                <Link to="/">Back to results</Link>
               <div className="row top">
                   <div className="col-2">
                       <img className="large" src={products.image} alt={products.name}></img>
                   </div>
                   <div className="col-1">
                       <ul>
                           <li><h1>{products.name}</h1></li>
                           <li><Rating rating={products.rating} numReviews={products.name}></Rating></li>
                           <li>Price: ${products.price}</li>
                           <li>Description:
                               <p>{products.description}</p>
                           </li>
                       </ul>
                   </div>
                   <div className="col-1">
                       <div className="card card-body">
                           <ul>
                               <li>
                                   <div className="row">
                                       <div>Price</div>
                                       <div className="price">${products.price}</div>
                                   </div>
                                </li>
                                <li>
                                   <div className="row">
                                       <div>Status</div>
                                       <div>
                                           {products.countInStock > 0 ? (<span className="success">In Stock</span>) : (<span className="danger">Unavailable</span>)}
                                        </div>
                                   </div>
                                </li>
                                {products.countInStock > 0 && (
                                    <>
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(products.countInStock).keys()].map((x) => (
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                   <button className="primary block" onClick={addToCartHandler}>Add to Cart</button>
                                </li>
                                    </>
                                )}
                           </ul>
                       </div>
                   </div>
               </div>
               </div>
              )};
         </div>
    )
}