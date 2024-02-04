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

  const { authState } = useContext(AuthContext)

  const navigate = useNavigate()

  // Functions
  const handleRemoveLinkButtonOnClick = () => {
    deleteShortcut(shortcut, authState)
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

  const handleSaveShortcutButtonOnClick = () => {
    if (isShortcutDetailsValid(originalLink)) {
      updateShortcut({original: originalLink, shortcut}, authState)
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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'md'}>
      <Box p={2}>
        <DialogTitle mb={3}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography fontSize={30} color={'#003a66'} fontWeight={'bold'}>Settings for /{shortcut}</Typography>
            <IconButton onClick={onClose}>
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
        <DialogActions sx={{ pr: 3 }}>
          <Button variant='outlined' color='error' sx={{ borderRadius: 100, textTransform: 'none' }} size='large' onClick={handleRemoveLinkButtonOnClick}>Remove Custom Link</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
