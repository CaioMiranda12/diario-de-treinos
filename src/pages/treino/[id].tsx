import { Textarea } from "@/components/textarea";
import { db } from "@/services/firebaseConnection";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface WorkoutProps {
    item: {
        treino: string
        public: boolean
        created: string
        user: string
        workoutId: string
    },
    allComments: CommentProps[]
}

interface CommentProps {
    id: string
    comment: string
    workoutId: string
    user: string
    name: string
}

export default function Treino({ item, allComments }: WorkoutProps) {

    const { data: session } = useSession()
    const [input, setInput] = useState('')
    const [comments, setComments] = useState<CommentProps[]>(allComments || [])

    async function handleComment(event: FormEvent) {
        event.preventDefault()

        if (input === '') return

        if (!session?.user?.email || !session?.user?.name) return

        try {
            const docRef = await addDoc(collection(db, 'comments'), {
                comment: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                workoutId: item?.workoutId
            })

            const data = {
                id: docRef.id,
                comment: input,
                user: session?.user?.email,
                name: session?.user?.name,
                workoutId: item.workoutId
            }

            setComments([...comments, data])
            setInput('')
        } catch (err) {
            console.log(err)
        }
    }

    async function handleDeleteComment(id: string){
        try {
            const docRef = doc(db, 'comments', id)
            await deleteDoc(docRef)

            const newComments = comments.filter((item) => item.id !== id)

            setComments(newComments)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="max-w-screen-lg px-5 mx-auto">
            <Head>
                <title>Detalhes do Treino</title>
            </Head>

            <main className="my-8">
                <article className="border border-gray-400 p-3.5 leading-normal rounded-md ">
                    <p className="w-full whitespace-pre-wrap break-all">{item.treino}</p>
                </article>
            </main>

            <section className="my-8">
                <h2 className="text-2xl font-bold mb-3">Deixar comentário</h2>

                <form onSubmit={handleComment}>
                    <Textarea
                        placeholder="Digite seu comentário..."
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                        value={input}
                    ></Textarea>
                    <button
                        className="bg-purple-500 w-full py-4 rounded-md text-white text-xl my-3 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 active:opacity-60"
                        type="submit"
                        disabled={!session?.user}
                    >Enviar comentário</button>
                </form>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-3">Todos comentários</h2>

                {
                    comments.length === 0 && (
                        <p>Nenhum comentário foi encontrado...</p>
                    )
                }

                {
                    comments.map(item => (
                        <article key={item.id} className="border border-gray-400 p-3.5 rounded-md mb-3.5">
                            <div className="flex gap-2 items-center mb-2">
                                <label className="bg-gray-300 rounded-md w-max py-px px-2">{item.name}</label>
                                {
                                    item.user === session?.user?.email && (
                                        <button onClick={() => handleDeleteComment(item.id)}>
                                            <FaTrash size={18} color="#9333ea" />
                                        </button>
                                    )
                                }
                            </div>
                            <p className="whitespace-pre-wrap break-all">{item.comment}</p>
                        </article>
                    ))
                }
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string
    const docRef = doc(db, 'treinos', id)

    const snapshot = await getDoc(docRef)

    if (snapshot.data() === undefined) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    if (!snapshot.data()?.public) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000

    const workout = {
        treino: snapshot.data()?.treino,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        workoutId: id
    }

    const q = query(collection(db, 'comments'), where('workoutId', '==', id))
    const snapshotComments = await getDocs(q)

    const allComments: CommentProps[] = []

    snapshotComments.forEach(doc => {
        allComments.push({
            id: doc.id,
            comment: doc.data().comment,
            user: doc.data().user,
            name: doc.data().name,
            workoutId: doc.data().workoutId
        })
    })

    return {
        props: {
            item: workout,
            allComments: allComments
        }
    }
}