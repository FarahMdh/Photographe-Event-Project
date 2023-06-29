// Appel AJAX pour le bouton "Charger plus" et les filtres  

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
              console.log("response.post_next_page", response.post_next_page);

              if (replace) {
                  $("#photos-list").html(response.html); // on remplace le contenu (dans le cas d'un filtre)
              } else {
                  $("#photos-list").append(response.html); // on ajoute le contenu à la suite (dans le cas de la pagination)
              }
              if (response.post_next_page) {             
                $('#load-more-btn').show();                 // pour afficher le bouton charger plus si il reste des photos sur la page suivante
              } else {
                $('#load-more-btn').hide();                 // pour le cacher si il y'en a plus 
              }

          },
          error: function(response) {
              console.log('error', response);
          }
      });
  }
});

// pour que le background des filtres deviennent rouge au survol 
$(document).ready(function() {
  $('#photo-category-select option').hover(
    function() {
      $(this).addClass('red-background');
    },
    function() {
      $(this).removeClass('red-background');
    }
  );
});





  
  
