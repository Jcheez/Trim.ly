import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { AuthContext } from '../contexts/authContext';
import { retrieveOwnerLinks } from '../adaptors/shortcutAdaptor';
import { linkDataInterface } from '../interfaces';

export default function LandingPage() {
  const { authState } = useContext(AuthContext);

  const [linkData, setLinkData] = useState<linkDataInterface[]>([])

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
      <Typography>COngrats, this page is protected</Typography>
      <Typography>{linkData.length}</Typography>
    </>
  );
}
