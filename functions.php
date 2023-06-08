<?php register_nav_menus(
        array(
        'primary' => __( 'Primary menu' ),
        'footer' => __( 'Footer menu' )
        )
    );

    add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
    function theme_enqueue_styles() {
        //echo "test";
        wp_enqueue_style( 'style', get_stylesheet_directory_uri() .'/style.css' );    
        wp_enqueue_script( 'mota', get_stylesheet_directory_uri() .'/script.js', array(), '1.0.0', true );
        }

        