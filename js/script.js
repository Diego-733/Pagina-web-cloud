

function obtenerProductos() {

    const datos = localStorage.getItem("productos");

    if (datos === null) {
        return [];
    }

    try {
        return JSON.parse(datos);
    } catch (error) {
        console.error("Error leyendo productos:", error);
        return [];
    }
}



function guardarProductos(productos) {

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}



function generarId(productos) {

    if (productos.length === 0) {
        return 1;
    }

    const ids = productos.map(function(producto) {
        return Number(producto.id);
    });

    return Math.max(...ids) + 1;
}



function escaparHTML(texto) {

    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}




const formulario = document.getElementById("formProducto");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const nombre =
            document.getElementById("nombre").value.trim();

        const descripcion =
            document.getElementById("descripcion").value.trim();

        const precio =
            document.getElementById("precio").value.trim();


        let productos = obtenerProductos();

        const nuevoId = generarId(productos);


        const nuevoProducto = {

            id: nuevoId,
            nombre: nombre,
            descripcion: descripcion,
            precio: Number(precio)

        };


        productos.push(nuevoProducto);

        guardarProductos(productos);


        document.getElementById("mensaje").textContent =
            "Producto guardado correctamente. ID: " + nuevoId;


        formulario.reset();


        setTimeout(function() {

            window.location.href = "productos.html";

        }, 800);

    });
}




function mostrarProductos() {

    const lista =
        document.getElementById("listaProductos");

    if (!lista) {
        return;
    }


    const productos = obtenerProductos();

    lista.innerHTML = "";


    if (productos.length === 0) {

        lista.innerHTML =
            "<p>No hay productos registrados.</p>";

        return;
    }


    productos.forEach(function(producto) {

        const tarjeta =
            document.createElement("div");

        tarjeta.classList.add("producto");

        tarjeta.id = "producto-" + producto.id;


        tarjeta.innerHTML = `

            <h2>
                ${escaparHTML(producto.nombre)}
            </h2>

            <p>
                <strong>ID:</strong>
                ${producto.id}
            </p>

            <p>
                <strong>Descripción:</strong>
                ${escaparHTML(producto.descripcion)}
            </p>

            <p>
                <strong>Precio:</strong>
                $${Number(producto.precio).toLocaleString("es-CL")}
            </p>

            <div class="acciones">

                <button
                    class="boton-editar"
                    onclick="editarProducto(${producto.id})"
                >
                    Modificar
                </button>

                <button
                    class="boton-eliminar"
                    onclick="eliminarProducto(${producto.id})"
                >
                    Eliminar
                </button>

            </div>

        `;


        lista.appendChild(tarjeta);

    });
}



function editarProducto(id) {

    const productos = obtenerProductos();


    const producto = productos.find(
        function(producto) {

            return Number(producto.id) === Number(id);

        }
    );


    if (!producto) {
        return;
    }


    const tarjeta =
        document.getElementById("producto-" + id);


    tarjeta.innerHTML = `

        <h2>Modificar Producto</h2>

        <p>
            <strong>ID:</strong>
            ${producto.id}
        </p>


        <div class="form-editar">

            <label>
                Nombre
            </label>

            <input
                type="text"
                id="editarNombre-${producto.id}"
                value="${escaparHTML(producto.nombre)}"
            >


            <label>
                Descripción
            </label>

            <textarea
                id="editarDescripcion-${producto.id}"
            >${escaparHTML(producto.descripcion)}</textarea>


            <label>
                Precio
            </label>

            <input
                type="number"
                id="editarPrecio-${producto.id}"
                value="${producto.precio}"
                min="0"
            >


            <div class="acciones">

                <button
                    class="boton-guardar"
                    onclick="guardarCambios(${producto.id})"
                >
                    Guardar Cambios
                </button>


                <button
                    class="boton-cancelar"
                    onclick="mostrarProductos()"
                >
                    Cancelar
                </button>

            </div>

        </div>

    `;
}




function guardarCambios(id) {

    const nombre =
        document
            .getElementById("editarNombre-" + id)
            .value
            .trim();


    const descripcion =
        document
            .getElementById("editarDescripcion-" + id)
            .value
            .trim();


    const precio =
        document
            .getElementById("editarPrecio-" + id)
            .value
            .trim();


    // Validar campos
    if (
        nombre === "" ||
        descripcion === "" ||
        precio === ""
    ) {

        alert("Debes completar todos los campos.");

        return;
    }


    let productos = obtenerProductos();


    productos = productos.map(
        function(producto) {

            if (Number(producto.id) === Number(id)) {

                return {

                    id: producto.id,

                    nombre: nombre,

                    descripcion: descripcion,

                    precio: Number(precio)

                };

            }


            return producto;

        }
    );


    guardarProductos(productos);


    alert("Producto modificado correctamente.");


    mostrarProductos();
}



function eliminarProducto(id) {

    const confirmar = confirm(
        "¿Estás seguro de eliminar este producto?"
    );


    if (!confirmar) {
        return;
    }


    let productos = obtenerProductos();


    productos = productos.filter(
        function(producto) {

            return Number(producto.id) !== Number(id);

        }
    );


    guardarProductos(productos);


    mostrarProductos();
}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarProductos();

    }
);