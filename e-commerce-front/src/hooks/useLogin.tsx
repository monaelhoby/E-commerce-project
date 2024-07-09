import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {formOrops, loginSchema} from '@validation/login'
import AuthLoginAction from '@store/auth/actions/login';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { resetUi } from '@store/auth/authSlice';

const UseLogin = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const [searchParams, setSearchParams] = useSearchParams();
    const {error, loading} = useAppSelector(state => state.authRegisterSlice)

   
    useEffect(() => {
        return () => {
            dispatch(resetUi())
        }
    }, [dispatch])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formOrops>({mode: 'onBlur', resolver: zodResolver(loginSchema)})

  const onSubmit: SubmitHandler<formOrops> = (data) => {
    if (searchParams.get("message")) {
        setSearchParams("");
      }
    dispatch(AuthLoginAction(data)).unwrap().then(()=> navigate('/'))
  }
  return {register, handleSubmit,onSubmit, searchParams, error, loading, errors }
}

export default UseLogin
