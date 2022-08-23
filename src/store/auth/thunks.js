import { signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials } from './';

export const checkingAuthentication = ( email, password ) => {
  return async ( dispatch ) => {

    // Uso de la acción checkingCredentials del authSlice
    dispatch( checkingCredentials() );

  }
}

export const startGoogleSignIn = () => {
  return async ( dispatch ) => {

    dispatch( checkingCredentials() );

    // Llamar a la función para iniciar sesión con google
    const result = await signInWithGoogle();
    console.log({ result });
  }
}