<?php
/**
 * Dynamic rendering for publication date block.
 * 
 * @package publication-date
 */

Namespace PublicationDate;

/**
 * Renders publication date block, a variation on the core post date block.
 * 
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the filtered post date for the current post wrapped inside "time" tags.
 */
function render_block( $attributes, $content, $block ) {
    return sprintf(
        '<div>%s</div>',
        'hi there'
    );
}

/**
 * Register the block.
 */
function register_block() {
    register_block_type_from_metadata(
        __DIR__ . '/block.json',
        [
            'render_callback' => __NAMESPACE__ . '\render_block',
        ]
        );
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Register postmeta to store the block's display options and make available in other contexts.
 */
function register_meta() {
    register_post_meta(
        'post',
        'publication_date_format',
        [
            'type'         => 'string',
            'description'  => __( 'Format string for the date display', 'publication-date' ),
            'default'      => get_option( 'date_format' ),
            'single'       => true,
            'show_in_rest' => true,
        ]
    );

    register_post_meta(
        'post',
        'publication_date_prepend_text',
        [
            'type'         => 'string',
            'description'  => __( 'Optional text prepended to the date display', 'publication-date' ),
            'default'      => '',
            'single'       => true,
            'show_in_rest' => true,
        ]
    );

    register_post_meta(
        'post',
        'publication_date_display_modified_date',
        [
            'type'         => 'boolean',
            'description'  => __( 'Whether to include the post\'s modified date or not', 'publicattion-date' ),
            'default'      => false,
            'single'       => true,
            'show_in_rest' => true,
        ]
    );
}
add_action( 'rest_api_init', __NAMESPACE__ . '\register_meta' );
