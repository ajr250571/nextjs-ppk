import ViewImage from "@/components/ViewImage";

function RendPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mt-5">Rend. Diario</h1>
      <div className="mt-4">
        <ViewImage imagen="TurElitex.jpg" />
        <ViewImage imagen="TurCirc.jpg" />
      </div>
    </div>
  );
}

export default RendPage;
