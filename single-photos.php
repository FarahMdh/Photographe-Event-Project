<?php get_header(); ?>
<div class="single-post-container">

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

        <div class="post-content">

            <!-- Display the Title -->
            <h1 class="post-title line-break-title"><?php the_title(); ?></h1>        <!-- pour que les titres aillent à la ligne -->

            <!-- Display the Featured Image -->
            <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail">
                    <?php the_post_thumbnail(); ?>
                </div>
            <?php endif; ?>

            <!-- Display the Content -->
            <div class="post-text">
                <?php the_content(); ?>
            </div>

            <!-- Champs personnalisés et taxonomie -->
            <div class="post-reference">
                <?php echo get_field('reference'); ?>
            </div>

            <div class="photo-category">
                <?php
                $terms = get_the_terms(get_the_ID(), 'categorie');
                if ($terms && !is_wp_error($terms)) {
                    foreach ($terms as $term) {
                        echo $term->name . ' ';
                    }
                }
                ?>
            </div>

            <div class="post-format">
                <?php
                $terms = get_the_terms(get_the_ID(), 'format');
                if ($terms && !is_wp_error($terms)) {
                    foreach ($terms as $term) {
                        echo $term->name . ' ';
                    }
                }
                ?>
            </div>

            <div class="post-type">
                <?php echo get_field('type'); ?>
            </div>

            <div class="post-year">
                <?php echo get_the_date('Y'); ?>
            </div>


            <!-- Display the Contact Button -->
            <div class="CTA">
            <p>Cette photo vous intéresse ?</p>
            <a class="contact-button" href="#">Contact</a>
            </div>

        </div>

    <?php endwhile; else: ?>

        <p><?php _e('Sorry, this page does not exist.'); ?></p>

    <?php endif; ?>

</div>

<?php get_footer(); ?>