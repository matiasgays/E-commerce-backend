const array = ["Matias","Juan","Claudio"];
console.log (mostrarLista(array));

function mostrarLista(array) {
    if (array == null) return console.log("lista vacio");
    array.forEach(element => {
        console.log(element);    
    });
    return array.length;
}