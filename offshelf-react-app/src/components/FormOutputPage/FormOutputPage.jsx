import React, { useState } from 'react';
import {
    Button, Tile, TextInput, NumberInput, DatePickerInput, DatePicker, Modal, Toggle, ToastNotification, ActionableNotification
} from '@carbon/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import sampleImage from '../../assets/no-image.svg';
import { Add, CrossTab, List, TextBold, Close } from '@carbon/icons-react';
import apiConfig from '../../config/apiConfig.json';
import axios from 'axios';

const FormOuputPage = ({ image, setImage }) => {
    const { name, type, qty, expiry } = useParams();
    // console.log(name, type, qty, expiry);
    const [savedImage, setSavedImage] = useState();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    // const [selectedProductType, setSelectedProductType] = useState(''); // to store selected product type
    const [inputValue, setInputValue] = useState('')
    const [productName, setProductName] = useState(name ? name: 0);
    const [productType, setProductType] = useState(type?type:0);
    const [quantity, setQuantity] = useState(qty? qty: 0);
    const [selectedDate, setSelectedDate] = useState(expiry ? expiry:0);
    const [days] = useState(7);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setErrMsg] = useState();
    // const [inputQty, setInputQty] = useState(quantity)

    const [formOutputData, setFormOuputData] = useState({
        productName: '',
        productType: '',
        productQuantity: 1,
        productImage: null,
        expiryDate: '',
    });

    const [count, setCount] = useState(0);
    const qtyDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    const qtyIncrement = () => {
        setQuantity(quantity + 1);
    };

    const decrementCount = () => {
        if (count > 0)
            setCount(count - 1);
    };

    const incrementCount = () => {
        setCount(count + 1);
    };
    const convertedDate = new Date(selectedDate);
    const dateToEpoch = convertedDate.getTime();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(productName);
        console.log(productType);
        console.log(quantity);
        console.log(dateToEpoch);
        console.log(savedImage);
    };

    const output = async () => {

        try {
            setLoading(true);
            setErrMsg();
            setSuccess(false);
            // setSavedImage(image);
            console.log(image);
            const result = await axios.post(apiConfig.list,
                [{
                    name: productName,
                    type: productType,
                    quantity: quantity,
                    expiry_date: dateToEpoch,
                    image_file: image
                }], { headers: { 'Authorization': "Token " + window.sessionStorage.getItem("token") } });
            setSuccess(true)
            setLoading(false);
        } catch (err) {
            if (await err.response) {
                const str = await Object.values(err.response?.data).join('\n');
                setErrMsg(str);
            }
            else {
                console.log(err);
                setErrMsg("Unexpected error occurred")
            }
            setLoading(false)
        }
    }

    return (
        <div className='container form-output'>
            {/* <form onSubmit={handleSubmit}> */}
            {/* <CameraInput savedImage={savedImage} setSavedImage={setSavedImage}/> */}
            {/* <h4 className='form-title'>Add products</h4> */}
            <div style={{marginTop: '3rem'}} className={success || error ? 'form-container' : 'form-container sign-in-form'}>
                <div className='img-container' style={{margin:'-1rem'}}>
                    <div className='product-img'>
                        <img src={image ? image : sampleImage} ></img>
                    </div>
                    <div className='button-container'>
                        <Button className='btn-cancel' kind='default' onClick={e => { navigate('/form/camera') }} renderIcon={Close} hasIconOnly ></Button>
                        <Button className='btn-saved' disabled={!(productName && productType && quantity && selectedDate)} onClick={() => { output() }}>Save</Button>
                    </div>
                </div>
                <div className='product-name' >
                    {/* <label>Product name</label> */}
                    <br />
                    <br />
                    <TextInput placeholder='Carrot' id='productName' className='productName' value={productName} onChange={e => { setProductName(e.target.value) }}></TextInput>
                </div>

                <div className='product-type'>
                    {/* <label>Product type</label> */}
                    {/* <br /> */}
                    <br />
                    <div className='product-sub-type'>
                        <TextInput id='productType' className='productType' placeholder='Vegetable' value={productType} onChange={e => { setProductType(e.target.value) }}></TextInput>
                    </div>
                </div>

                <div className='product-quantity'>
                    {/* <label className='left-text'>Product quantity</label> */}
                    <br />
                    {/* <br /> */}
                    <div className='quantity'>
                        <p className='left-text'> {quantity} unit
                        </p>
                        {/* <NumberInput className='quantity' value={formOutputData.productQuantity} onChange={handleQuantityChange}></NumberInput> */}
                        <div className='right-btn'>
                            <Button className='buttonMinus' onClick={qtyDecrement} size='sm' kind='ghost'>-</Button>
                            <Button className='buttonPlus' onClick={qtyIncrement} size='sm' kind='ghost'>+</Button>
                        </div>
                    </div>
                </div>
                <br />
                <div className='expiry-container'>
                    {/* <div className='left-container'> */}
                    <div className='inline-text'>
                        <span>Expiry date</span>
                        <span><Toggle defaultToggled id="toggle-1" hideLabel /></span>
                    </div>
                    {/* <br /> */}
                    <div className='left-text' style={{ color: "skyblue" }} >in {days} days</div>
                    {/* </div> */}
                    {/* <div className='right-container'>
                            <Toggle defaultToggled id="toggle-1" hideLabel />
                        </div> */}
                </div>
                <br />
                <h5>Keep track of the days from the selected date</h5>
                <br />
                <div className='shelf-container'>
                    <div className='left-text'>
                        Shelf life
                    </div>
                    <div className='right-container'>
                        <Toggle defaultToggled id="toggle-1" hideLabel />
                    </div>
                </div>
                <br />
                <div className='days-container'>
                    <p className='left-text'>{count} days</p>
                    <div className='right-btn'>
                        <Button className='buttonMinus' onClick={decrementCount} size='sm' kind='ghost'>-</Button>
                        <Button className='buttonPlus' onClick={incrementCount} size='sm' kind='ghost'>+</Button>
                    </div>
                </div>
                <br />
                <div className='product-expiry'>
                    {/* <label>Date expiry</label> */}
                    {/* <br /> */}
                    {/* <br /> */}
                    <DatePicker datePickerType='single' dateFormat='d/m/Y' onChange={e => { setSelectedDate(e) }}  >
                        <DatePickerInput placeholder='dd/MM/yyyy' className='date' ></DatePickerInput>
                    </DatePicker>
                </div>
                <br />
                <br />
                <h5>Number of days that this item can remain refresh and safe for consumption after purchase or used.</h5>
                <br />
                <br />
            </div>
            {/* </form> */}
            {success && <ActionableNotification actionButtonLabel="Continue" onCloseButtonClick={() => { setSuccess(); navigate('/dashboard') }} role="status" title="Success" subtitle="Product is added!" kind="success" lowContrast={true} onActionButtonClick={() => { navigate('/dashboard') }} />}
            {error && <ToastNotification onCloseButtonClick={() => setErrMsg()} role="status" title="Error" subtitle={error} kind="error" lowContrast={true} />}
        </div>)
}

export default FormOuputPage;