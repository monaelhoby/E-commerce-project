import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@store/hooks'


const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const {accessToken} = useAppSelector(state => state.authRegisterSlice)

    if(!accessToken){
        return <Navigate to="/login" />
    }
  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute
