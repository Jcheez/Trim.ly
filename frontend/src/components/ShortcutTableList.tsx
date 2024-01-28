import { Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react'
import { ShortcutTableListProps } from '../interfaces';

export default function ShortcutTableList(props: ShortcutTableListProps) {

  const { linkData } = props

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {linkData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
            >
              <TableCell sx={{ minWidth: 300, maxWidth: 500 }}>
                <Stack spacing={1} direction={'column'}>
                  <Typography>{`/${row.shortcut}`}</Typography>
                  <Typography variant='subtitle2'>{row.original}</Typography>
                </Stack>
              </TableCell>
              <TableCell>{row.createdOn}</TableCell>
              <TableCell sx={{ maxWidth: 30 }}>
                <Button variant='rounded' sx={{ fontSize: 13 }}>Copy</Button>
              </TableCell>
              <TableCell sx={{ maxWidth: 30 }}>
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
