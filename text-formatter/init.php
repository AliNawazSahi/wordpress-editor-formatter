<?php
/*
Plugin Name: Text Formatter
Description: Customizes the text format TinyMCE editor in WordPress.
Version: 1.0
Author: Ali Nawaz Sahi
*/

add_action('admin_enqueue_scripts', 'text_formatter_enqueue_scripts');

function text_formatter_enqueue_scripts() {
    
    // Enqueue custom script and style
    wp_enqueue_script('text-formatter-script', plugin_dir_url(__FILE__) . 'text-formatter.js', null, true);
    wp_enqueue_style('text-formatter-style', plugin_dir_url(__FILE__) . 'text-formatter.css');
    
    // Localize script to pass data from PHP to JS
    wp_localize_script('text-formatter-script', 'textFormatter', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
    ]);
}

add_action('admin_footer', 'text_formatter_modal');

function text_formatter_modal() {
    ?>
    <!-- Modal popup -->
    <div id="my_modal" class="modal">
        <div class="modal-content">
            <div class="modal-heading">
                <h3>Paste Formatting Options</h3>
                <span class="close-button">&times;</span>
            </div>
            <p>Choose to keep or remove formatting in the pasted content.</p>
            <div class="confirmation-buttons">
                <button id="remove_formatting">Remove formatting</button>
                <button id="keep_formatting">Keep formatting</button>
            </div>
        </div>
    </div>
    <?php
}
?>
