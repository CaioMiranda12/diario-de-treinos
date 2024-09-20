import { Textarea } from "@/components/textarea";
import Head from "next/head";
import { FaShare } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export default function Dashboard() {
    return (
        <div className="w-full">
            <Head>
                <title>Painel de Treinos</title>
            </Head>

            <main className="">
                <section className="bg-black w-full flex items-center justify-center px-8">
                    <div className="w-full pb-7 mt-12">
                        <h1 className="mb-2 text-white text-2xl font-bold">Qual seu treino?</h1>

                        <form>
                            <Textarea placeholder="Digite seu treino"></Textarea>

                            <div className="flex items-center my-3.5">
                                <input type="checkbox" className="w-4 h-4" />
                                <label className="text-white ml-2">Deixar treino público</label>
                            </div>

                            <button type="submit" className="w-full bg-blue-500 py-3 rounded-md text-white font-bold text-lg">Registrar</button>
                        </form>
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center w-full mt-6">
                    <h1 className="text-2xl font-bold my-4">Minhas tarefas</h1>

                    <div className="w-full px-8 flex flex-col gap-4">
                        <article className="border rounded-md p-3.5">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500 px-3 py-0.5 rounded-md text-white text-sm">PÚBLICA</span>
                                <button>
                                    <FaShare size={20} color="#3b82f6"/>
                                </button>
                            </div>

                            <div className="flex justify-between">
                                <p>Estudar JavaScript</p>
                                <button><FaTrash size={20} color="red"/></button>
                            </div>
                        </article>

                        <article className="border rounded-md p-3.5">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500 px-3 py-0.5 rounded-md text-white text-sm">PÚBLICA</span>
                                <button>
                                    <FaShare size={20} color="#3b82f6"/>
                                </button>
                            </div>

                            <div className="flex justify-between">
                                <p>Estudar JavaScript</p>
                                <button><FaTrash size={20} color="red"/></button>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        </div>
    )
}