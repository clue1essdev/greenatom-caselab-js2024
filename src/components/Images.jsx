import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ImagesStore from "../stores/images-store.js";
ImagesStore.getImages();
const Images = observer(() => {
  const { images, changeModalState } = ImagesStore;
  useEffect(() => {
    const interval = setInterval(() => {
      ImagesStore.getImages();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {images.map((img, index) => {
        return (
          <section key={index} className="photo-container">
            <button
              onClick={() => {
                changeModalState(index);
              }}
              className="photo"
            >
              <img
                src={`http://localhost:8055/assets/${img.image}`}
                alt={`Изображение: ${
                  img.Name ? img.Name : "Забыли указать название!"
                }`}
              />
            </button>
            <p className="image-name">{`${
              img.Name ? img.Name : "Забыли указать название!"
            }`}</p>
          </section>
        );
      })}
    </>
  );
});

export default Images;
