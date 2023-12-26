import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"
import TextField from '@mui/material/TextField';
import { get, isString } from "lodash"
import './styles.css'


export type InputType = {
    name: string;
    placeholder?: string;
    rules?: any;
    disabled?: boolean;
    className?: string;
    type?: string;
}

const Input: FC<InputType> = ({ name, placeholder, rules, disabled, className = "", type = "text", ...rest }) => {

    const { control, formState: { errors } } = useFormContext()


    const error = get(errors, `${name}.message`, "")

    return (
        <div className='input-container'>
            <Controller
                name={name}
                control={control}
                rules={{ ...rules }}
                render={({ field }) => {
                    return (
                        <TextField
                            type={type}
                            className={`${className} ${error ? 'error-box' : ''}`}
                            placeholder={placeholder}
                            error={Boolean(error)}
                            helperText={isString(error) && error}
                            {...field}
                            {...rest}
                        />
                    )
                }}
            />
        </div >
    )
}

export default Input;