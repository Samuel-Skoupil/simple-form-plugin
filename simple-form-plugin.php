<?php
/* 
Plugin Name: Simple Form Plugin
Author: Samuel Skoupil
*/

function simple_line () {
    return '<form id="form-step-1" class="form" method="post">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" required placeholder="Enter your name">
                <div class="button-container">
                <button type="button" onClick="show_next_page()">Next step</button>
                </div>
            </form>';
}

add_shortcode("simple_form", "simple_line");

function add_assets () {
    wp_enqueue_style("my-styles", plugin_dir_url(__FILE__) . "styles.css");
    wp_enqueue_script("my-script", plugin_dir_url(__FILE__) . "script.js", array(), false, true);

}

add_action("wp_enqueue_scripts", "add_assets");
