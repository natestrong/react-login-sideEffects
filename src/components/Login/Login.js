import React, {useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

function isValidEmail(email) {
    const c = /\S+@\S+\.\S+/.test(email);
    console.log(email, c);
    return /\S+@\S+\.\S+/.test(email);
}

function emailReducer(state, action) {
    switch (action.type) {
        case 'USER_INPUT':
            return {value: action.payload, isValid: isValidEmail(action.payload)};
        case 'INPUT_BLUR':
            console.log('BLUR');
            return {value: state.value, isValid: isValidEmail(state.value)};
        default:
            return {value: '', isValid: false};
    }
}

function passwordReducer(state, action) {
    switch (action.type) {
        case 'USER_INPUT':
            return {value: action.payload, isValid: action.payload > 6};
        case 'INPUT_BLUR':
            console.log('BLUR');
            return {value: state.value, isValid: isValidEmail(state.value)};
        default:
            return {value: '', isValid: false};
    }
}

const Login = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});
    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});

    const emailChangeHandler = (event) => {
        dispatchEmail({type: 'USER_INPUT', payload: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({type: 'USER_INPUT', payload: event.target.value});

        setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6
        );
    };

    const emailBlurHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR'});
    };

    const passwordBlurHandler = () => {
        dispatchPassword({type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
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
