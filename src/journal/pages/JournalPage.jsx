import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto aliquid recusandae non fugit! Maxime beatae accusamus perspiciatis? Commodi, expedita. Assumenda asperiores totam enim corrupti quod illo optio aut cum. Iure?

        NothingSelected
        NoteView
        
      </Typography> */}
      {/* <NothingSelectedView /> */}
      <NoteView />

      <IconButton
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
