import { makeAutoObservable, runInAction } from "mobx";
import RequestHandler from "./requestHandler";

class ImagesStore {
  modalShowing = false;
  index = 0;
  images = [];
  constructor() {
    makeAutoObservable(this);
  }

  getImages = async () => {
    try {
      const images = await RequestHandler.getImages();
      runInAction(() => {
        if (images.length !== this.images.length) this.images = images;
      });
    } catch (er) {
      console.log(er);
    }
  };

  changeModalState = (ind) => {
    this.modalShowing
      ? (this.modalShowing = false)
      : (this.modalShowing = true);
    this.index = ind;
  };
  incrementIndex = () => {
    if (this.index < this.images.length - 1) this.index++;
  };
  decrementIndex = () => {
    if (this.index) this.index--;
  };
}

export default new ImagesStore();
