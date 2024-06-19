import React, { useEffect } from 'react'
import styled from "styled-components";
import Spinner from "../ui/Spinner"
import { useUser } from "../features/authentication/useUser"
import { useNavigate } from 'react-router-dom'
const FullPage = styled.div`
  height:100vh;
  background-color:var(--color-grey-50);
  display:flex;
  align-items:center;
  justify-content:center;
`
// ProtectedRoute.jsx
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  //1.load the auth-user
  const { isLoading, isAuthenticated } = useUser()

  //3.If no auth-user, redirect to /login
  useEffect(function () {
    if (!isAuthenticated && !isLoading) navigate("/login")
  }, [isLoading, isAuthenticated, navigate])

  //2.spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4.If is a user,render app
  if (isAuthenticated) return children
}
