// Variables globales
let area;
let cube;
let cubes = [];
let i = 0;
let iz = 60;

// Área para el proyecto
let main = document.getElementsByTagName("main")[0];
area = document.createElement("div");
area.classList.add("container");
area.style.border = "2px solid red";
area.style.height = "400px";
area.style.position = "relative";
area.addEventListener("mousemove", getCoordinates)
main.parentElement.insertBefore(area, main);


//Creamos el area de los borrados
area2 = document.createElement("div");
area2.classList.add("container2");
area2.style.border = "2px solid black";
area2.style.height = "100px";
area2.style.position = "relative";
area2.style.padding = "10px"
main.parentElement.insertBefore(area2, main);



// Cubo inicial
cube = document.createElement("div");
cube.style.background = "red";
cube.style.width = "50px";
cube.style.height = "50px";
cube.style.position = "absolute";
cube.style.top = "100px";
cube.style.left = "150px";
area.appendChild(cube);

//Función para mover hacia arriba el cubo inicial
function moveUp(cube) {
    let top = cube.offsetTop;
    top -= 10;
    top = (top < 0) ? 0 : top;
    cube.style.top = top + "px";
}
//Función para mover hacia abajo el cubo inicial
function moveDown(cube) {
    let top = cube.offsetTop;
    top += 10;
    top = (top > area.offsetHeight - cube.offsetHeight) ? area.offsetHeight
        - cube.offsetHeight : top;
    cube.style.top = top + "px";
}
//Función para mover hacia la izquieda el cubo inicial
function moveLeft(cube) {
    let left = cube.offsetLeft;
    left -= 10;
    left = (left < 0) ? 0 : left;
    cube.style.left = left + "px";
}
//Función para mover hacia la derecha el cubo inicial
function moveRight(cube) {
    let left = cube.offsetLeft;
    left += 10;
    left = (left > area.offsetWidth - cube.offsetWidth) ? area.offsetWidth -
        cube.offsetWidth : left;
    cube.style.left = left + "px";
}
//Función para cambiar el color aleatoriamente
function randomColor(cube) {
    let r = Math.floor((Math.random() * 256));
    let g = Math.floor((Math.random() * 256));
    let b = Math.floor((Math.random() * 256));
    cube.style.background = `rgb(${r}, ${g}, ${b})`;
}

//Función para hacer más grande el cubo
function makeBigger(cube) {

    //Definimos unas variables que guardan datos del cubo
    // y la altura del area 
    let width = cube.offsetWidth;
    let height = cube.offsetHeight;

    let area1 = area.offsetHeight;
    let top = cube.offsetTop;

    //Controlamos que el cubo no se salga del area
    if (!(top > (area1 - height))) {

        //Incrementamos la altura y la anchura
        width = width + 5;
        height = height + 5;

        //Se lo aplicamos al cubo
        cube.style.width = width + "px";
        cube.style.height = height + "px";

    }

}


//Función que hace más pequeño el cubo hasta llegar al mínimo
function makeSmaller(cube) {

    //Guardamos la altura y anchura del cubo
    let width = cube.style.width;
    let height = cube.style.height;

    //Controlamos que el cubo no pueda ser más pequeño que 10px
    if (!((width == "10px") && (height == "10px"))) {
        let width = cube.offsetWidth;
        let height = cube.offsetHeight;


        //Decrementamos la altura y la anchura
        width = width - 5;
        height = height - 5;

        //Se lo aplicamos al cubo
        cube.style.width = width + "px";
        cube.style.height = height + "px";
    }


}



let acctions = [];


function addAction(action) {
    let span = document.createElement("span");
    acctions.push({
        action: action,
        span: span
    });
    span.textContent = action;
    span.style.padding = "10px";
    span.style.border = "1px solid #ddd";
    span.style.display = "block";
    span.style.float = "left";
    span.style.margin = "2px";
    span.style.cursor = "pointer";
    span.classList.add("span");

    span.addEventListener("mouseenter", function () {
        this.style.backgroundColor = "red";
        this.style.color = "white";
    })
    span.addEventListener("mouseleave", function () {
        this.style.backgroundColor = "white";
        this.style.color = "black";
    })

    span.addEventListener("click", function () {
        let index = acctions.findIndex((action) => {
            return action.span === this;
        })
        acctions.splice(index, 1);
        this.remove();
    })

    area.appendChild(span);
}

