import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote } from './journalSlice';

export const startNewNote = () => {

  return async( dispatch, getState ) => {

    // Marcar la propiedad isSaving en true para deshabilitar el botón
    dispatch( savingNewNote() );

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
    await setDoc( newDoc, newNote );

    newNote.id = newDoc.id;

    
    // Agregar nota al store
    dispatch( addNewEmptyNote( newNote ) );
    
    // Asignar la nota activa (la cual editar o crear)
    dispatch( setActiveNote( newNote ) );
    // dispatch( activarNote );

  }

}