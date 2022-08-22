import { checkingCredentials } from './';

export const checkingAuthentication = ( email, password ) => {
  return async( dispatch ) => {

    // Uso de la acción checkingCredentials del authSlice
    dispatch( checkingCredentials() );

  }
}

export const startGoogleSignIn = () => {
  return async( dispatch ) => {

    dispatch( checkingCredentials() );
  
  }
}