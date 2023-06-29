const cuentas = [
    { nombre: 'Mali', password: '1', cuenta: 'Ahorros', numero: '748932456-2', saldo: 200, canje: 0, bolsillo: 0 },
    { nombre: 'Gera', password: '1', cuenta: 'Ahorros', numero: '987632456-4', saldo: 290, canje: 0, bolsillo: 0  },
    { nombre: 'Maui', password: '1', cuenta: 'Ahorros', numero: '234832456-8', saldo: 67 , canje: 0, bolsillo: 0 }
];

// obtener elementos por su id
getElement = (id, element) => {
    element = document.getElementById(id);
    return element
}

// obtener datos
const datos = (id) => {
    const campo = document.getElementById(id)
    return campo.value
}

// Crear titulo principal
const element = (element, textInfo, appendElemnt) => {
    element = document.createElement(element);
    element.innerHTML = textInfo
    appendElemnt.append(element)
}

element('h1', 'inicio de sesión', getElement('cajero-title', 'form'))

// modificar titulo
const modText = (texto,tag) => {
    tag = document.querySelector(tag)
    tag.textContent = texto
}

// añadir clase
const addClass = (id) => {
    clase = document.getElementById(id);
    clase.className = 'disabled';
}

// Eliminar una clase
const removClass = (id, removeClass) => {
    visible = document.getElementById(id);
    visible.classList.remove(removeClass);
}

// Inicio de sesión
const addCuentas = (userValid, passValid) => {
    cuentas.forEach(cuenta => {
        if (cuenta.nombre === userValid && cuenta.password === passValid) {
            addClass('cajero-login');
            nameText = `Hola, ${userValid}`
            modText(nameText,'h1');
            localStorage.setItem('user', JSON.stringify(cuenta))
        }
    });
}

// obtener el usuario
const userLogin = JSON.parse(localStorage.getItem('user'))

// Añadir saldo disponible
const addSaled = (element, clase, listUser) => {
    element = document.querySelectorAll(`.${clase}`)
    for (sale of element){
        sale.innerHTML = `$ ${listUser.saldo}`
    }
}

// Añadir solo un valor
const oneAddSale = (element,clase,listUser) => {
    element = document.querySelector(`.${clase}`)
    element.innerHTML = `$ ${listUser}`
    console.log(listUser);
}

oneAddSale('bolsillo','saldoBolsillo',userLogin.bolsillo)
oneAddSale('canje','saldoCanje',userLogin.canje)
document.addEventListener('click', function (e) {
    e.preventDefault();
    const numberAccount = e.target.textContent;
    if (numberAccount === 'Ingresar') {

        // obtener datos
        let user = datos('usuarios')
        let pass = datos('claves')

        // Validar inicio de sesión
        addCuentas(user, pass)

        // visible transacciones
        removClass('transacciones', 'disabled')
        
        // Mostrar saldo
        addSaled('addSale', 'saldoTotal',userLogin)
        
    }
    if (numberAccount === 'Consultar Saldo') {
        modText('Saldo','h2');
        removClass('saldo', 'disabled')
        addClass('retiro');
        addClass('ingreso');
    }

    if (numberAccount === 'Retirar monto') {
        let retiro = 'retiro'
        modText(retiro,'h2');
        removClass(retiro, 'disabled')
        addClass('saldo');
        addClass('ingreso');
    }

    if (numberAccount === 'Ingresar monto') {
        let ingreso = 'ingreso'
        modText(ingreso,'h2');
        removClass(ingreso, 'disabled')
        addClass('saldo');
        addClass('retiro');
    }

    if (numberAccount === 'Retirar'){
        let montoRetirar = Number(datos('retiroMonto'))
        let passRetirar = datos('claveRetiro')
        if (passRetirar === userLogin.password) {
            if (userLogin.saldo > 10) {
                userLogin.saldo -= montoRetirar
                console.log(userLogin);
                localStorage.setItem('user', JSON.stringify(userLogin))
                addSaled('addSale', 'saldoTotal',userLogin)
            }
        }
    }

})