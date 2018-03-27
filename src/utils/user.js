/**
 * User
 */
import { Storage } from './storage.js'; //引入Storage
const User = {
    getToken: function () {
        let token = null;
        if (Storage.getItemJson(Storage.uf)) {
            token = Storage.getItemJson(Storage.uf).token;
        };
        return token;
    },
    getUserId: function () {
        let userId = null;
        if (Storage.getItemJson(Storage.uf)) {
            userId = Storage.getItemJson(Storage.uf).id;
        };
        return userId;
    },
    getUf: function () {
        return Storage.getItemJson(Storage.uf);
    },
    outLogin: function () {
        Storage.removeItem(Storage.uf)
    }
}
export { User };
