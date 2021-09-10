import React, {useContext, useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function emailReducer(state, action) {
    switch (action.type) {
        case 'USER_INPUT':
            return {value: action.payload, isValid: isValidEmail(action.payload)};
        case 'INPUT_BLUR':
            return {value: state.value, isValid: isValidEmail(state.value)};
        default:
            return {value: '', isValid: false};
    }
}

function passwordReducer(state, action) {
    switch (action.type) {
        case 'USER_INPUT':
            return {value: action.payload, isValid: action.payload.length > 6};
        case 'INPUT_BLUR':
            return {value: state.value, isValid: state.value.length > 6};
        default:
            return {value: '', isValid: false};
    }
}

const Login = () => {
    const authContext = useContext(AuthContext);

    const [formIsValid, setFormIsValid] = useState(false);
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});
    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});

    const {isValid: isValidEmail} = emailState;
    const {isValid: isValidPassword} = passwordState;

    useEffect(() => {
        setFormIsValid(isValidEmail && isValidPassword);
    }, [isValidEmail, isValidPassword]);

    const emailChangeHandler = (event) => {
        dispatchEmail({type: 'USER_INPUT', payload: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({type: 'USER_INPUT', payload: event.target.value});
    };

    const emailBlurHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR'});
    };

    const passwordBlurHandler = () => {
        dispatchPassword({type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        authContext.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor='email'>E-Mail</label>
                    <input
                        type='email'
                        id='email'
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type='submit'
                            className={classes.btn}
                            disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
