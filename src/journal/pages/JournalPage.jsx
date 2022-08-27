import { useDispatch, useSelector } from 'react-redux';
import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

  const dispatch = useDispatch();
  // Obtener los valores de isSaving y active del store del journal
  const { isSaving, active, } = useSelector( state => state.journal );

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto aliquid recusandae non fugit! Maxime beatae accusamus perspiciatis? Commodi, expedita. Assumenda asperiores totam enim corrupti quod illo optio aut cum. Iure?

        NothingSelected
        NoteView
        
      </Typography> */}
      {/* Mostrar una vista dependiendo de si hay una nota activa */}
      {
        ( !!active )
          ? <NoteView />
          : <NothingSelectedView />
      }

      {/* Deshabilitar el botón en lo que se crea una nota */}
      <IconButton
        onClick={ onClickNewNote }
        disabled={ isSaving }
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: .9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
