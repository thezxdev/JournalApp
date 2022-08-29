import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
// Importar sweet alert 2
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks';
import { ImageGallery } from '../components';
import { setActiveNote, startSaveNote } from '../../store/journal';

export const NoteView = () => {


  const dispatch = useDispatch();

  const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );

  const { body, title, date, onInputChange, formState } = useForm( note );

  const dateString = useMemo( () => {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [ date ]);

  // Referencia al input de tipo file
  const fileInputRef = useRef();

  // Guardar en el estado los nuevos valores del formulario
  useEffect(() => {
    dispatch( setActiveNote( formState ) );
  }, [ formState ]);

  // Mostrar alerta cuando el mensaje cambie y sea mayor a 0 de longitud 
  useEffect( () => {
    if( messageSaved.length > 0 ) {
      Swal.fire(
        'Nota actualizada',
        messageSaved,
        'success'
      )
    }
  }, [ messageSaved ]);
  
  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }

  // Función a llamar para subir archivos
  const onFileInputChange = ({ target }) => {
    if( target.files === 0 ) return;
    
    console.log('Subiendo archivos');
    // dispatch( startUploadingFiles( target.files ));
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="Center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={ 39 } fontWeight="light">{ dateString }</Typography>
      </Grid>

      <Grid item>

        <input
          type="file"
          multiple
          ref={ fileInputRef } // Mantener la referencia
          onChange={ onFileInputChange }
          style={{ display: 'none' }}
        />

        <IconButton
          color="primary"
          disabled={ isSaving }
          onClick={ () => fileInputRef.current.click() } // Mandar a llamar el método click del ref
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={ isSaving }
          onClick={ onSaveNote }
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSzie: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={ title }
          onChange={ onInputChange }
        />
        
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={ 5 }
          name="body"
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>

      {/* Image gallery */}
      <ImageGallery />

    </Grid>
  )
}
