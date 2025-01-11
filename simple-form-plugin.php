<?php
/* 
Plugin Name: Simple Form Plugin
Author: Samuel Skoupil
*/

function simple_line() {
    // Získaj nastavenie z databázy a nastav predvolenú hodnotu na "one"
    $form_type = get_option('simple_form_type', 'one');

    // Ak je nastavenie "one", zobrazí jeden formulár
    if ($form_type === 'one') {
        return '<form id="simple-form" method="post">
                  <label for="name">Name <span class="required">*</span></label>
                  <input type="text" id="name" name="name" required placeholder="Enter your name">
                  <label for="last_name">Last Name <span class="required">*</span></label>
                  <input type="text" id="last_name" name="last_name" required placeholder="Enter your last name">
                  <div class="button-container">
                      <button type="submit">Submit</button>
                  </div>
                </form>';
    }

    // Ak je nastavenie iné ako "one", zobrazí formulár po krokoch
    return '<form id="simple-form" method="post">
              <div id="form-step-1" class="form visible">
                  <label for="name">Name <span class="required">*</span></label>
                  <input type="text" id="name" name="name" required placeholder="Enter your name">
                  <div class="button-container">
                      <button type="button" onClick="show_next_page()">Next step</button>
                  </div>
              </div>
              <div id="form-step-2" class="form">
                  <label for="last_name">Last Name <span class="required">*</span></label>
                  <input type="text" id="last_name" name="last_name" required placeholder="Enter your last name">
                  <div class="button-container">
                      <button type="submit">Submit</button>
                  </div>
              </div>
            </form>';
}


add_shortcode("simple_form", "simple_line");

function simple_form_register_settings() {
    register_setting('simple_form_settings_group', 'simple_form_type');
}
add_action('admin_init', 'simple_form_register_settings');



function add_assets () {
    wp_enqueue_style("my-styles", plugin_dir_url(__FILE__) . "styles.css");
    wp_enqueue_script("my-script", plugin_dir_url(__FILE__) . "script.js", array(), false, true);

}

add_action("wp_enqueue_scripts", "add_assets");

function simple_form_settings_page() {
    echo '<h1>Simple Form Settings</h1>';
    echo '<form method="post" action="options.php">';
    
    // Generuje skryté inputy potrebné na spracovanie nastavení
    settings_fields('simple_form_settings_group');
    
    // Vykresľuje naše nastavenia
    do_settings_sections('simple-form-settings');
    
    echo '<table class="form-table">';
    echo '<tr valign="top">';
    echo '<th scope="row">Choose number of form steps:</th>';
    echo '<td>';
    echo '<select name="simple_form_type">';
    echo '<option value="one" ' . selected(get_option('simple_form_type'), 'one', false) . '>One-step Form</option>';
    echo '<option value="two" ' . selected(get_option('simple_form_type'), 'two', false) . '>Two-step Form</option>';
    echo '</select>';
    echo '</td>';
    echo '</tr>';
    echo '</table>';

    echo '<button type="submit" class="button button-primary">Save</button>';
    echo '</form>';
}


function simple_form_settings_menu() {
    add_options_page(
        'Simple Form Settings',    
        'Simple Form Settings',    // Názov v menu
        'manage_options',          // Prístupové práva
        'simple-form-settings',    // Slug stránky
        'simple_form_settings_page' // Callback funkcia, ktorá vykreslí obsah stránky
    );
}
add_action('admin_menu', 'simple_form_settings_menu');

