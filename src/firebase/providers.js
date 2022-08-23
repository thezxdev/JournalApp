import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from './config';

// Instancia del googleAuthProvider | Para iniciar sesión con google
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  
  try {
    
    // FirebaseAuth | getAuth de config y la instancia del proveedor de google
    const result = await signInWithPopup( FirebaseAuth, googleProvider );
    // const credential = GoogleAuthProvider.credentialFromResult( result );
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid
    }

  } catch ( err ) {
    const errorCode = err.code;
    const errorMessage = err.message;

    return {
      ok: false,
      errorMessage
    }
  }

}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {

    // Crear usuario en Firebase
    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    // Obtener uid y photoURL del usuario creado
    const { uid, photoURL } = resp.user;
    console.log( resp );
    // TODO: Actualizar el displayName en firebase

    // Valores a regresar
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }

  } catch( err ) {
    return {
      ok: false,
      errorMessage: err.message
    }
  }
}