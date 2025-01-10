<?php
/* 
Plugin Name: Simple Form Plugin
Author: Samuel Skoupil
*/

function simple_line () {
    return '<form class="form" method="post">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" required>
                <div class="button-container">
                <button type="submit">Submit</button>
                </div>
            </form>';
}

add_shortcode("simple_form", "simple_line");

function add_styles () {
    wp_enqueue_style("my-styles", plugin_dir_url(__FILE__) . "styles.css");
}

add_action("wp_enqueue_scripts", "add_styles");