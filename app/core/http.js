/**
 *  http.js
 *  @version: 1.0.0
 *  @author: DWIT MÉXICO
 *  @description: Cliente HTTP para todas las peticiones a la api
 *  @url: https://betademoapp.herokuapp.com
 */

import Client from "superagent";

//General
const baseUrl = "https://betademoapp.herokuapp.com"; //api test

process.env.API_URL = baseUrl;

class Request {

    post(url, data) {

        const result = Client.post(baseUrl + url)
            .send(data)
            .then((res) => {
                return res.body;
            })
            .catch((err) => {
                if (err.message) {
                    if (err.message.indexOf("Access-Control-Allow-Origin") !== -1)
                        return {
                            timeout: true,
                            message: "Ups! Parace que no tiene conexión a internet.",
                        };
                    else return { error: true, message: err.message };
                } else return { error: true, message: "Error de conexión" };
            });

        return result;
    }
}

export { baseUrl };
export default Request;