//Evento para añadir las teclas del primer cubo
document.addEventListener("keydown", function (event) {
    console.log(event.code);
    switch (event.code) {
        case "ArrowUp":
            addAction("up");
            break;
        case "ArrowDown":
            addAction("down");
            break;
        case "ArrowLeft":
            addAction("left");
            break;
        case "ArrowRight":
            addAction("right");
            break;
        case "KeyC":
            addAction("color");
            break;
        case "BracketRight":
            addAction("more");
            break;
        case "Slash":
            addAction("less");
            break;
        case "Enter":
            executeAcctions();
            break;
        default:
            break;
    }
    event.preventDefault();
});

//Función para ejecutar las acciones que se pasa con las teclas
function executeAcctions() {
    if (acctions.length > 0) {
        let action = acctions.shift();
        switch (action.action) {
            case "up":
                moveUp(cube);
                break;
            case "down":
                moveDown(cube);
                break;
            case "left":
                moveLeft(cube);
                break;
            case "right":
                moveRight(cube);
                break;
            case "color":
                randomColor(cube);
                break;
            case "more":
                makeBigger(cube);
                break;
            case "less":
                makeSmaller(cube);
                break;
            default:
                break;
        }
        action.span.remove();
        setTimeout(executeAcctions, 50);
    }
}


//Declaramos el contenedor donde van los cubos
let contain = document.getElementsByClassName("container");


//Creamos nuestro evento personalizado
let nuevoCubo = new Event(area.addEventListener("click", function (elem) {


    if ((elem.target.classList[0] == "container")) {
        let cube1 = document.createElement("div");

        i++;

        cubes.push({
            instance: i,
            cube: cube1,
        });

        cube1.textContent = i;
        cube1.classList.add("cube2");
        cube1.style.background = "red";
        cube1.style.width = "50px";
        cube1.style.height = "50px";
        cube1.style.position = "absolute";
        cube1.style.left = (x - 10) + "px";
        cube1.style.top = (y - 10) + "px";

        //Si pulsamos sobre un nuevo cubo
        cube1.addEventListener("click", function (elemento) {
            //Si pulsamos sobre cube2 que es el cuadrado que esta en la parte grande
            if (elemento.target.classList[0] == "cube2") {

                let index = cubes.findIndex((cu) => {
                    return cu.cube === this;
                });

                cubes.splice(index, 1);
                this.remove();


                //Colocamos los cuadrados
                cube1.style.top = "40px";
                cube1.style.left = iz + "px";

                iz = iz + 80;

                //Solo vamos a permitir una número de cuadrados
                if (iz > area2.offsetWidth - cube1.offsetWidth) {
                    alert("No se pueden guardar más cuadrados!");
                } else {
                    //Quitamos la classlist de cube2 y le añadimos cube3 para diferenciar que se ha borrado
                    cube1.classList.remove("cube2");
                    cube1.classList.add("cube3");
                    area2.appendChild(cube1);
                }

            }

        });

        area.appendChild(cube1);


        //Para los nuevos cubos, ya que solo se les cambiará el color
        document.addEventListener("keydown", function (event) {

            switch (event.code) {
                case "KeyC":
                    addAction("color");
                    break;
                case "Enter":

                    executeAcctions();
                    break;
                default:
                    break;
            }
            event.preventDefault();



        });


        //Función para ejecutar el cambio de color
        function executeAcctions() {
            if (acctions.length > 0) {
                let action = acctions.shift();
                switch (action.action) {
                    case "color":

                        if ((cube1.classList[0] != "cube3")) {
                            randomColor(cube1);
                        }
                        break;
                    default:
                        break;
                }
                action.span.remove();
                setTimeout(executeAcctions, 50);
            }
        }

    }

}));

//Lanzamos nuestro evento personalizado
area.dispatchEvent(nuevoCubo);

//Función que nos devuelve las coordenadas donde está el ratón
function getCoordinates(event) {
    x = event.clientX;
    y = event.clientY;

    document.getElementById("x").value = x;
    document.getElementById("y").value = y;


}
//Le damos com valor a los inputs de la x y la y los que sacamos de la función
//getCoordinates
document.getElementById("x").value = x;
document.getElementById("y").value = y;
