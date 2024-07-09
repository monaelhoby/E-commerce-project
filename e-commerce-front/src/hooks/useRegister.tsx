import { useEffect } from 'react';
import {useForm, SubmitHandler} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { useNavigate } from 'react-router-dom';

import {formOrops, registerationSchema} from '@validation/register';
import useCheckEmailAvailability from '@hooks/useCheckEmailAvaliability';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import authRegister from '@store/auth/actions/register';
import { resetUi } from '@store/auth/authSlice';

const UseRegister = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {error, loading} = useAppSelector(state => state.authRegisterSlice)

    const {register, handleSubmit, formState: {errors }, getFieldState, trigger} = useForm<formOrops>(
        {mode: 'onBlur', resolver: zodResolver(registerationSchema)}
    )

    const {
      emailAvailabilityStatus, 
      enteredEmail, 
      checkEmailAvailability, 
      resetCheckEmailAvailability
    } = useCheckEmailAvailability()

    const onSubmit: SubmitHandler<formOrops> = (data) => {
        const {firstName, lastName, email, password} = data
        dispatch(authRegister({firstName, lastName, email, password})).unwrap().then(() => navigate("/login?message=account_created"))
    }

    const emailOnBlurHandler = async (e : React.FocusEvent<HTMLInputElement>) => {
        await trigger('email') // validation through writting
        const value = e.target.value
        const {isDirty, invalid} = getFieldState('email')
        if (isDirty && !invalid && enteredEmail !== value) {
            checkEmailAvailability(value)
        }
        if (isDirty && invalid && enteredEmail) {
            resetCheckEmailAvailability()
        }
    }

    useEffect(() => {
        return () => {
            dispatch(resetUi())
        }
    }, [dispatch])
  return {emailAvailabilityStatus, 
    enteredEmail, 
    checkEmailAvailability, 
    resetCheckEmailAvailability,register,error, errors, loading, handleSubmit, onSubmit, emailOnBlurHandler}
}

export default UseRegister
