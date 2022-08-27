import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async ( uid = '' ) => {
  if( !uid ) throw new Error('El UID del usuario no existe');

  // Referencia a la colección de la cual obtendremos los documentos
  const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
  // Obtener todos los documentos
  const docs = await getDocs( collectionRef );
  // Crear arreglo con la data de los documentos
  const notes = [];
  docs.forEach( doc => {
    notes.push({ id: doc.id, ...doc.data() });
  });
  // console.log( notes );
  return notes;
}