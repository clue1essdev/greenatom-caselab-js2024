import { readItems } from "@directus/sdk";
import api from "./directusCl";
export default class RequestHandler {
    static async getImages() {
        return api.request(readItems("images"));
    }
}