import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //   id: 'ABC123',
    //   title: '',
    //   body: '',
    //   date: 1234567,
    //   imagesUrls: [], // https://foto1.jpg, https://foto2.jpg, ...
    // }
  },
  reducers: {
    savingNewNote: ( state ) => {
      state.isSaving = true;
    },
    addNewEmptyNote: ( state, action ) => {
      state.notes.push( action.payload );
      state.isSaving = false;
      // state.notes = [ ...state.notes, action.payload ];
    },
    setActiveNote: ( state, action ) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: ( state, action ) => {
      state.notes = action.payload;  
    },
    setSaving: ( state ) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
      state.isSaving = false;
    },
    updateNote: ( state, action ) => {
      state.isSaving = false;
      // Actualizar referencia local del array de las notas
      state.notes = state.notes.map( note => {
        // if( note.id === action.payload.id ) {
        //   return action.payload
        // }
        // return note;

        return ( note.id === action.payload.id )
          ? note = action.payload
          : note;

      });

      state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
    },
    // Limpiar información del usuario
    clearNotesLogout: ( state ) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: ( state, action ) => {

    },
  }
});
// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;