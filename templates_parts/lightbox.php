<?php
// Exemple de requête pour récupérer les photos
$args = array(
  'post_type' => 'photos', // Remplacez 'photo' par le type de post approprié
  'posts_per_page' => 1, // Récupère tous les articles, vous pouvez modifier le nombre si nécessaire
);

$query = new WP_Query($args);
?>

<div class="lightbox">
  <button class="lightbox__close">Close</button>

  <button class="lightbox__next">Suivante</button>
  <button class="lightbox__prev">Precedente</button>

  <div class="lightbox__container">
  <?php while($query->have_posts()) : ?>
            <?php $query->the_post(); ?>
                <?php get_template_part('templates_parts/photo_block' ); ?>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
  </div>
</div>
