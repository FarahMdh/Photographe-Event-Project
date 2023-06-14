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
        wp_enqueue_script('jquery'); // Ajout de jQuery 
        wp_enqueue_script( 'mota', get_stylesheet_directory_uri() .'/script.js', array('jquery'), '1.0.0', true );
        }

        function mota_setup() {
            add_theme_support( 'post-thumbnails' );
        }
        add_action( 'after_setup_theme', 'mota_setup' );