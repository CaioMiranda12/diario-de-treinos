import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { TfiMenu } from "react-icons/tfi";

export function Header() {
    const { data: session, status } = useSession()

    return (
        <header className='h-20 w-full bg-black flex items-center justify-center'>
            <section className="flex items-center justify-between max-w-screen-lg w-full px-5">
                <nav className='flex items-center'>
                    <Link href='/'>
                        <h1 className="text-white text-3xl font-bold">Treinos<span className="text-red-600">+</span></h1>
                    </Link>

                    {
                        session?.user && (
                            <div className='flex'>
                                <Link href='/dashboard' className="bg-white text-black py-1 px-4 rounded-md mx-5 hidden sm:block">
                                    Meu painel
                                </Link>

                                <Link href='/geraldashboards' className="bg-white text-black py-1 px-4 rounded-md hidden sm:block">
                                    Treinos
                                </Link>
                            </div>
                        )
                    }
                </nav>

                {
                    status === 'loading' ? (
                        <></>
                    ) : session ? (
                        <button onClick={() => signOut()} className="text-white border py-2 px-5 rounded-md text-sm hover:bg-white hover:text-black hover:scale-105 hover:font-bold transition-all duration-500">Olá {session?.user?.name}</button>
                    ) : (
                        <button onClick={() => signIn('google')} className="text-white border py-2 px-5 rounded-md text-sm hover:bg-white hover:text-black hover:scale-105 hover:font-bold transition-all duration-500">Acessar conta</button>
                    )
                }

                {
                    session?.user && (

                        <Menu as="div" className="relative inline-block text-left sm:hidden">
                            <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm">
                                    <TfiMenu color='red' size={18} />
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <Link
                                            href="/dashboard"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        >
                                            Meu painel
                                        </Link>
                                    </MenuItem>

                                    <MenuItem>
                                        <Link
                                            href="/geraldashboards"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        >
                                            Treinos
                                        </Link>
                                    </MenuItem>

                                    <MenuItem>
                                        <button
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                            onClick={() => signOut()}
                                        >
                                            Desconectar
                                        </button>
                                    </MenuItem>

                                </div>
                            </MenuItems>
                        </Menu>
                    )
                }
            </section>
        </header>
    )
}