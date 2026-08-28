

function obtenerProductos() {
    const datos = localStorage.getItem("productos");

    if (datos) {
        return JSON.parse(datos);
    }

    return [];
}



const formulario = document.getElementById("formProducto");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const id = document.getElementById("id").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const precio = document.getElementById("precio").value.trim();

        let productos = obtenerProductos();

        // Revisar si el ID ya existe
        const existe = productos.some(function(producto) {
            return producto.id === id;
        });

        if (existe) {
            document.getElementById("mensaje").textContent =
                "Ya existe un producto con ese ID.";

            return;
        }

        const nuevoProducto = {
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio
        };

        productos.push(nuevoProducto);

        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );

        document.getElementById("mensaje").textContent =
            "Producto guardado correctamente.";

        formulario.reset();

        console.log("Productos guardados:", productos);
    });
}



function mostrarProductos() {

    const lista = document.getElementById("listaProductos");

    
    if (!lista) {
        return;
    }

    const productos = obtenerProductos();

    console.log("Productos encontrados:", productos);

    lista.innerHTML = "";

    if (productos.length === 0) {

        lista.innerHTML = `
            <p>No hay productos registrados.</p>
        `;

        return;
    }

    productos.forEach(function(producto) {

        const tarjeta = document.createElement("div");

        tarjeta.className = "producto";

        tarjeta.innerHTML = `
            <h2>${producto.nombre}</h2>

            <p>
                <strong>ID:</strong>
                ${producto.id}
            </p>

            <p>
                <strong>Descripción:</strong>
                ${producto.descripcion}
            </p>

            <p>
                <strong>Precio:</strong>
                $${Number(producto.precio).toLocaleString("es-CL")}
            </p>

            <button onclick="eliminarProducto('${producto.id}')">
                Eliminar
            </button>
        `;

        lista.appendChild(tarjeta);
    });
}



function eliminarProducto(id) {

    let productos = obtenerProductos();

    productos = productos.filter(function(producto) {
        return producto.id !== id;
    });

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    mostrarProductos();
}


document.addEventListener("DOMContentLoaded", function() {
    mostrarProductos();
});