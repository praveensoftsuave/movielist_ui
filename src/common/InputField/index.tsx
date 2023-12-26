import React from "react";
import "./styles.css";

type Tprops = {
  value: string;
  placeholder: string;
  register?: any;
  type?: string;
  name?: string;
  disabled?: boolean;
  variant?:string;
  error?:string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInputField: React.FC<Tprops> = ({
  register,
  name,
  value,
  type,
  disabled,
  placeholder,
  variant,
  error,
  ...props
}) => {
  return (
    <div>
    <input
      className={`input-wrap ${variant}`}
      autoComplete="off"
      {...register}
      placeholder={placeholder}
      value={value}
      {...props}
      disabled={disabled}
    />
    {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default TextInputField;
