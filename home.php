<?php get_header(); ?>

<?php
$random_image_args = array(                 // pour obtenir une image aléatoire du catalogue dans le header
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


<?php
$args = array(
    'post_type' => 'photos',
);

$query = new WP_Query( $args );
?>

<?php if($query->have_posts()) : ?>
    

    <div class="filters-photos">
        <div class="filters">

    <?php
        // Récupérer les catégories de la taxonomie 'photo-categories'
        $photo_categories = get_terms( array(
            'taxonomy' => 'categorie',
            'hide_empty' => true,
        ) );
    ?>
    
    <?php if ( ! empty( $photo_categories ) && ! is_wp_error( $photo_categories ) ) : ?>
        <select name="photo-category" id="photo-category-select">
            <option value="">Catégories</option>

            <?php foreach ( $photo_categories as $category ) : ?>
                <option value="<?php echo esc_attr( $category->slug ); ?>">
                    <?php echo esc_html( $category->name ); ?>
                </option>
            <?php endforeach; ?>

        </select>
    <?php endif; ?>

    <?php
        // Récupérer les termes de la taxonomie 'formats'
        $formats = get_terms( array(
            'taxonomy' => 'format',
            'hide_empty' => true,
        ) );
    ?>

    <?php if ( ! empty( $formats ) && ! is_wp_error( $formats ) ) : ?>
        <select name="format" id="format-select">
            <option value="">Formats</option>

            <?php foreach ( $formats as $format ) : ?>
                <option value="<?php echo esc_attr( $format->slug ); ?>">
                    <?php echo esc_html( $format->name ); ?>
                </option>
            <?php endforeach; ?>
        </select>
    <?php endif; ?>
                
            </div>


    <div class="sort-by-container">
        <select id="sort-by" name="sort-by">
            <option value="">Trier par</option>
            <option value="DESC">Plus récent</option>
            <option value="ASC">Plus ancien</option>
        </select>
    </div>

    </div>

<div class="main-page">

<div class="thumbnail-container" id="photos-list">
<?php while($query->have_posts()) : ?>
            <?php $query->the_post(); ?>
                <?php get_template_part('templates_parts/photo_block' ); ?>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
    </div>
<?php else : ?>
    <p>Désolé, aucun article ne correspond à cette requête</p>  
<?php endif; ?>

</div>


    <div class="load-more-btn">
    <button id="load-more-btn">Charger plus</button>
    </div>

</div>
    

<?php get_footer(); ?> 