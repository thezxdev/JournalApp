import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView } from '../views';

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto aliquid recusandae non fugit! Maxime beatae accusamus perspiciatis? Commodi, expedita. Assumenda asperiores totam enim corrupti quod illo optio aut cum. Iure?

        NothingSelected
        NoteView
        
      </Typography> */}
      <NothingSelectedView />
    </JournalLayout>
  )
}
