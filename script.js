console.log ("ça fonctionne")

// apparition / disparition de la modale de contact au clic de Contacter
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
    modalContainer.classList.toggle("active")

}

// pour relier la modale de contact au bouton Contact dans le menu 
const contactTrigger = document.querySelector(".menu-item-12 > a");

contactTrigger.addEventListener("click", toggleModal);

function toggleModal(event) {
  event.preventDefault();
  modalContainer.classList.toggle("active");
}

// pour relier la modale de contact au bouton sur le post ACF
const contactTriggerCPT = document.querySelector(".contact-button");
contactTriggerCPT.addEventListener("click", toggleModal);

function toggleModal(event) {
  event.preventDefault();
  modalContainer.classList.toggle("active");
}

//pour que les titres de plusieurs mots aillent à la ligne 
document.addEventListener("DOMContentLoaded", function() {
    var lineBreakTitles = document.querySelectorAll(".line-break-title");
    
    lineBreakTitles.forEach(function(title) {
      var words = title.textContent.split(" ");
      title.innerHTML = words.join("<br>");
    });
  });
  