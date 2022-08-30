import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { clearNotesLogout } from '../journal/journalSlice';
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

export const startLoginWithEmailPassword = ( { email, password } ) => {
  return async( dispatch ) => {

    // Mandar a llamar el checkingCredentials del authSlice
    dispatch( checkingCredentials() );
    
    // Mandar a llamar a la función para iniciar sesión y obtener los valores que se almacenarán en el store
    const { ok, uid, displayName, errorMessage, photoURL } = await loginWithEmailPassword( { email, password } );
    
    // Si hay un error se llama el logout
    if( !ok ) return dispatch( logout( errorMessage ) );

    // Se manda a llamar el login y se guardan los valores en el tore
    dispatch( login({
      uid,
      displayName,
      email,
      photoURL
    }));
  }
}

export const startLogout = () => {
  return async( dispatch ) => {
    
    await logoutFirebase();

    dispatch( clearNotesLogout() );
    
    dispatch( logout() );
  }
}