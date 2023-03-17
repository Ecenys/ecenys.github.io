// Define la secuencia del código Konami
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA', 'Enter'];
	  
// Define una variable para almacenar la posición actual en el código Konami
let konamiCodePosition = 0;

// Agrega un listener de eventos al documento para detectar cuando se presionan las teclas
document.addEventListener('keydown', function(event) {
  // Comprueba si la tecla presionada es la siguiente en la secuencia del código Konami
  if (event.code === konamiCode[konamiCodePosition]) {
    konamiCodePosition++;
    // Si se ingresó el código completo, activa la acción deseada
    if (konamiCodePosition === konamiCode.length) {
      console.log('¡Activaste el código Konami!');
      const miImagen = document.getElementById("sprite1");
      miImagen.style.display = "block";

      //A los 5 segundos y medio, se vuelve a ocultar
      setTimeout(function() {
        miImagen.style.display = "none";
      }, 5500);
    }
  } else {
    // Si la tecla presionada no es la siguiente en la secuencia, reinicia el código Konami
    konamiCodePosition = 0;
  }
});