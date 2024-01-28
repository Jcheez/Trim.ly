import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { CreateShortcutDialogProps } from '../interfaces'
import CloseIcon from '@mui/icons-material/Close';
import TextFieldWithTitle from './TextFieldWithTitle';
import { createShortcut } from '../adaptors/shortcutAdaptor';
import { AuthContext } from '../contexts/authContext';

export default function CreateShortcutDialog(props: CreateShortcutDialogProps) {

  const { open, onClose, setLinkData } = props

  const { authState } = useContext(AuthContext)

  // states
  const [originalLink, setOriginalLink] = useState('')
  const [shortcutLink, setShortcutLink] = useState('')

  const [originalError, setOriginalError] = useState('')
  const [ShortcutError, setShortcutError] = useState('')

  // Functions
  const isValidUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString));
    }
    catch (e) {
      return false;
    }
  }

  const isShortcutDetailsValid = (originalURL: string, shortcutURL: string) => {
    setOriginalError('')
    setShortcutError('')
    let isValid = true

    if (!isValidUrl(originalURL)) {
      isValid = false
      setOriginalError('This is not a valid URL')
    }

    if (!/^[a-zA-Z0-9]{7,}$/.test(shortcutURL)) {
      isValid = false
      setShortcutError('Custom links must have a length of 7 characters, and can only consist of alphabets and numbers')
    }

    return isValid
  }

  const handleCreateShortcutOnClick = () => {
    if (isShortcutDetailsValid(originalLink, shortcutLink)) {
      createShortcut(originalLink, shortcutLink, authState).then(res => {
        if (res.status === 201) {
          console.log('Shortcut added')
          setLinkData(prev => [...prev, {
            shortcut: shortcutLink,
            original: originalLink,
            createdOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', '')
          }])
          onClose()
        }
      })
        .catch(err => {
          const errorPayload = err.response.data
          console.error(`Error: ${errorPayload.message}`);
          setShortcutError(errorPayload.message)
        })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={'md'}>
      <Box p={2}>
        <DialogTitle mb={3}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography fontSize={30} color={'#003a66'} fontWeight={'bold'}>New Shortcut</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack direction={'column'} spacing={3}>
            <TextFieldWithTitle
              title='Original Link'
              placeholder='Original URL'
              type='text'
              handleSetState={setOriginalLink}
              value={originalLink}
              error={originalError}
            />
            <TextFieldWithTitle
              title='Shortcut Link'
              placeholder='Custom link'
              type='text'
              handleSetState={setShortcutLink}
              value={shortcutLink}
              error={ShortcutError}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ pr: 3 }}>
          <Button onClick={handleCreateShortcutOnClick} variant='contained' color='secondary' sx={{ borderRadius: 100, textTransform: 'none' }} size='large'>Create</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
