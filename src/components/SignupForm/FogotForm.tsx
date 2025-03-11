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
    sendPinCode: () => void;
    onHavingAccount: () => void;
}

const FogotForm: React.FC<SignupFormProps> = ({ sendPinCode, onHavingAccount }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema)
    });

    return (
        <form onSubmit={handleSubmit(sendPinCode)} className="signup-form">
            
            <p className="header-lor">Your email or numberphone <i className="fa-solid fa-circle-question"></i></p>
            <FormInput
                type="text"
                placeholder="Email address or phone number"
                error={errors.emailOrPhone?.message}
                {...register('emailOrPhone')}
            />

            <Button type="submit" fullWidth
                    onClick={sendPinCode}>
                Send pin code
            </Button>

            <hr className="divider" />

            <Button
                type="button"
                variant="secondary"
                onClick={onHavingAccount}
                className="create-account-btn"
            >
                Login by password
            </Button>
        </form>
    );
};

export default FogotForm; 