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

// changement du menu burger en croix au clic et animation des titres du menu  
const burger = document.querySelector('.burger');
const titlesNav = document.querySelectorAll('.menu li ');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');             // ajout de la class active au clic de la div Burger
    
      if (burger.classList.contains('active')) {     
        setTimeout(() => {
          titlesNav.forEach(title => {               // parcourt tous les titres du menu nav
            title.classList.add('animated');        // ajout de la class animated à chaque titre
          });
        }, "500");                                // l'animation des titres est réalisée après 0,5 seconde
    } else {
      titlesNav.forEach(title => {               
          title.classList.remove('animated');    
      });
    }
  });


// pour que le burger affiche le menu au clic 
document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.menu').classList.toggle('is-active');
  console.log('is-active')
}); 

