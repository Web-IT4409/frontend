import React from 'react';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`button ${variant} ${fullWidth ? 'full-width' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button; 