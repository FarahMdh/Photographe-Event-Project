// LIGHTBOX 

  // pour afficher la lightbox
  function showLightbox(photo_id) {
      var lightbox = document.querySelector('.lightbox');
      lightbox.style.display = 'block';
      document.body.style.overflow = 'hidden';
      var images = lightbox.querySelectorAll(".thumbnail-lightbox");
      images.forEach(image => {
        image.style.display = "none";
        image.classList.remove("active"); // Retirer la classe 'active' pour toutes les images
      });
      var image = lightbox.querySelector(`.thumbnail-lightbox[data-id="${photo_id}"]`)
      image.style.display = "block";
      image.classList.add("active"); // Ajouter la classe 'active' à l'image affichée

    }
  

  // pour masquer la lightbox
  function hideLightbox() {
    var lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  //pour afficher l'image suivante
  function showNextImage() {
    var activeImage = document.querySelector('.thumbnail-lightbox.active');
    var nextImage = activeImage.nextElementSibling;
    if (!nextImage) {
      nextImage = document.querySelector('.thumbnail-lightbox:first-of-type');
    }
    activeImage.classList.remove('active');
    nextImage.classList.add('active');
    showLightbox(nextImage.dataset.id);
  }
  
  
  //pour afficher l'image précédente
  function showPreviousImage() {
    var activeImage = document.querySelector('.thumbnail-lightbox.active');
    var previousImage = activeImage.previousElementSibling;
    if (!previousImage) {
      previousImage = document.querySelector('.thumbnail-lightbox:last-of-type');
    }
    activeImage.classList.remove('active');
    previousImage.classList.add('active');
    showLightbox(previousImage.dataset.id);
  }
  
  // écouteur d'événement pour gérer le survol des images
  var thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('mouseenter', function() {
      thumbnail.classList.add('is-hovered');
    });

    thumbnail.addEventListener('mouseleave', function() {
      thumbnail.classList.remove('is-hovered');
    });
  });

  // écouteur d'événement pour ouvrir la lightbox au clic sur l'icône d'agrandissement
  var expandIcons = document.querySelectorAll('.thumbnail-hover__expand');
  expandIcons.forEach(expandIcon => {
    expandIcon.addEventListener('click', function(event) {
      event.stopPropagation(); // Empêcher la propagation de l'événement aux éléments parents
      var photoId = expandIcon.closest('.thumbnail').dataset.id;
      showLightbox(photoId);
    });
  });

  // écouteur d'événement pour ouvrir la page single_photo.php au clic sur l'icône de l'œil
  var eyeIcons = document.querySelectorAll('.thumbnail-hover__eye');
  eyeIcons.forEach(eyeIcon => {
    eyeIcon.addEventListener('click', function(event) {
      event.stopPropagation(); // Empêcher la propagation de l'événement aux éléments parents
      var thumbnail = event.target.closest('.thumbnail');
      var photoId = thumbnail.dataset.id;
      var photoLink = thumbnail.querySelector('.thumbnail-hover__link').href;
      if (!photoLink) {
        // Si aucun lien n'est défini sur l'icône de l'œil, ouvrir la lightbox
        showLightbox(photoId);
      }
    });
  });
  
  
  //écouteur d'événement pour masquer la lightbox au clic du bouton close
  var closeButton = document.querySelector('.lightbox__close');
  closeButton.addEventListener('click', function() {
    hideLightbox();
  });
  
  //écouteur d'événement pour afficher l'image suivante au clic sur le bouton suivant
  var nextButton = document.querySelector('.lightbox__next');
  nextButton.addEventListener('click', function() {
    showNextImage();
  });
  
  // écouteur d'événement pour afficher l'image précédente au clic sur le bouton précédent
  var prevButton = document.querySelector('.lightbox__prev');
  prevButton.addEventListener('click', function() {
    showPreviousImage();
  });
  
  