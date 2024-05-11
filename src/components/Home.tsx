import React from 'react';
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <h1>This is Demo graphql wallet</h1>
            <Link to='/accounts'>
                <button>Accounts</button>
            </Link>
            <Link to='/transaction'>
                <button>Transaction</button>
            </Link>
            <Link to='/explorer'>
                <button>Explorer</button>
            </Link>
        </>
    )
}