<?php
function handle_simple_form_submission() {
    check_ajax_referer("simple_form_nonce", "security");

    $name = sanitize_text_field($_POST["name"]);
    $last_name = sanitize_text_field($_POST["last_name"]); 
    $email = sanitize_email($_POST["email"]);
    $phone_number = sanitize_text_field($_POST["phone_number"]);

    $to_email = get_option("simple_form_email");

    $subject = "New form submission";
    $message = "Name: $name\nLast Name: $last_name\nEmail: $email\nPhone Number: $phone_number";

    $sent = wp_mail($to_email, $subject, $message);

    if ($sent) {
        wp_send_json_success("Form submitted successfully");
    } else {
        wp_send_json_error("Failed to send email");
    }
}

add_action('wp_ajax_handle_simple_form_submission', 'handle_simple_form_submission');
add_action('wp_ajax_nopriv_handle_simple_form_submission', 'handle_simple_form_submission');
