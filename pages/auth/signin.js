import React from 'react'
import Header from '../../components/Header'
import { getProviders, signIn } from 'next-auth/react'

const signin = ({ providers }) => {
    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] py-2 px-14 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://links.papareact.com/ocw" alt="Logo" className="w-80" />
                <p>This is not a REAL app, it is built for education purpose only</p>
                <div className="mt-40">
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                                className="p-3 bg-blue-500 rounded-md text-white">
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }
}

export default signin