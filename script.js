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
  let currentPage = 1;
  let currentCategory = "";
  let currentFormat = "";
  let order = "";

  $('#load-more-btn').on('click', function() {
      currentPage++;
      ajax_request(currentCategory, currentFormat, order, false);
  });

  $('#photo-category-select').on('change', function() {
      console.log($(this).val());
      currentCategory = $(this).val();
      currentPage = 1;
      ajax_request(currentCategory, currentFormat, order, true);
  });

  $('#format-select').on('change', function() {
      currentFormat = $(this).val();
      currentPage = 1;
      ajax_request(currentCategory, currentFormat, order, true);
  });

  $('#sort-by').on('change', function() {
      order = $(this).val();
      currentPage = 1;
      ajax_request(currentCategory, currentFormat, order, true);
  });

  function ajax_request(category, format, order, replace) {
      const data = {
          'page': currentPage,
      };

      // Ajouter photo_categories uniquement si category n'est pas vide
      if (category) {
          console.log("ajout category");
          data['photo_categories'] = category;
      }

      // Ajouter formats uniquement si format n'est pas vide
      if (format) {
          console.log("ajout format");
          data['formats'] = format;
      }

      // Ajouter order uniquement si order n'est pas vide
      if (order) {
          console.log("ajout order");
          data['order'] = order;
      }
      
      console.log("data", data);
          
      $.ajax({
          url: ajax_object.rest_url_custom_pagination_photo,
          data: data,
          dataType: 'json',
          success: function(response) {
              console.log("response", response);
              console.log("response.html", response.html);

              if (replace) {
                  $("#photos-list").html(response.html); // on remplace le contenu (dans le cas d'un filtre)
              } else {
                  $("#photos-list").append(response.html); // on ajoute le contenu à la suite (dans le cas de la pagination)
              }
          },
          error: function(response) {
              console.log('error', response);
          }
      });
  }
});





  
  
