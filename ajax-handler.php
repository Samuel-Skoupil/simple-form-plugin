<?php
function handle_simple_form_submission()
{
    check_ajax_referer("simple_form_nonce", "security");

    $name = sanitize_text_field($_POST["name"]);
    $last_name = sanitize_text_field($_POST["last_name"]);
    $email = sanitize_email($_POST["email"]);
    $phone_number = sanitize_text_field($_POST["phone_number"]);
    $state = sanitize_text_field($_POST["state"]);
    $city = sanitize_text_field($_POST["city"]);
    $date_of_birth = sanitize_text_field($_POST["date_of_birth"]);
    $gender = sanitize_text_field($_POST["gender"]);

    // Get recipient email from settings
    $to_email = get_option("simple_form_email");

    // Create email subject and message
    $subject = "New form submission";
    $message = "Name: $name\n";
    $message .= "Last Name: $last_name\n";
    $message .= "Email: $email\n";
    $message .= "Phone Number: $phone_number\n";
    $message .= "State: $state\n";
    $message .= "City: $city\n";
    $message .= "Date of Birth: $date_of_birth\n";
    $message .= "Gender: $gender\n";
    $sent = wp_mail($to_email, $subject, $message);

    error_log('Sending email to: ' . $to_email);

    if ($sent) {
        wp_send_json_success("Form submitted successfully");
    } else {
        wp_send_json_error("Failed to send email");
    }
}

add_action('wp_ajax_handle_simple_form_submission', 'handle_simple_form_submission');
add_action('wp_ajax_nopriv_handle_simple_form_submission', 'handle_simple_form_submission');
