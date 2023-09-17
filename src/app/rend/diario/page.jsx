import ViewImage from "@/components/ViewImage";

function RendPage() {
  return (
    <div>
      <h1 className="text-primary text-2xl font-bold">Rend. Diario</h1>
      <div className="mt-4">
        <ViewImage imagen="TurElitex.jpg" />
        <ViewImage imagen="TurCirc.jpg" />
      </div>
    </div>
  );
}

export default RendPage;
