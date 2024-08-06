import { makeAutoObservable,  runInAction } from "mobx";
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
        runInAction(() => {if (images.length !== this.images.length) this.images = images});
      } catch (er) {
        console.log(er);
      }
    }

    changeModalState = (ind) => {
        this.modalShowing? this.modalShowing = false : this.modalShowing = true;
        this.index = ind;
    }
    incrementIndex = () => {
        if (this.index < this.images.length - 1) this.index++;
    }
    decrementIndex = () => {
        if (this.index) this.index--;
    }
    getImageSides = (img) => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const image = new Image();
        image.src = img;
        const imageWidth = image.width;
        const imageHeight = image.height;
        const imageProportion = imageHeight / imageWidth;
        const biggestWindowSide = Math.max(windowHeight, windowWidth);
        const biggestImageSide = Math.max(imageHeight, imageWidth);
        const imageWindowProportion = biggestImageSide / biggestWindowSide;
        let sidesObj = {};
        if (imageWidth === imageHeight) {

          return {
            height: Math.floor((imageHeight / imageWindowProportion / 100) * 40),
            width: Math.floor((imageWidth / imageWindowProportion / 100) * 40),
          };
        }
      
        const imgOrient = biggestImageSide === imageWidth ? "wide" : "tall";
        const windowOrient = biggestWindowSide === windowWidth ? "wide" : "tall";
        if (imgOrient === "tall" && windowOrient === "tall") {
          sidesObj = {
            height: Math.floor((imageHeight / imageWindowProportion / 100) * 50),
            width: Math.floor(
              ((imageHeight / imageWindowProportion / 100) * 50) / imageProportion)
          }
          return sidesObj;
        } else if (imgOrient === "wide" && windowOrient === "wide") {
            sidesObj = {
                height:  Math.floor( (imageWidth / imageWindowProportion / 100) * 50 * imageProportion),
                width: Math.floor((imageWidth / imageWindowProportion / 100) * 50),
          }
          return sidesObj;
        } else if (imgOrient === "tall" && windowOrient === "wide") {
            sidesObj = {
                height: Math.floor((windowHeight / 100) * 60), 
                width:  Math.floor(((windowHeight / 100) / imageProportion * 60)),
            }
            return sidesObj;
        } else if (imgOrient === "wide" && windowOrient === "tall") {
            sidesObj = {
                height: Math.floor((windowWidth / 100) * imageProportion * 70), 
                width:  Math.floor(((windowWidth / 100) * 70)),
                  }
            return sidesObj;
        }
      }
}

export default new ImagesStore();

