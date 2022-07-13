import { PlusSquareIcon } from '@chakra-ui/icons'
import {
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Collapse,
    Flex,
    Select,
    Alert,
    AlertIcon,
    Box,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAddNewTodoMutation } from "../redux/services/todos";

function FormTodo() {
    const { isOpen, onToggle } = useDisclosure()
    const [addNewTodo, { isLoading, isError, error }] = useAddNewTodoMutation()
    const [form, setForm] = useState({
        text: '',
        priority: 'medium',
        color: 'FF0000',
    })
    const updateField = (name, value) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewTodo(form).unwrap().then(() => {
            onToggle()
            setForm({
                text: '',
                priority: 'medium',
                color: 'FF0000'
            })
        }).catch(e => { })
    }

    return (
        <>
            <Collapse in={!isOpen} animateOpacity>
                <Button
                    w="100%"
                    leftIcon={<PlusSquareIcon />}
                    variant="outline"
                    colorScheme="green"
                    onClick={onToggle}
                >New Item</Button>
            </Collapse>

            <Collapse in={isOpen} animateOpacity>
                <form onSubmit={handleSubmit}>
                    <Box p="4" bg="white" rounded="md" border="1px" borderColor="gray.200">
                        {isError && <Alert status='error' mb="4"><AlertIcon /> {error.data.error}</Alert>}
                        <Flex alignItems='flex-end' gap="2">
                            <FormControl>
                                <FormLabel htmlFor='text'>Todo Text</FormLabel>
                                <Input
                                    id='text'
                                    type='text'
                                    value={form.text}
                                    onChange={(e) => updateField('text', e.target.value)}
                                />
                            </FormControl>
                            <FormControl w="120px" flexShrink='0'>
                                <FormLabel htmlFor='priority'>Priority</FormLabel>
                                <Select
                                    id="priority"
                                    value={form.priority}
                                    onChange={(e) => updateField('priority', e.target.value)}
                                >
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </Select>
                            </FormControl>
                            <FormControl w="65px" flexShrink='0'>
                                <FormLabel htmlFor='color'>Color</FormLabel>
                                <Input
                                    id='color'
                                    type='color'
                                    value={'#' + form.color}
                                    onChange={(e) => updateField('color', e.target.value.slice(1))}
                                />
                            </FormControl>
                            <Button isLoading={isLoading} type="submit" colorScheme='green'>
                                Add
                            </Button>
                        </Flex>
                    </Box>
                </form>
            </Collapse>
        </>
    )
}

export default FormTodo