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
    IconButton,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useUpdateTodoMutation } from "../redux/services/todos";

function FormTodoEdit({ todo, onSuccess }) {
    const [updateTodo, { isLoading, isError, error }] = useUpdateTodoMutation()
    const [form, setForm] = useState({
        text: todo.text,
        priority: todo.priority,
        color: todo.color,
    })
    const updateField = (name, value) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodo({ id: todo.id, updatedTodo: form }).unwrap().then(() => {
            onSuccess()
        }).catch(e => { })
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                {isError && <Alert status='error' mb="4"><AlertIcon /> {error.data.error}</Alert>}
                <Flex alignItems='flex-end' justifyContent='space-between' gap="2" w='100%'>
                    <FormControl flexGrow="0" flexBasis="50%" w="auto">
                        <Input
                            id='text'
                            type='text'
                            value={form.text}
                            onChange={(e) => updateField('text', e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl w="120px" flexShrink='0'>
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
                        <Input
                            id='color'
                            type='color'
                            value={'#' + form.color}
                            onChange={(e) => updateField('color', e.target.value.slice(1))}
                        />
                    </FormControl>
                    <IconButton
                        isRound ml='auto' icon={<CheckIcon />} isLoading={isLoading} type="submit" colorScheme='green'>
                        Save
                    </IconButton>
                </Flex>
            </form>
        </>
    )
}

export default FormTodoEdit