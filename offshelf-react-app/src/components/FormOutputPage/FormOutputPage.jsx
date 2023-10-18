import React, { useState } from 'react';
import {
    Button, Tile, TextInput, NumberInput, DatePickerInput, DatePicker, Modal, Toggle
} from '@carbon/react';
import { Link, useNavigate } from 'react-router-dom';
import sampleImage from '../../assets/sample.jpg';
import { Add, CrossTab, List, TextBold, Close } from '@carbon/icons-react';
const FormOuputPage = () => {
    const [image, saveImage] = useState();
    // const [expiryDate] = useState(new Date());
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [selectedProductType, setSelectedProductType] = useState(''); // to store selected product type
    const [inputValue, setInputValue] = useState('')
    const [quantity, setQuantity] = useState(0);
    // const [inputQty, setInputQty] = useState(quantity);

    const productType = ['Vegetable', 'Fruit', 'Dairy', 'Canned']
    const [formOutputData, setFormOuputData] = useState({
        productName: '',
        productType: '',
        productQuantity: 1,
        productImage: null,
        expiryDate: '',
    });

    const [count, setCount] = useState(0);

    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const handleProdTypeSelection = (category) => {
        setSelectedProductType(category);
    };
    const handleAddProdType = () => {
        if (selectedProductType) {
            setInputValue(selectedProductType);
            setFormOuputData({
                ...formOutputData,
                productType: selectedProductType,
            });
            closeModal();
        }

    };
    const handleTypeChange = (type) => {
        // setInputValue(type.target.value)
        setFormOuputData({
            ...formOutputData,
            productType: type.target.value,
        });
    };
    const handleNameChange = (name) => {
        setFormOuputData({
            ...formOutputData,
            productName: name.target.value,
        });
    };
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
    }
    const handleQuantityChange = (e) => {
        console.log(e.target.value);
        const qty = parseInt(e.target.value, 10);
        if (!isNaN(qty)) {
            setInputQty(qty);
        }
        // setFormOuputData({
        //     ...formOutputData,
        //     quantity,
        // });
    };
    const qtyDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    const qtyIncrement = () => {
        setQuantity(quantity + 1);
    };
    const handleBlur = () => {
        if (inputQty >= 0) {
            setQuantity(inputQty);
        }
    }
    const handleDateChange = (date) => {
        setFormOuputData({
            ...formOutputData,
            expiryDate: date.target.value,
        });
    };

    const decrementCount = () => {
        if (count > 0)
            setCount(count - 1);
    };

    const incrementCount = () => {
        setCount(count + 1);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formOutputData)
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                {/* <CameraInput image={image} saveImage={saveImage}/> */}
                {/* <h4 className='form-title'>Add products</h4> */}
                <div className='container'>
                    <div className='img-container'>
                        <div className='product-img'>
                            <img src={sampleImage} ></img>
                        </div>
                        <div className='button-container'>
                            <Button className='btn-cancel' kind='default' onClick={e => { navigate('/form/camera') }} renderIcon={Close} hasIconOnly ></Button>
                            <Button className='btn-saved' type='submit' onClick={e =>{navigate('/dashboard')} }>Save</Button>
                        </div>
                    </div>
                    <div className='product-name' >
                        {/* <label>Product name</label> */}
                        <br />
                        <br />
                        <TextInput placeholder='Carrot' id='productName' className='productName' value="Carrot"></TextInput>
                    </div>

                    <div className='product-type'>
                        {/* <label>Product type</label> */}
                        {/* <br /> */}
                        <br />
                        <div className='product-sub-type'>
                            <TextInput id='productType' className='productType' placeholder='Vegetable' value="Vegetable"></TextInput>
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
                        <div className='left-text' style={{ color: "skyblue" }}>in 7 days</div>
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
                        <DatePicker datePickerType='single'>
                            <DatePickerInput placeholder='MM/dd/yyyy' value="10/28/2023" className='date'></DatePickerInput>
                        </DatePicker>
                    </div>
                    <br />
                    <br />
                    <h5>Number of days that this item can remain refresh and safe for consumption after purchase or used.</h5>
                    <br />
                    <br />
                </div>
            </form>
        </div>)
}

export default FormOuputPage;
