'use client';

export default function MultimediaSection() {
  return (
    <section className="container mx-auto px-4 mt-12 mb-8">
      <h2 className="text-xl font-bold mb-4">Multimedia</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Video Highlights</h3>
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white">
            Video Player
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Photo Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <img key={i} src={`/gallery${i}.jpg`} alt="" className="w-full h-20 object-cover rounded" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}