import { ArrowRightIcon, PhoneIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton, Text, useBoolean, useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { useProfile } from '../../../hooks/useProfile'
import Balance from './Balance'
import TransferModal from './transfer-money/TransferModal'


const Home: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {user} = useProfile()

  return (
    <Box bg="black" p="6" h={'100vh'}>
      <Box>
        <Text color="whiteAlpha.500" fontSize="xl">
          Good Morning
        </Text>
        <Heading fontSize="2xl">{user?.name}</Heading>
      </Box>
      <Balance />

      <IconButton
        m='auto'
        display='block'
        mt={8}
        variant="outline"
        colorScheme="white"
        aria-label="Transfer"
        fontSize="18px"
        icon={<ArrowRightIcon />}
        onClick={onOpen}
      />

      <TransferModal isOpen={isOpen} onClose={onClose}/>
    </Box>
  )
}

export default Home
