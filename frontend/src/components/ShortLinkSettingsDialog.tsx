import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ShortLinkSettingsDialogProps } from '../interfaces'
import CloseIcon from '@mui/icons-material/Close';
import TextFieldWithTitle from './TextFieldWithTitle';
import { deleteShortcut, updateShortcut } from '../adaptors/shortcutAdaptor';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

export default function ShortLinkSettingsDialog(props: ShortLinkSettingsDialogProps) {

  const { open, onClose, shortcut, original } = props

  // states
  const [originalLink, setOriginalLink] = useState(original)
  const [originalError, setOriginalError] = useState('')

  const [userClickDelete, setUserClickDelete] = useState(false)

  const { getAccessToken } = useContext(AuthContext)

  const navigate = useNavigate()

  // Functions
  const handleRemoveLinkButtonOnClick = async () => {
    const token = await getAccessToken()
    deleteShortcut(shortcut, token)
      .then(res => {
        if (res.status === 204) {
          navigate(0)
        }
      })
      .catch(err => {
        const errorPayload = err.response.data
        console.error(`Error: ${errorPayload.message}`);
      })
  }

  const handleSaveShortcutButtonOnClick = async () => {
    if (isShortcutDetailsValid(originalLink)) {
      const token = await getAccessToken()
      updateShortcut({original: originalLink, shortcut}, token)
      .then(res => {
        if (res.status === 204) {
          navigate(0)
        }
      })
      .catch(err => {
        const errorPayload = err.response.data
        console.error(`Error: ${errorPayload.message}`);
      })
    }
  }

  const isValidUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString));
    }
    catch (e) {
      return false;
    }
  }

  const isShortcutDetailsValid = (originalURL: string) => {
    setOriginalError('')
    let isValid = true

    if (!isValidUrl(originalURL)) {
      isValid = false
      setOriginalError('This is not a valid URL')
    }

    return isValid
  }

  const handleDialogOnClose = () => {
    onClose()
    setTimeout(() => {
      setUserClickDelete(false)
    }, 500)
  }

  return (
    <Dialog open={open} onClose={handleDialogOnClose} fullWidth maxWidth={'md'}>
      <Box p={2}>
        <DialogTitle mb={3}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography fontSize={30} color={'#003a66'} fontWeight={'bold'}>Settings for /{shortcut}</Typography>
            <IconButton onClick={handleDialogOnClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={10}>
              <TextFieldWithTitle
                title='Original Link'
                placeholder='Original URL'
                type='text'
                handleSetState={setOriginalLink}
                value={originalLink ? originalLink : original}
                error={originalError}
              />
            </Grid>
            <Grid item xs={2} display={'flex'} alignItems={'end'}>
              <Button fullWidth variant='outlined' color='secondary' sx={{ borderRadius: 100, textTransform: 'none' }} size='large' onClick={handleSaveShortcutButtonOnClick}>Save</Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pr: 3, display: userClickDelete ? 'none' : 'flex'}}>
            <Button variant='outlined' color='error' sx={{ borderRadius: 100, textTransform: 'none' }} size='large' onClick={() => setUserClickDelete(true)}>Remove Custom Link</Button>
        </DialogActions>
        <DialogActions sx={{ pr: 3, display: userClickDelete ? 'flex' : 'none'}}>
            <Typography>Confirm Delete?</Typography>
            <Button variant='outlined' color='error' sx={{ borderRadius: 100, textTransform: 'none' }} size='large' onClick={() => setUserClickDelete(false)}>Cancel</Button>
            <Button variant='outlined' color='error' sx={{ borderRadius: 100, textTransform: 'none' }} size='large' onClick={handleRemoveLinkButtonOnClick}>Confirm</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
