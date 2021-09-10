import React, {useContext, useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function emailReducer(state, action) {
    switch (action.type) {
        case 'USER_INPUT':
            return {
                value: action.payload,
                isValid: isValidEmail(action.payload),
                touched: true
            };
        case 'INPUT_BLUR':
            return {
                value: state.value,
                isValid: isValidEmail(state.value),
                touched: true
            };
        default:
            return {
                value: '',
                isValid: false,
                touched: false
            };
    }
}

function passwordReducer(state, action) {
    switch (action.type) {
        case 'USER_INPUT':
            return {
                value: action.payload,
                isValid: action.payload.length > 6,
                touched: true
            };
        case 'INPUT_BLUR':
            return {
                value: state.value,
                isValid: state.value.length > 6,
                touched: true
            };
        default:
            return {
                value: '',
                isValid: false,
                touched: false
            };
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

    const focusChildren = {
        email: () => {
        },
        password: () => {
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authContext.onLogin(emailState.value, passwordState.value);
        } else if (!isValidEmail) {
            focusChildren.email();
        } else {
            focusChildren.password();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    label='E-Mail'
                    type='email'
                    id='email'
                    isValid={!emailState.touched || isValidEmail}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    focus={focusChildren}
                />
                <Input
                    label='Password'
                    type='password'
                    id='password'
                    isValid={!passwordState.touched || isValidPassword}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    focus={focusChildren}
                />
                <div className={classes.actions}>
                    <Button type='submit'
                            className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
