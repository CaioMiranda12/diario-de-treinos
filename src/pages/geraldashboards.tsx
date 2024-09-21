import { db } from "@/services/firebaseConnection"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaShare } from "react-icons/fa"

interface TaskProps {
    id: string,
    treino: string,
    created: Date,
    user: string,
    public: boolean
}


export default function GeralDashboards() {
    const [treinos, setTreinos] = useState<TaskProps[]>([])

    useEffect(() => {
        async function loadTarefas() {
            const treinosRef = collection(db, 'treinos')
            const q = query(
                treinosRef,
                where('public', '==', true)
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

    async function handleShare(id: string) {
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/treino/${id}`
        )

        alert('URL Copiada com sucesso!')
    }

    return (
        <main className="w-full flex justify-center items-center">
            <section className="w-full max-w-screen-lg px-5">
                <h1 className="text-3xl font-bold my-10 text-center">Treinos Públicos</h1>

                <div className="flex flex-col gap-5">
                    {
                        treinos.map(item => (
                            <article key={item.id} className="border border-gray-500 rounded-md p-3.5">
                                {
                                    item.public && (
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="bg-purple-500 px-3 py-0.5 rounded-md text-white text-sm">PÚBLICO</span>
                                            <button onClick={() => handleShare(item.id)}>
                                                <FaShare size={20} color="#7e22ce" />
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
                                </div>
                            </article>
                        ))
                    }
                </div>
            </section>
        </main>
    )
}