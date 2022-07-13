import { Box } from '@chakra-ui/react'
import React from 'react'
import FormTodo from '../components/FormTodo'
import TodoList from '../components/TodoList'

function Home() {
    return (
        <Box
            backgroundColor="gray.50"
            borderRadius={10}
            p={4}
            m={4}
            justifyContent="space-between"
            border='1px solid'
            borderColor="gray.200"
            boxShadow="md"
        >
            <FormTodo />
            <TodoList />
        </Box>
    )
}

export default Home