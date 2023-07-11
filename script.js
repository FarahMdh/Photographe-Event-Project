console.log ("ça fonctionne")

document.addEventListener("DOMContentLoaded", function() {
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

    const lineBreakTitles = document.querySelectorAll(".line-break-title");
    
    lineBreakTitles.forEach(function(title) {
      const words = title.textContent.split(" ");
      title.innerHTML = words.join("<br>");
    });
  
  
// pour que le champs REF.PHOTO soit prérempli automatiquement dans la modale de contact 

  const contactButton = document.querySelector('.contact-button');
  const modalRefField = document.querySelector('.number-ref');

  if (contactButton && modalRefField) {
    contactButton.addEventListener('click', function(event) {
      event.preventDefault();
      
      const referenceElement = document.querySelector('.post-reference');
      const reference = referenceElement ? referenceElement.textContent.trim().replace('Référence : ', '') : '';
      
      modalRefField.value = reference;
      
    });
  }
});


// pour afficher le menu au clic du burger 

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const main = document.querySelector('.main-body');
const footer = document.querySelector('.footer-test');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');                         // ajout de la classe active au burger
    menu.classList.toggle('is-active');                         //affichage du menu au clic du burger     
    main.classList.toggle('fixed');
    footer.classList.toggle('fixed');                   
});


// pour que le menu soit caché au clic des titres 
const navLinks = document.querySelectorAll('.menu li');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('is-active');
    burger.classList.remove('active');
    main.classList.remove('fixed');
    footer.classList.remove('fixed');
    titlesNav.forEach(title => {
      title.classList.remove('animated');

    });
  });
});


