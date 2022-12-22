import * as React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import { AddPack } from '../../../features/packs/addPack/AddPack'
import { dialogModeType } from '../../../features/packs/Packs'

type FormDialogType = {
  opened: boolean
  data: {
    id: string | null
    name: string | null
  }
  closeModal: () => void
  dialogMode: dialogModeType
}

export const FormDialog = (props: FormDialogType) => {
  const { opened, data, closeModal, dialogMode } = props
  const [name, setName] = React.useState(data.name)

  const onChangeName = (newName: string) => setName(newName)

  return (
    <div>
      <Dialog open={opened} onClose={closeModal}>
        <DialogTitle>{dialogMode === 'add' ? 'Add Pack' : 'Edit Pack'}</DialogTitle>
        <DialogContent>
          {/*<DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>*/}
          {dialogMode === 'add' ? (
            <AddPack closeModal={closeModal} active={false} />
          ) : (
            <>
              <p>{data.id}</p>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Pack`s Name"
                type="email"
                fullWidth
                variant="standard"
                value={name}
                onChange={event => onChangeName(event.currentTarget.value)}
              />
              <DialogActions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={closeModal}>Confirm</Button>
              </DialogActions>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
