import React from 'react';
import './FormInput.scss';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="form-input-wrapper">
            <input
                className={`form-input ${error ? 'error' : ''} ${className}`}
                {...props}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default FormInput; 