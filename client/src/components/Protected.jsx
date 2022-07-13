import React from 'react'
import { Navigate } from 'react-router'
import { useGetCurrentUserQuery } from "../redux/services/user";

function Protected({ children }) {
    const { data, isUninitialized, isLoading, isFetching } = useGetCurrentUserQuery()

    // checking
    if (isUninitialized || isLoading || isFetching) {
        return null
    }

    // checked & not logged in
    if (!data) {
        return <Navigate to="/login" replace />
    }

    // checked & logged in
    return children
}

export default Protected