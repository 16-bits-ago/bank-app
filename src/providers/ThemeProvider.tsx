import { useColorMode } from '@chakra-ui/react'
import { FC, PropsWithChildren, useEffect } from 'react'

const ThemeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { setColorMode } = useColorMode()

  useEffect(() => {
    setColorMode('dark')
  }, [])

  return <>{children}</>
}

export default ThemeProvider
