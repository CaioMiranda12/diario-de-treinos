import Head from "next/head";
import { CgGym } from "react-icons/cg";

export default function Home() {
  return (
    <div className="bg-black h-homeMain flex items-center justify-center px-10">
      <Head>
        <title>Treinos+</title>
      </Head>

      <main className="flex flex-col gap-6 max-w-screen-lg w-full">
        <CgGym size={100} color="red"/>

        <h1 className="text-white text-2xl font-bold leading-relaxed sm:text-4xl">TREINE SEU CORPO <br /> <span className="text-red-600">DA MELHOR FORMA</span></h1>
        <p className="text-gray-400 sm:text-xl">
          Gym training is a structured and disciplined approach to physical exercise that <br /> focuses on strength, endurance and overall fitness improvement.
        </p>
        
        <div className="text-white flex justify-between sm:justify-around px-3">
          <section className="flex flex-col text-center">
            <span className="text-red-600 text-2xl font-bold sm:text-4xl">+</span>
            <span className="text-white sm:text-2xl">Resultados</span>
          </section>

          <section className="flex flex-col text-center border-x sm:border-none px-6">
            <span className="text-red-600 text-2xl font-bold sm:text-4xl">+</span>
            <span className="text-white sm:text-2xl">Qualidade</span>
          </section>

          <section className="flex flex-col text-center">
            <span className="text-red-600 text-2xl font-bold sm:text-4xl">+</span>
            <span className="text-white sm:text-2xl">Rápido</span>
          </section>
        </div>
      </main>
    </div>
  );
}
