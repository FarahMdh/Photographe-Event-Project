<?php get_header(); ?>

<?php
$random_image_args = array(                 // pour obtenir une image aléatoire du catalogue
    'post_type' => 'photos', 
    'posts_per_page' => 1, 
    'orderby' => 'rand'                     // pour que le tri soit aléatoire
);

$random_image_query = new WP_Query($random_image_args);

if ($random_image_query->have_posts()) {
    while ($random_image_query->have_posts()) {
        $random_image_query->the_post();

        $background_image_url = get_the_post_thumbnail_url(null, 'full');
    }
}

wp_reset_postdata();
?>

<div class="hero" style="background-image: url('<?php echo esc_url($background_image_url); ?>');">
    <h1><img src="<?php echo esc_url(get_template_directory_uri()); ?>/images/title.png" alt="title"></h1>
</div>


<div class="thumbnail-container">
    <?php
    $args = array(
        'post_type' => 'photos', 
        'posts_per_page' => -1,                 // pour afficher toutes les photos
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
        echo "Aucune photo trouvée.";
    endif;
    ?>
</div>

<?php get_footer(); ?>