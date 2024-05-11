import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Transaction from './components/Transaction';
import Explorer from './components/Explorer';
import Home from './components/Home';

export default function WebAppRouter() {
    return(
        <Routes>
            {/* <IndexRoute component={MainPage} /> */}
            <Route path="/" element={<Home/>} />
            <Route path="/accounts" element={<Transaction/>} />
            <Route path="/transaction" element={<Transaction/>} />
            <Route path="/explorer" element={<Explorer/>} />
        </Routes>
    )
};