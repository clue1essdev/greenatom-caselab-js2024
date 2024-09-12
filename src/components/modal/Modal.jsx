import "./Modal.css";
import { observer } from "mobx-react-lite";
import ImagesStore from "../../stores/images-store.js";

const Modal = observer(() => {
  const {
    images,
    modalShowing,
    index,
    changeModalState,
    incrementIndex,
    decrementIndex,
  } = ImagesStore;
  const leftArrow = index ? (
    <button className="arrow-left-btn" onClick={decrementIndex}>
      <img
        src="..//..//public/arrow-sm-left-svgrepo-com.svg"
        alt="Кнопка предыдущее изображение"
      ></img>
    </button>
  ) : undefined;
  const rightArrow =
    index < images.length - 1 ? (
      <button className="arrow-right-btn" onClick={incrementIndex}>
        <img
          src="..//..//public/arrow-sm-right-svgrepo-com.svg"
          alt="Кнопка следующее изображение"
        ></img>
      </button>
    ) : undefined;

  return (
    <>
      {modalShowing && (
        <div className="modal">
          <div className="overlay"></div>
          <div
            className="modal-content"
          >
            <img
              className="modal-img"
              src={`http://localhost:8055/assets/${images[index].image}`}
              alt={`Изображение ${images[index].Name}`}
            ></img>
            <div className="modal-controls">
              <div className="counter-container">
                <p>
                  {index + 1} / {images.length}
                </p>
              </div>
              <div className="arrows-container">
                <div>{leftArrow}</div>
                <div>{rightArrow}</div>
              </div>
              <button className="close-modal-btn" onClick={changeModalState}>
                <img
                  src="..//..//public/cross-svgrepo-com.svg"
                  alt="Кнопка закрыть модальное окно"
                ></img>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Modal;
