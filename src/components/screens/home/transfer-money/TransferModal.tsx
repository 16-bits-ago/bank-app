import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from '@chakra-ui/react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formatCardNumber } from '../../../../utils/format-card-number'
import { user } from '../Home'
import { ITransferData } from './transfer.interface'

interface ITransferModal {
  isOpen: boolean
  onClose: () => void
}

const TransferModal: FC<ITransferModal> = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<ITransferData>({mode: 'onChange'})

  const onSubmit: SubmitHandler<ITransferData> = data => {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent bg={'#171717'}>
        <ModalHeader>Transfer your money</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}></form>
          <Stack spacing={3}>
            <Input
              placeholder="From card"
              size="md"
              defaultValue={formatCardNumber(user.cardNumber)}
              disabled
            />
            <FormControl isInvalid={!errors.card?.message}>
              <Input
                size={'md'}
                id="name"
                placeholder="To card"
                {...register('card', {
                  required: 'This is required',
                  minLength: { value: 16, message: 'Minimum length should be 4' }
                })}
              />
              <FormErrorMessage>
                {errors.card?.message}
              </FormErrorMessage>
            </FormControl>
            <Button variant="outline" mr={3}>
              Send money
            </Button>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TransferModal
