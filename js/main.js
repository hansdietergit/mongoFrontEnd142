
const $ = elemet => document.getElementById(elemet)
const $c = elemet => document.createElement(elemet)
const apiUrl = 'https://backend142.onrender.com/api/';

document.addEventListener('DOMContentLoaded', function() {
    // Your code here
    //clientes();
  });

const a = async () => {
    const DATA = await get(apiUrl, 'clientes')
    console.log(DATA);
}
    
//a();
async function clientes() {
    const PATH = 'clientes'
    const TABLE = $('table-main')
    const THEAD = $c('thead')
    const TBODY = $c('tbody')
    const DATA = await get(apiUrl, PATH)

    THEAD.innerHTML = `
    <th>Nombres</th>
    <th>Apellidos</th>
    <th>Documentos</th>
    <th>Correo</th>
    <th>Teléfono</th>
    <th>Dirección</th>
    `;

    DATA.forEach(data => {
        let { nombres,
            apellidos,
            documento,
            correo,
            telefono,
            direccion } = data;
        const TR = $c('tr');
        TR.innerHTML = `
        <td>${nombres}</td>
        <td>${apellidos}</td>
        <td>${documento}</td>
        <td>${correo}</td>
        <td>${telefono}</td>
        <td>${direccion}</td>
        `
        TBODY.appendChild(TR);
    });

    TABLE.appendChild(THEAD);
    TABLE.appendChild(TBODY);
}
async function get(api, path) {
    const URL = `${api}${path}`
    let response;
    response = await fetch(URL);
    if (!response.ok) {
        throw new Error(`Network response was not ok at ${path}`);
    }
    const data = await response.json()
    return data;
}