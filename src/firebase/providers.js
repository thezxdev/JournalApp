import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage
    }
  }

}