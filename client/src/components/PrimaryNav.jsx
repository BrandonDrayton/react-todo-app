import { Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useGetCurrentUserQuery, useLogoutMutation } from "../redux/services/user";

const PrimaryNav = () => {
    const { data, isLoading } = useGetCurrentUserQuery()
    const [logout] = useLogoutMutation()

    return <Flex
        backgroundColor="gray.50"
        borderRadius={10}
        p={4}
        m={4}
        justifyContent="space-between"
        border='1px solid'
        borderColor="gray.200"
        boxShadow="md"
    >
        <Link as={RouterLink} to="/" fontSize='lg' fontWeight="semibold">Home</Link>
        {!isLoading && (
            <Flex justifyContent="flex-end" gap={6}>
                {data ? (
                    <Button onClick={() => logout()} variant='link'>Logout</Button>
                ) : (
                    <>
                        <Link as={RouterLink} to="/login">Login</Link>
                        <Link as={RouterLink} to="/register">Register</Link>
                    </>
                )}
            </Flex>
        )}
    </Flex>
}

export default PrimaryNav