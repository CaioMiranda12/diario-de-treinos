import { Textarea } from "@/components/textarea";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaShare } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import Link from "next/link";

interface HomeProps {
    user: {
        email: string
    }
}

interface TaskProps {
    id: string,
    treino: string,
    created: Date,
    user: string,
    public: boolean
}

export default function Dashboard({ user }: HomeProps) {
    const [input, setInput] = useState('')
    const [publicTask, setPublicTask] = useState(false)
    const [treinos, setTreinos] = useState<TaskProps[]>([])

    useEffect(() => {
        async function loadTarefas() {
            const treinosRef = collection(db, 'treinos')
            const q = query(
                treinosRef,
                orderBy('created', 'desc'),
                where('user', '==', user?.email)
            )

            onSnapshot(q, (snapshot) => {
                const lista = [] as TaskProps[]

                snapshot.forEach(doc => {
                    lista.push({
                        id: doc.id,
                        treino: doc.data().treino,
                        created: doc.data().created,
                        user: doc.data().user,
                        public: doc.data().public
                    })
                })

                setTreinos(lista)
            })

        }

        loadTarefas()
    }, [])

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked)
    }

    async function handleRegisterTask(event: FormEvent) {
        event.preventDefault()

        if (input === '') return

        try {
            await addDoc(collection(db, 'treinos'), {
                treino: input,
                created: new Date(),
                user: user?.email,
                public: publicTask
            })

            setInput('')
            setPublicTask(false)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleShare(id: string){
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/treino/${id}`
        )

        alert('URL Copiada com sucesso!')
    }

    async function handleDeleteWorkout(id: string){
        const docRef = doc(db, 'treinos', id)
        await deleteDoc(docRef)
    }

    return (
        <div className="w-full">
            <Head>
                <title>Painel de Treinos</title>
            </Head>

            <main className="pb-10">
                <section className="bg-black flex items-center justify-center">
                    <div className="w-full pb-7 mt-12 max-w-screen-lg px-5">
                        <h1 className="mb-2 text-white text-3xl font-bold">Qual seu treino?</h1>

                        <form onSubmit={handleRegisterTask}>
                            <Textarea 
                            placeholder="Digite seu treino" 
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                            value={input}
                            ></Textarea>

                            <div className="flex items-center my-3.5">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={publicTask}
                                    onChange={handleChangePublic}
                                />
                                <label
                                    className="text-white ml-2">Deixar treino público</label>
                            </div>

                            <button type="submit" className="w-full bg-blue-500 py-3 rounded-md text-white font-bold text-lg">Registrar</button>
                        </form>
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center">
                    <div className="max-w-screen-lg w-full flex flex-col items-center">
                        <h1 className="text-3xl font-bold my-8">Meus Treinos</h1>

                        <div className="w-full px-8 flex flex-col gap-4">
                            {
                                treinos.map(item => (
                                    <article key={item.id} className="border border-gray-500 rounded-md p-3.5">
                                        {
                                            item.public && (
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="bg-blue-500 px-3 py-0.5 rounded-md text-white text-sm">PÚBLICA</span>
                                                    <button onClick={() => handleShare(item.id)}>
                                                        <FaShare size={20} color="#3b82f6" />
                                                    </button>
                                                </div>
                                            )
                                        }

                                        <div className="flex justify-between">
                                            {
                                                item.public ? (
                                                    <Link href={`/treino/${item.id}`}>
                                                        <p className="whitespace-pre-wrap break-all">{item.treino}</p>
                                                    </Link>
                                                ) : (
                                                    <p className="whitespace-pre-wrap break-all">{item.treino}</p>
                                                )
                                            }
                                            <button onClick={() => handleDeleteWorkout(item.id)}>
                                                <FaTrash size={20} color="red" />
                                            </button>
                                        </div>
                                    </article>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            user: {
                email: session?.user?.email
            }
        }
    }
}