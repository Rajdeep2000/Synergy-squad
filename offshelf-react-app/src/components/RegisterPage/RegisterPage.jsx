import React, { useState } from 'react';
import {
    Button, FluidForm, TextInput, Tile, Checkbox, PasswordInput, ToastNotification, ActionableNotification, Loading
} from '@carbon/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '@carbon/icons-react';
import apiConfig from '../../config/apiConfig.json';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(true);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setErrMsg] = useState();
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const register = async () => {
        try {
            setLoading(true);
            setErrMsg();
            setSuccess(false);
            const result = await axios.post(apiConfig.register, {
                username: userName,
                email: email,
                password: password
            });
            setSuccess(true)
            setLoading(false);
        } catch (err) {
            if (await err.response) {
                const str = await Object.values(err.response?.data).join('\n');
                setErrMsg(str);
            }
            else {
                setErrMsg("Unexpected error occurred")
            }
            setLoading(false)
        }
    }

    return (
        <div className='container'>
            {/* <CameraInput image={image} saveImage={saveImage}/> */}
            <div className={success || error ? 'form-container sign-in-form overlay' : 'form-container sign-in-form'}>
                {/*  <div className='form-header'>

                </div> */}
                <div className='form-title'>
                    {/* <Button className='arrowLeft' onClick={e => navigate("/login")} size='sm' kind='ghost' renderIcon={ArrowLeft}></Button> */}
                    <h5 className='form-title'>Create Account</h5>
                </div>
                {loading && <Loading/>}
                <FluidForm>
                    <TextInput type="text" labelText="Username" id="username" placeholder='Your username' onChange={e => { setUserName(e.target.value) }} />
                    <br />
                    <br />
                    <TextInput type="email" labelText="Email" id="email" placeholder='Your email' onChange={e => { setEmail(e.target.value) }} />
                    <br />
                    <br />
                    <PasswordInput type="password" labelText="Password" id="password"
                        placeholder='6+ character' onChange={e => { setPassword(e.target.value) }} />
                    <br />
                    <div className='login-options'>
                        <Checkbox id="remember" checked={checked} onClick={() => { setChecked(!checked) }} labelText={`I accept the term and privacy policy?`} className="remember-me" />
                    </div>
                    <br /><br />
                    <div className='sign-in-btn'>
                        <Button disabled={!(checked && email && userName && email)} onClick={() => { register() }} style={{ borderRadius: '50px' }}>Sign up</Button>
                    </div>
                    <br /><br />
                    <div className='custom-divider'>
                        <p className='text-options'>or sign in with </p>
                    </div>
                    <br /><br />
                    <div className='google-btn'>
                        <Button disabled={!(checked && email && userName && email)} type='button' style={{ borderRadius: '50px' }}>Sign in with Google</Button> </div>
                    <br /><br />
                    <h5 className='text-options'> Already have an account <Link inline href="/login" onClick={e => { navigate("/login") }} > Sign In</Link>
                    </h5>
                </FluidForm>

            </div>
            {success && <ActionableNotification actionButtonLabel="Continue" onCloseButtonClick={() => { setSuccess(); navigate('/login') }} role="status" title="Success" subtitle="Your account has been created" kind="success" lowContrast={true} onActionButtonClick={() => { navigate('/dashboard') }} />}
            {error && <ToastNotification onCloseButtonClick={() => setErrMsg()} role="status" title="Error" subtitle={error} kind="error" lowContrast={true} />}

        </div>)
}

export default RegisterPage;
