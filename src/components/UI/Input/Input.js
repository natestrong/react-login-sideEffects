import classes from './Input.module.css';
import {useRef} from 'react';

function Input(props) {
    const inputRef = useRef();
    props.focus[props.id] = () => inputRef.current.focus();

    return (
        <div className={`${classes.control} ${!props.isValid ? classes.invalid : ''}`}>
            <label htmlFor='props.id'>{props.label}</label>
            <input ref={inputRef}
                   type={props.type}
                   id={props.id}
                   value={props.value}
                   onChange={props.onChange}
                   onBlur={props.onBlur}
            />
        </div>
    );
}

export default Input;
