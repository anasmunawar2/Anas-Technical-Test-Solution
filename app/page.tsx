import Head from "next/head";
import DraggableList from "../components/DraggableList.tsx";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Draggable List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        <DraggableList />
      </main>
    </div>
  );
};

export default Home;
