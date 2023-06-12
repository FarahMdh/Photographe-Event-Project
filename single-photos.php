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

            <!-- Display the Contact Button -->
            <a class="contact-button" href="#">Contact</a>

        </div>

    <?php endwhile; else: ?>

        <p><?php _e('Sorry, this page does not exist.'); ?></p>

    <?php endif; ?>

</div>

<?php get_footer(); ?>