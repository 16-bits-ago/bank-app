import { CheckIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useProfile } from '../../../../hooks/useProfile'
import { ITransferMoney, UserService } from '../../../../services/user.services'
import { formatCardNumber } from '../../../../utils/format-card-number'
import SuccessAlert from './SuccessAlert'
import { ITransferData } from './transfer.interface'

interface ITransferModal {
  isOpen: boolean
  onClose: () => void
}

const TransferModal: FC<ITransferModal> = ({ isOpen, onClose }) => {
  const { user } = useProfile()
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ITransferData>({
    mode: 'onChange',
    defaultValues: {
      amount: 0
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    ['transfer money'],
    (data: ITransferMoney) => UserService.transferMoney(data),
    {
      async onSuccess() {
        setIsSuccess(true)
        reset()
        await queryClient.invalidateQueries(['profile'])

        setTimeout(() => {
          setIsSuccess(false)
        }, 2000)
      }
    }
  )

  const onSubmit: SubmitHandler<ITransferData> = data => {
    if (!user?.card) return

    mutate({
      card: data.card,
      amount: Number(data.amount),
      fromCard: user.card
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent bg={'#171717'} pos="relative">
        <SuccessAlert isSuccess={isSuccess} />
        <ModalHeader>Transfer your money</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Input
                placeholder="From card"
                size="md"
                defaultValue={formatCardNumber(user?.card || 0)}
                disabled
              />
              <Controller
                control={control}
                name="card"
                render={({ field: { onChange, name, value } }) => (
                  <FormControl>
                    <Input
                      id={name}
                      size={'md'}
                      placeholder="To card"
                      value={formatCardNumber(value)}
                      onChange={event => onChange(event.target.value)}
                    />
                    <FormErrorMessage>{errors.card?.message}</FormErrorMessage>
                  </FormControl>
                )}
                rules={{
                  required: 'This is required',
                  minLength: {
                    value: 16,
                    message: 'Minimum length should be 4'
                  }
                }}
              />
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="$"
                />
                <Input
                  placeholder="Enter amount"
                  size={'md'}
                  {...register('amount', {
                    required: 'This is required'
                  })}
                />
              </InputGroup>
              <Button
                colorScheme="green"
                variant="outline"
                isLoading={isLoading}
                loadingText={'Sending money...'}
                type="submit"
              >
                Send money
              </Button>
            </Stack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TransferModal
