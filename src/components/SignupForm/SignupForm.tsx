import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@components/Button/Button';
import FormInput from '@components/FormInput/FormInput';
import './SignupForm.scss';

const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    gender: z.string().min(1, 'Gender is required'),
    dob: z.string().min(1, 'Date of birth is required'),
    emailOrPhone: z.string().min(1, 'Email or phone number is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
    onSubmit: (data: SignupFormData) => void;
    onHavingAccount: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, onHavingAccount }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema)
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            <FormInput
                type="text"
                placeholder="Full Name"
                error={errors.name?.message}
                {...register('emailOrPhone')}
            />
            <p className="header-lor">Date of Birth <i className="fa-solid fa-circle-question"></i></p>
            <FormInput
                type="date"
                placeholder="DoB"
                error={errors.dob?.message}
                {...register('emailOrPhone')}
            />
            <p className="header-lor">Gender <i className="fa-solid fa-circle-question"></i></p>
            <div className="gender-options">
                <label className="radi">
                    <input type="radio" id="female" name="gender"/>
                    <span className="gender">Female</span>
                </label>
                <label className="radi">
                    <input type="radio" id="female" name="gender"/>
                    <span className="gender">Male</span>
                </label>
                <label className="radi">
                    <input type="radio" id="female" name="gender"/>
                    <span className="gender">Other</span>
                </label>
            </div>
            
            <p className="header-lor">Account <i className="fa-solid fa-circle-question"></i></p>
            <FormInput
                type="text"
                placeholder="Email address or phone number"
                error={errors.emailOrPhone?.message}
                {...register('emailOrPhone')}
            />

            <FormInput
                type="password"
                placeholder="Password"
                error={errors.password?.message}
                {...register('password')}
            />

            <Button type="submit" fullWidth>
                Create new account
            </Button>

            <hr className="divider" />

            <Button
                type="button"
                variant="secondary"
                onClick={onHavingAccount}
                className="create-account-btn"
            >
                Having an account
            </Button>
        </form>
    );
};

export default SignupForm; 