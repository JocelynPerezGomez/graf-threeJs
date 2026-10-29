import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';

// 1. Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Iluminación
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// 3. Crear los 3 cubos (Verde, Azul, Rojo)
// CAMBIO 1: Agregamos "velocidadRotacion" a cada cubo en los datos
const cubosData = [
    { color: 0x00ff00, posX: -3, velocidadRotacion: 0.01 }, // Verde
    { color: 0x0000ff, posX: 0,  velocidadRotacion: 0.04 }, // Azul 
    { color: 0xff0000, posX: 3,  velocidadRotacion: 0.08} // Rojo 
];

const cubes = [];

cubosData.forEach(data => {
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({ color: data.color });
    const cube = new THREE.Mesh(geometry, material);
    
    cube.position.x = data.posX;
    
    // Rotación inicial
    cube.rotation.x = 0.5;
    cube.rotation.y = 0.5;
    
    // CAMBIO 2: Guardamos la velocidad dentro del objeto cubo (userData)
    // para poder usarla después en la animación
    cube.userData = { velocidad: data.velocidadRotacion };
    
    scene.add(cube);
    cubes.push(cube);
});

// 4. Posicionar la cámara
camera.position.z = 8;

// 5. Función de animación
function animate() {
    cubes.forEach(cube => {
        // CAMBIO 3: Usamos la velocidad guardada en lugar de un número fijo
        cube.rotation.x += cube.userData.velocidad; 
        cube.rotation.y += cube.userData.velocidad; 
    });
    
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// Ajustar el tamaño si se cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});