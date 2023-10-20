import React, { useState } from 'react';
import {
    Button, ClickableTile, FluidForm, TextInput, Tile, Checkbox, PasswordInput, ToastNotification, ActionableNotification, Loading
} from '@carbon/react';
import Webcam from "react-webcam";
import CameraInput from '../CameraInput';
import { Link, useNavigate } from 'react-router-dom';
import apiConfig from '../../config/apiConfig.json';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(true);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setErrMsg] = useState();
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const login = async () => {
        try {
            // const {data:result} = axios.post()

            setLoading(true);
            setErrMsg();
            setSuccess(false);
            const result = await axios.post(apiConfig.login, {
                username: userName,
                password: password
            });
            window.sessionStorage.setItem("token", result?.data?.token);
            setSuccess(true)
            setLoading(false);
        }
        catch (err) {
            if (await err.response) {
                console.log(await err.response)
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
            {loading && <Loading />}
            <div className={success || error ? 'form-container sign-in-form overlay' : 'form-container sign-in-form'}>
                {/* <CameraInput image={image} saveImage={saveImage}/> */}
                {/* <div className='tiles-container'> */}
                <h5 className='form-title'>Sign in</h5>
                <FluidForm>
                    <TextInput type="text" labelText="Username" id="email" placeholder='Your username' onChange={e => { setUserName(e.target.value) }} />
                    <br />
                    <br />
                    <PasswordInput type="password" labelText="Password" id="password" len
                        placeholder='6+ character' minLength={6} onChange={e => { setPassword(e.target.value) }} />
                    <br />
                    <div className='login-options'>
                        <Checkbox id="remember-login" checked={checked} onClick={() => { setChecked(!checked) }} labelText={`Remember me?`} className="remember-me" />
                        <h5 className='forgot-pwd'>Forgot password?</h5>
                    </div>
                    <br /><br />
                    <div className='sign-in-btn'>
                        <Button style={{ borderRadius: '50px' }} disabled={!(userName && password)} onClick={() => { login() }} >Sign in</Button>
                    </div>
                    <br /><br />
                    <div className='custom-divider'>
                        <p className='text-options'>or sign in with </p>
                    </div>
                    <br /><br />
                    <div className='google-btn'>
                        <Button type='button' style={{ borderRadius: '50px' }}>Sign in with Google</Button> </div>
                    <br /><br />
                    <h5 className='text-options'> Don't have an account? <Link href="register" onClick={e => { navigate('/register') }}> Sign Up</Link>
                    </h5>
                </FluidForm>
                {/* </div> */}
            </div>
            {success && <ActionableNotification actionButtonLabel="Continue" onCloseButtonClick={() => { setSuccess(); navigate('/dashboard') }} role="status" title="Success" subtitle="Successfully logged in" kind="success" lowContrast={true} onActionButtonClick={() => { navigate('/dashboard') }} />}
            {error && <ToastNotification onCloseButtonClick={() => setErrMsg()} role="status" title="Error" subtitle={error} kind="error" lowContrast={true} />}
        </div>)
}

export default LoginPage;