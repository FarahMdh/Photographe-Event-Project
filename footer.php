<?php wp_footer(); ?>
</body>
</html>
<footer class="site-footer">
    <div class="container-footer">
        <nav class="footer-navigation">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'footer',
                'menu_class' => 'footer-menu',
            ));
            ?>
        </nav>
    </div>
</footer>
