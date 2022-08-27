import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';

export const startNewNote = () => {

  return async( dispatch, getState ) => {

    // Obtener uid del usuario con la función getState
    const { uid } = getState().auth;

    // Crear campos de la nota
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    // doc, collection, setDoc de firebase/firestore/lite
    // doc recibe una referencia a la raíz de firestore, utilizamos dentro collection que dentro contiene la referencia como primer parámetro
    // collection recibe una referencia a la raíz de firestore, y la ruta en la que se ingresarán los datos (path/ templateStrings, ...)
    // setDoc recibe una referencia al documento que se va a ingresar (doc) y la información de ese documento (newNote)
    const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
    const setDocResp = await setDoc( newDoc, newNote );

    console.log( { newDoc, setDocResp } );

    // dispatch
    // dispatch( newNote );
    // dispatch( activarNote );

  }

}