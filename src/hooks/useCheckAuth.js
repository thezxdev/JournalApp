import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {

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
      // Empezar a cargar las notas del usuario actual
      dispatch( startLoadingNotes() );
    } );
  }, [] );

  return status;
}
