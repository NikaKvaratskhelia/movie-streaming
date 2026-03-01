import Actors from "./Actors";

export default function ActorPageLayout() {
  return (
    <div className="min-h-screen bg-black mt-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Actors</h1>
      <div className="w-full px-4 pb-8 lg:pb-12 my-4 py-10 mx-auto">
        <Actors />
      </div>
    </div>
  );
}
