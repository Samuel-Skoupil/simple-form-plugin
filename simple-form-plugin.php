<?php
/* 
Plugin Name: Simple Form Plugin
Author: Samuel Skoupil
*/

require_once plugin_dir_path(__FILE__) . "ajax-handler.php";

function simple_line()
{
    $form_type = get_option('simple_form_type', 'one');

    // Načíta one-step form
    if ($form_type === 'one') {
        ob_start();
        include plugin_dir_path(__FILE__) . 'templates/form-one.php';
        return ob_get_clean();
    }

    // Načíta two-step form
    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/form-two.php';
    return ob_get_clean();
}



add_shortcode("simple_form", "simple_line");

function simple_form_register_settings()
{
    register_setting('simple_form_settings_group', 'simple_form_type');
    register_setting('simple_form_settings_group', 'simple_form_email');
}
add_action('admin_init', 'simple_form_register_settings');



function add_assets()
{
    wp_enqueue_style("my-styles", plugin_dir_url(__FILE__) . "styles.css");
    wp_enqueue_script("my-script", plugin_dir_url(__FILE__) . "script.js", array(), false, true);
    wp_enqueue_script("request-script", plugin_dir_url(__FILE__) . "request.js", array('jquery'), false, true);
    wp_localize_script("request-script", "simple_form_ajax", array(
        "ajax_url" => admin_url("admin-ajax.php"),
        "nonce" => wp_create_nonce("simple_form_nonce")
    ));
}

add_action("wp_enqueue_scripts", "add_assets");

function simple_form_settings_page()
{
    echo '<h1>Simple Form Settings</h1>';
    echo '<form method="post" action="options.php">';

    // Generuje skryté inputy potrebné na spracovanie nastavení
    settings_fields('simple_form_settings_group');

    // Vykresľuje naše nastavenia
    do_settings_sections('simple-form-settings');

    // Vykreslí nastavenia vo forme tabuľky
    echo '<table class="form-table">';

    // Možnosť výberu počtu krokov formulára
    echo '<tr valign="top">';
    echo '<th scope="row">Choose number of form steps:</th>';
    echo '<td>';
    echo '<select name="simple_form_type">';
    echo '<option value="one" ' . selected(get_option('simple_form_type'), 'one', false) . '>One-step Form</option>';
    echo '<option value="two" ' . selected(get_option('simple_form_type'), 'two', false) . '>Two-step Form</option>';
    echo '</select>';
    echo '</td>';
    echo '</tr>';

    // Textové pole pre email
    echo '<tr valign="top">';
    echo '<th scope="row">Email to receive submissions:</th>';
    echo '<td>';
    echo '<input type="email" name="simple_form_email" value="' . esc_attr(get_option('simple_form_email')) . '" />';
    echo '</td>';
    echo '</tr>';

    echo '</table>';

    echo '<button type="submit" class="button button-primary">Save</button>';
    echo '</form>';
}



function simple_form_settings_menu()
{
    add_options_page(
        'Simple Form Settings',
        'Simple Form Settings',    // Názov v menu
        'manage_options',          // Prístupové práva
        'simple-form-settings',    // Slug stránky
        'simple_form_settings_page' // Callback funkcia, ktorá vykreslí obsah stránky
    );
}
add_action('admin_menu', 'simple_form_settings_menu');
