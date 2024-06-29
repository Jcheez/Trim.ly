import { Box } from '@mui/material'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import { dynamicTypeAnimationInterface } from '../interfaces'

export default function DynamicTypeAnimation(props: dynamicTypeAnimationInterface) {

  const { fontSize, viewport } = props

  const formDisplays = (activatedViewport: string) => {
    const displays: Record<string, string> = {
      'xs': 'none',
      'sm': 'none',
      'md': 'none',
      'lg': 'none',
      'xl': 'none'
    }
    displays[activatedViewport] = 'block'
    return displays
  }

  return (
    <Box display={formDisplays(viewport)}>
      <TypeAnimation
        sequence={[
          'Memorable',
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          'Manageable',
          1000,
          'Elegant',
          1000
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: fontSize, display: 'inline-block', textAlign: 'left', width: '100%', color: '#003a66' }}
        repeat={Infinity}
      />
    </Box>
  )
}
