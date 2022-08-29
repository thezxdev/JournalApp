import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from './journalSlice';
import { loadNotes } from '../../helpers';

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

// se puede pedir el uid
export const startLoadingNotes = () => {
  return async( dispatch, getState ) => {

    const { uid } = getState().auth;
    if( !uid ) throw new Error('El UID del usuario no existe');

    // Obtener notas
    const notes = await loadNotes( uid );

    // Asignar las notas al store
    dispatch( setNotes( notes ) );

  }
}

export const startSaveNote = () => {
  return async( dispatch, getState ) => {

    dispatch( setSaving() );

    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    
    const noteToFireStore = { ...note };
    // Eliminar id de la nota
    delete noteToFireStore.id;
    // console.log( noteToFireStore );

    // Referencia del documento a actualizar
    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
    // Actualizar el documento
    await setDoc( docRef, noteToFireStore, { merge: true });

    dispatch( updateNote( note ) );
  }
}