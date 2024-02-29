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
      {linkData.length ? (
        <>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} height={'80px'}>
            <Typography fontSize={30} color={'#003a66'} fontWeight={'bold'}>
              {linkData.length > 1 ? `${linkData.length} Links` : `${linkData.length} Link`}
            </Typography>
            <Button onClick={() => setCreateShortcutDialogOpen(true)} variant='contained' color='secondary' sx={{ borderRadius: 100, textTransform: 'none' }} size='large'>Create Shortcut</Button>
          </Box>
          <ShortcutTableList linkData={linkData} />
        </>
      ) : (
        <>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={'calc(100vh - 80px)'}>
            <Typography fontSize={30} color={'#003a66'} fontWeight={'bold'} mb={2}>
              You have no short links.
            </Typography>
            <Button onClick={() => setCreateShortcutDialogOpen(true)} variant='contained' color='secondary' sx={{ borderRadius: 100, textTransform: 'none' }} size='large'>Create my First Short Link</Button>
          </Box>
        </>
      )}
      <CreateShortcutDialog open={createShortcutDialogOpen} onClose={() => setCreateShortcutDialogOpen(false)} setLinkData={setLinkData} />
    </>
  );
}
