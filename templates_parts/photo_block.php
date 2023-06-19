<div class="thumbnail-container">
    <?php
    $current_post_id = get_the_ID();
    $current_post_categories = wp_get_post_terms($current_post_id, 'categorie', array('fields' => 'ids'));

    // Arguments de la requête pour récupérer les deux photos apparentées
    $args = array(
        'post_type' => 'photos', 
        'posts_per_page' => 2, 
        'post__not_in' => array($current_post_id),                  // pour exclure la photo actuelle
        'tax_query' => array(
            array(
                'taxonomy' => 'categorie', 
                'field' => 'id',
                'terms' => $current_post_categories,                // pour afficher uniquement les photos de la même catégorie
                'operator' => 'IN'
            )
        )
    );

    $related_query = new WP_Query($args);

    if ($related_query->have_posts()) :
        while ($related_query->have_posts()) :
            $related_query->the_post();
    ?>
            <div class="thumbnail">
                <?php the_post_thumbnail("medium"); ?>
            </div>
    <?php
        endwhile;
        wp_reset_postdata();
    else :
        // Aucune photo apparentée trouvée
        echo "Aucune photo apparentée trouvée.";
    endif;
    ?>
</div>
