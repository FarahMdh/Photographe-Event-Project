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
    const lineBreakTitles = document.querySelectorAll(".line-break-title");
    
    lineBreakTitles.forEach(function(title) {
      const words = title.textContent.split(" ");
      title.innerHTML = words.join("<br>");
    });
  });
  
// pour que le champs REF.PHOTO soit prérempli automatiquement dans la modale de contact 
document.addEventListener('DOMContentLoaded', function() {
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

// création du bouton charger plus 

jQuery(document).ready(function($) {
    var page = 1; // Page courante
    var postsPerPage = 8; // Nombre de photos à afficher par page
    var container = $('.thumbnail-container');
    var loadMoreBtn = $('#load-more-btn');

    loadMoreBtn.on('click', function() {
        // Effectuer une nouvelle requête pour charger plus de photos
        $.ajax({
            url: '<?php echo get_site_url() . '/wp-json/custom-photos/v1/load-more/' ?>' + page,
            type: 'GET',
            beforeSend: function() {
                loadMoreBtn.text('Chargement...'); // Changer le texte du bouton pendant le chargement
            },
            success: function(response) {
                container.append(response); // Ajouter les nouvelles photos à la fin du conteneur

                page++; // Augmenter le numéro de page

                // Vérifier si toutes les photos ont été chargées
                if (response === '') {
                    loadMoreBtn.text('Aucune photo supplémentaire'); // Modifier le texte du bouton
                    loadMoreBtn.prop('disabled', true); // Désactiver le bouton
                } else {
                    loadMoreBtn.text('Charger plus'); // Rétablir le texte du bouton
                }
            },
            error: function() {
                loadMoreBtn.text('Erreur lors du chargement'); // Afficher un message d'erreur
            }
        });
    });
});





  
  
