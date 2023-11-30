import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../container/Clients/Cart/Cart'
import Header from '../container/Clients/Header/Header'

export default function clientRouter() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='cart' element={<Cart />} />
            </Routes>
        </>

    )
}
