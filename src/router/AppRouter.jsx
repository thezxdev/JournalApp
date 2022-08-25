import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { FirebaseAuth } from '../firebase/config';
import { JournalRoutes } from '../journal/Routes/JournalRoutes';
import { login, logout } from '../store/auth';
import { CheckingAuth } from '../ui';

export const AppRouter = () => {

  const { status } = useSelector( state => state.auth );

  const dispatch = useDispatch();
  
  useEffect( () => {

    // Función para saber el estado del usuario
    onAuthStateChanged( FirebaseAuth, async ( user ) => {
      // Si no hay usuario llamar el logout() para redirigirlo a la pantalla de login
      if( !user ) return dispatch( logout() );
      // Obtener los valores del usuario
      const { uid, email, displayName, photoURL } = user;
      // Llenar el store con la información del usuario y redirigirlo a la págian principal
      dispatch( login( { uid, email, displayName, photoURL } ) );
    } );

  }, [] );

  if( status === 'checking' ) {
    return <CheckingAuth />
  }


  return (
    <Routes>

      {
        (status === 'authenticated')
          ? <Route path="/*" element={ <JournalRoutes /> } />
          : <Route path="/auth/*" element={ <AuthRoutes /> } />
      }

      <Route path="/*" element={ <Navigate to="/auth/login" /> } />

      {/* Login y Registro */}
      {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

      {/* JournalApp */}
      {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

    </Routes>
  )
}
