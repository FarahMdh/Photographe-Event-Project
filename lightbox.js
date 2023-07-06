console.log ("salut")

// LIGHTBOX 

// pour afficher la lightbox
function showLightbox(photo_id) {
    var lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    var images = lightbox.querySelectorAll (".thumbnail-lightbox");
    images.forEach(image => {
        image.style.display="none";
    })
    var image = lightbox.querySelector(`.thumbnail-lightbox[data-id="${
        photo_id
    }"]`)
    console.log ("photo_id", photo_id)
    console.log ("image", image)
    image.style.display="block";
  }
  

  // pour masquer la lightbox
  function hideLightbox() {
    var lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  //pour afficher l'image suivante
  function showNextImage() {
    var images = document.querySelectorAll('.lightbox__container img');
    var currentIndex = 0;
  
    for (var i = 0; i < images.length; i++) {
      if (images[i].classList.contains('active')) {
        currentIndex = i;
        break;
      }
    }
  
    images[currentIndex].classList.remove('active');
  
    if (currentIndex === images.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
  
    images[currentIndex].classList.add('active');
  }
  
  //pour afficher l'image précédente
  function showPreviousImage() {
    var images = document.querySelectorAll('.lightbox__container img');
    var currentIndex = 0;
  
    for (var i = 0; i < images.length; i++) {
      if (images[i].classList.contains('active')) {
        currentIndex = i;
        break;
      }
    }
  
    images[currentIndex].classList.remove('active');
  
    if (currentIndex === 0) {
      currentIndex = images.length - 1;
    } else {
      currentIndex--;
    }
  
    images[currentIndex].classList.add('active');
  }
  
  // écouteur d'événement pour afficher la lightbox au clic d'une photo
  var thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        showLightbox(thumbnail.dataset.id);
      });
  })
  
  
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
  
  