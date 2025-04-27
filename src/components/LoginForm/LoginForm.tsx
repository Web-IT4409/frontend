import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@components/Button/Button';
import FormInput from '@components/FormInput/FormInput';
import './LoginForm.scss';

const loginSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
    onCreateAccount: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onCreateAccount }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <FormInput
                type="text"
                placeholder="Username"
                error={errors.username?.message}
                {...register('username')}
            />

            <FormInput
                type="password"
                placeholder="Password"
                error={errors.password?.message}
                {...register('password')}
            />

            <Button type="submit" fullWidth>
                Log in
            </Button>

            <a href="/fogot-pass" className="forgot-password">
                Forgotten password?
            </a>

            <hr className="divider" />

            <Button
                type="button"
                variant="secondary"
                onClick={onCreateAccount}
                className="create-account-btn"
            >
                Create new account
            </Button>
        </form>
    );
};

export default LoginForm;