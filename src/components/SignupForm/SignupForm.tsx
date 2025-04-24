import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@components/Button/Button';
import FormInput from '@components/FormInput/FormInput';
import './SignupForm.scss';

const signupSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    gender: z.enum(['Female', 'Male', 'Other'], { required_error: 'Gender is required' }),
    dob: z.string().min(1, 'Date of birth is required'),
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
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

    console.log('Validation errors:', Object.keys(errors).length > 0 ? errors : 'No validation errors');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            <FormInput
                type="text"
                placeholder="First Name"
                error={errors.firstName?.message}
                {...register('firstName')}
            />
            <FormInput
                type="text"
                placeholder="Last Name"
                error={errors.lastName?.message}
                {...register('lastName')}
            />
            <p className="header-lor">Date of Birth <i className="fa-solid fa-circle-question"></i></p>
            <FormInput
                type="date"
                placeholder="DoB"
                error={errors.dob?.message}
                {...register('dob')}
            />
            <p className="header-lor">Gender <i className="fa-solid fa-circle-question"></i></p>
            <div className="gender-options">
                <label className="radi">
                    <input
                        type="radio"
                        value="Female"
                        {...register('gender')}
                    />
                    <span className="gender">Female</span>
                </label>
                <label className="radi">
                    <input
                        type="radio"
                        value="Male"
                        {...register('gender')}
                    />
                    <span className="gender">Male</span>
                </label>
                <label className="radi">
                    <input
                        type="radio"
                        value="Other"
                        {...register('gender')}
                    />
                    <span className="gender">Other</span>
                </label>
            </div>
            {errors.gender && <p className="error-message">{errors.gender.message}</p>}

            <p className="header-lor">Account <i className="fa-solid fa-circle-question"></i></p>
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