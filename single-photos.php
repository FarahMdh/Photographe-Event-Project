<?php get_header(); ?>
<div class="single-post-container">

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <div class="post-content">

        <div class="first-section">

            <div class="title_ref">

                <div class="title">
                    <h1 class="post-title line-break-title"><?php the_title(); ?></h1>        <!-- class pour que les titres aillent à la ligne -->
                </div>

                <div class="ref">
                    <div class="post-reference">
                        <?php
                        $reference = get_field('reference');
                        if ($reference) {
                            echo 'Référence : ' . $reference;
                        }
                        ?>
                    </div>

                    <div class="photo-category">
                        <?php
                        $terms = get_the_terms(get_the_ID(), 'categorie');
                        if ($terms && !is_wp_error($terms)) {
                            echo 'Catégorie : ';
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
                        <?php
                        $type = get_field('type');
                        if ($type) {
                            echo 'Type : ' . $type;
                        }
                        ?>
                    </div>

                    <div class="post-year">
                        <?php echo 'Année : ' . get_the_date('Y'); ?>
                    </div>

                </div>
            </div>
            
                <!-- Display the Featured Image -->
                <div class="images">
                <?php if (has_post_thumbnail()) : ?>
                    <div class="post-thumbnail">
                        <?php the_post_thumbnail(); ?>
                    </div>
                <?php endif; ?>
                </div>
        </div>

                <!-- Display the Content -->
                <div class="post-text">
                    <?php the_content(); ?>
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