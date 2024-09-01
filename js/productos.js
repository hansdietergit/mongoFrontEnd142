const $ = elemet => document.getElementById(elemet)
const $c = elemet => document.createElement(elemet)

function mostrarDatos() {
    
    let request = sendRequest('productos', 'GET', '');
    const $TABLE = $('table-productos');
    $TABLE.innerHTML = '';

    request.onload = function () {        
        let data = request.response;
        data.forEach(data => {
            console.log('val');
            let { _id: id,
                nombres,
                descripcion,
                precio
                } = data;
            
            const $TR = $c('tr');
            const $TDBTN = $c('td');
            const $BTNEDIT = $c('button');
            const $BTNDEL = $c('button');
                
            $BTNEDIT.setAttribute("type","button");
            $BTNEDIT.className = "btn btn-success";
            $BTNEDIT.textContent ='Editar';
            $BTNEDIT.onclick=()=>{
                window.location="./form-productos.html?id="+id
            };
            $BTNDEL.setAttribute("type","button");
            $BTNDEL.className = "btn btn-danger";
            $BTNDEL.textContent ='Eliminar';
            $BTNDEL.onclick=()=>{
                deleteProductos(id);
            };
            
            $TDBTN.appendChild($BTNEDIT);
            $TDBTN.appendChild($BTNDEL);
            $TR.appendChild($TDBTN);
            
            let newData =[
                nombres,
                descripcion,
                precio];
            newData.forEach(d=>{
                const $TD = $c('td');                
                $TD.textContent  = d;
                $TR.appendChild($TD);
            })
            
            $TABLE.appendChild($TR);
        });

        request.onerror = () => {
            $TABLE.innerHTML = `
            <tr>
                <td colspan="">error</td>
            </tr>
            `
        }
    }
}

function deleteProductos(id) {
    console.log('hola', id);

    let request = sendRequest('productos/' + id, 'DELETE', '');
    request.onload = function () {
        mostrarDatos();
    }
}
function guardarProductos(id) {
    
    let nombres = $('nombres').value;
    let descripcion = $('descripcion').value;
    let precio = $('precio').value;
    let data ={
        'nombres':nombres,
        'descripcion':descripcion,
        'precio':precio
    }
    
    let request;
    if(id!==''){
        request = sendRequest('productos/'+id,'PUT', data);
    }else{
        request = sendRequest('productos/','POST', data);
    }

    request.onload = function () {
        window.location='./productos.html'
    }
    request.onerror = () => {
        alert("error")
    }
}

function cargarDatos(id) {
    let request = sendRequest('productos/'+id, 'GET', '');
    request.onload = function () {
        
        let data = request.response;
        $('nombres').value = data.nombres;
        $('descripcion').value = data.descripcion;
        $('precio').value = data.precio;
    }
}