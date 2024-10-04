import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getShortcut } from '../adaptors/shortcutAdaptor'
import { Box, Typography } from '@mui/material'

export default function RedirectPage() {

  const { shortcut } = useParams<{ shortcut: string }>()

  const [invalidShortcut, setInvalidShortcut] = useState(false)

  useEffect(() => {
    if (shortcut !== undefined) {
      getShortcut(shortcut)
        .then(res => {
          if (res.status === 200) {
            window.location.href = res.data.redirect
          }
        })
        .catch(err => {
          const errorPayload = err.response.data
          setInvalidShortcut(true)
        })
    }
  }, [shortcut])

  return (
    <>
      {invalidShortcut ? (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
          <Box>
            <Typography fontSize={30} color={'#003a66'} fontWeight={'bold'}>This short link is not valid.</Typography>
            <Typography fontSize={100} fontWeight={'bold'}>404 Not Found</Typography>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  )
}
