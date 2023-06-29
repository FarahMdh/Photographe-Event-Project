<?php register_nav_menus(
        array(
        'primary' => __( 'Primary menu' ),
        'footer' => __( 'Footer menu' )
        )
    );

    
    function theme_enqueue_styles() {
        wp_enqueue_style( 'style', get_stylesheet_directory_uri() .'/style.css' );   
        wp_enqueue_script( 'mota', get_stylesheet_directory_uri() .'/script.js', array(), '1.0.0', true );

        if( is_home() ) {
            wp_enqueue_script( 'mota-ajax-script', get_stylesheet_directory_uri() . '/ajax.js', array( 'jquery' ), '1.0', true );
    
            $data = array(
                'rest_url_custom_pagination_photo' => esc_url_raw(rest_url('mota-custom/v1/photo')),
            );
            wp_add_inline_script( 'mota-ajax-script', sprintf( 'let ajax_object = %s;', wp_json_encode( $data ) ), 'before' );
        }
        }
    add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );



    function mota_setup() {
        add_theme_support( 'post-thumbnails' );
    }
    add_action( 'after_setup_theme', 'mota_setup' );



    function mota_rest_api_init() {
        register_rest_route( 'mota-custom/v1', '/photo', array(
            'methods' => 'GET',
            'callback' => 'mota_rest_api_photo_handler',
            'permission_callback' => '__return_true',
            'args' => array(
                'page' => array(
                    'validate_callback' => function($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
                'photo_categories' => array(
                    'validate_callback' => function($param, $request, $key) {
                        return is_string($param);
                    }
                ),
                'formats' => array(
                    'validate_callback' => function($param, $request, $key) {
                        return is_string($param);
                    }
                ),
                'order' => array(
                    'default' => 'DESC', // valeur par défaut si pas défini
                    'validate_callback' => function($param, $request, $key) {
                        return in_array($param, array('ASC', 'DESC'));
                    }
                )
            )
        ) );
    }
    add_action( 'rest_api_init', 'mota_rest_api_init' );
    
    function mota_rest_api_photo_handler( $request ) {    
        $args = array(
            'post_type' => 'photos',
            'paged' => $request['page'],
            'posts_per_page' => get_option('posts_per_page'),
            'orderby' => 'date',
            'order' => $request['order']
        );
    
        $tax_query = array();
        
        if ( ! empty( $request['photo_categories'] ) ) {
            $tax_query[] = array(
                'taxonomy' => 'categorie',
                'field'    => 'slug',
                'terms'    => $request['photo_categories'],
            );
        }
        
        if ( ! empty( $request['formats'] ) ) {
            $tax_query[] = array(
                'taxonomy' => 'format',
                'field'    => 'slug',
                'terms'    => $request['formats'],
            );
        }
        
        if ( ! empty( $tax_query ) ) {
            $args['tax_query'] = $tax_query;
        }
    
        $query = new WP_Query( $args );
    
        ob_start();
        
        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                get_template_part( 'templates_parts/photo_block' );
            }
        }
        $output = ob_get_contents();
        ob_end_clean();

        $args['paged'] = $request['page'] + 1;
        $query = new WP_Query( $args );
        $post_next_page = $query->have_posts(); 

    
        return new WP_REST_Response( array('html' => $output, 'post_next_page'=>$post_next_page), 200 );
    }