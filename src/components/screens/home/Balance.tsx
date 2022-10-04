import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { user } from './Home'

const Balance: FC = () => {
  return (
    <Box pos={'relative'} width={'50%'} m="auto" mt={4}>
        <Flex
          justifyContent={'center'}
          alignItems="center"
          direction={'column'}
          position='relative'
          zIndex={2}
        >
          <Heading fontSize="5xl">$ {user.balance}</Heading>
          <Text fontSize="xl" color="whiteAlpha.500">
            Balance
          </Text>
        </Flex>
        <Flex
          pos="absolute"
          direction="column"
          top={-6}
          left={0}
          alignItems="center"
          justifyContent="center"
          w="full"
          h="full"
          zIndex={1}
        >
          <Box h={150} w={150} pos="absolute" top={0} left={'20%'}>
            <Box
              boxShadow="200px 0px 120px rgb(130 255 113 / 43%)"
              h={100}
              w={100}
              pos="absolute"
              left={-180}
              top={6}
            />
          </Box>
        </Flex>
      </Box>
  )
}

export default Balance