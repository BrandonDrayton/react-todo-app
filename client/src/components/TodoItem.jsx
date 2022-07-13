import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useDeleteTodoMutation } from "../redux/services/todos";
import { useState } from 'react';
import FormTodoEdit from './FormTodoEdit';

function TodoItem({ todo }) {
    const [deleteTodo, { isLoading }] = useDeleteTodoMutation()
    const [showEditForm, setShowEditForm] = useState(false)
    return (
        <Flex alignItems="center" mt="4" justifyContent="space-between">
            {showEditForm ? (
                <FormTodoEdit todo={todo} onSuccess={() => setShowEditForm(false)} />
            ) : (
                <>
                    <Flex alignItems="center">
                        <Box h="5" w="5" mr="4" bgColor={'#' + todo.color} rounded="full"></Box>
                        <Text mr="1">{todo.text}</Text>
                        <Text fontStyle="italic">({todo.priority})</Text>
                    </Flex>
                    <Flex alignItems="center" gap="2">
                        <IconButton
                            aria-label="icon"
                            onClick={() => setShowEditForm(true)}
                            icon={<EditIcon />}
                            size="md"
                            isRound
                            colorScheme="yellow"
                        />
                        <IconButton
                            isLoading={isLoading}
                            onClick={() => deleteTodo(todo.id)}
                            aria-label="icon"
                            icon={<DeleteIcon />}
                            size="md"
                            isRound
                            colorScheme="red"
                        />
                    </Flex>
                </>
            )}
        </Flex>
    )
}

export default TodoItem