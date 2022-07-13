import { Flex } from '@chakra-ui/react'
import React from 'react'
import TodoItem from './TodoItem'

import { useGetTodosQuery } from '../redux/services/todos'

function TodoList() {
    const { data, isLoading, isError } = useGetTodosQuery()

    if (isLoading || isError) return null
    return (
        <Flex flexDirection="column">
            {data.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </Flex>
    )
}

export default TodoList