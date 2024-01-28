import React, { useContext, useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { AuthContext } from '../contexts/authContext';
import { retrieveOwnerLinks } from '../adaptors/shortcutAdaptor';
import { linkDataInterface } from '../interfaces';
import ShortcutTableList from '../components/ShortcutTableList';
import CreateShortcutDialog from '../components/CreateShortcutDialog';

export default function LandingPage() {
  const { authState } = useContext(AuthContext);

  const [linkData, setLinkData] = useState<linkDataInterface[]>([]);
  const [createShortcutDialogOpen, setCreateShortcutDialogOpen] = useState(false)

  useEffect(() => {
    retrieveOwnerLinks(authState)
      .then(res => {
        setLinkData(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [authState])

  return (
    <>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} height={'80px'}>
        <Typography fontSize={30} color={'#003a66'} fontWeight={'bold'}>
          {linkData.length} Links
        </Typography>
        <Button onClick={() => setCreateShortcutDialogOpen(true)} variant='contained' color='secondary' sx={{borderRadius: 100, textTransform: 'none'}} size='large'>Create Shortcut</Button>
      </Box>
      <ShortcutTableList linkData={linkData}/>
      <CreateShortcutDialog open={createShortcutDialogOpen} onClose={() => setCreateShortcutDialogOpen(false)} setLinkData={setLinkData}/>
    </>
  );
}
