const $ = elemet => document.getElementById(elemet)
const $c = elemet => document.createElement(elemet)
function mostrarDatos() {
    let request = sendRequest('clientes', 'GET', '');
    const $TABLE = $('table-clientes');
    $TABLE.innerHTML = '';
    request.onload = function () {
        
        let data = request.response;
        data.forEach(data => {
            console.log('val');
            let { _id: id,
                nombres,
                apellidos,
                documento,
                correo,
                telefono,
                direccion } = data;
            
            const $TR = $c('tr');
            const $TDBTN = $c('td');
            const $BTNEDIT = $c('button');
            const $BTNDEL = $c('button');
                
            $BTNEDIT.setAttribute("type","button");
            $BTNEDIT.className = "btn btn-success";
            $BTNEDIT.textContent ='Editar';
            $BTNEDIT.onclick=()=>{
                window.location="./form-clientes.html?id="+id
            };
            $BTNDEL.setAttribute("type","button");
            $BTNDEL.className = "btn btn-danger";
            $BTNDEL.textContent ='Eliminar';
            $BTNDEL.onclick=()=>{
                deleteClient(id);
            };
            
            $TDBTN.appendChild($BTNEDIT);
            $TDBTN.appendChild($BTNDEL);
            $TR.appendChild($TDBTN);
            
            let newData =[
                nombres,
                apellidos,
                documento,
                correo,
                telefono,
                direccion];
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

function deleteClient(id) {
    console.log('hola', id);

    let request = sendRequest('clientes/' + id, 'DELETE', '');
    request.onload = function () {
        mostrarDatos();
    }
}
function guardarCliente(id) {
    
    let nombres = $('nombres').value;
    let apellidos = $('apellidos').value;
    let documento = $('documento').value;
    let correo = $('correo').value;
    let telefono = $('telefono').value;
    let direccion = $('direccion').value;
    let data ={
        'nombres':nombres,
        'apellidos':apellidos,
        'documento':documento,
        'correo':correo,
        'telefono':telefono,
        'direccion':direccion 
    }
    
    let request;
    if(id!==''){
        request = sendRequest('clientes/'+id,'PUT', data);
    }else{
        request = sendRequest('clientes/','POST', data);
    }

    request.onload = function () {
        window.location='./clientes.html'
    }
    request.onerror = () => {
        alert("eror")
    }
}

function cargarDatos(id) {
    let request = sendRequest('clientes/'+id, 'GET', '');
    request.onload = function () {
        
        let data = request.response;
        $('nombres').value = data.nombres;
        $('apellidos').value = data.apellidos;
        $('documento').value = data.documento;
        $('correo').value = data.correo;
        $('telefono').value = data.telefono;
        $('direccion').value = data.direccion;
    }
}