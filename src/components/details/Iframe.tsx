export default function Iframe() {
  return (
    <div className="w-full aspect-283/178 py-17.5">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/lcvUGs3xaDM?si=l8Zw3rWEbFvet2gU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
