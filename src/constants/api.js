//cambiar la url de la api al desplegar
/*const API_URL_LOGIN='https://apsscai.ddns.net:3300'
const API_BACK="https://cloudsena-itj7.onrender.com"
const API_URL="https://apsscai.ddns.net:3300" */
const API_URL="http://localhost:3300"
const URL={
    USER: `${API_URL}/users`,
    LOGIN: `${API_URL}/login`,
    //igual, se deb cambiar de acuerdo a la api
    //LOGIN: `${API_URL_LOGIN}/login`,
    COMPRADORS:`${API_URL}/compradors`,
    VENDEDORS: `${API_URL}/vendedors`,
    PRODUCTOS: `${API_URL}/productos`,
    PUJAS: `${API_URL}/pujas`,
    SUBASTAS: `${API_URL}/subastas`,
    VENTAS:`${API_URL}/ventas`,
    REGISTER: `${API_URL}/login/register`,
    //igual, se deb cambiar de acuerdo a la api
    //REGISTER: `${API_URL_LOGIN}/login/register`,
    API:`${API_URL}`
}

export default URL