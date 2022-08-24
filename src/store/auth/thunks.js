import { registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './';

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
    // Mandar a llamar a la función logout si no se logró iniciar sesión / registrar
    if( !result.ok ) return dispatch( logout( result.errorMessage ) );
    // Llenar la información con la respuesta de firebase
    dispatch( login( result ) );
  }
}

export const startCreatingUserWithEmailPassword = ({ password, displayName, email }) => {
  return async( dispatch ) => {

    // Mandar a llamar el checkingCredentials del authSlice
    dispatch( checkingCredentials() );

    // Mandar a llamar a la función para crear el usuario
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ password, displayName, email });

    console.log( errorMessage );

    if( !ok ) return dispatch( logout( errorMessage ) );

    dispatch( login({
      uid,
      displayName,
      email,
      photoURL
    }) );
  }
}