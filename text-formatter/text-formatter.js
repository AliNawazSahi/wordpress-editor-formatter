document.addEventListener('DOMContentLoaded', function() {
    // Function to handle paste event in TinyMCE editor
    function handlePasteEvent(e) {
        // Check if pasted data is HTML
        var pastedData = (e.clipboardData || window.clipboardData).getData('text/html');
        var isHTML = pastedData && pastedData.match(/<[a-z][\s\S]*>/i);

        if (isHTML) {
            showModal(pastedData, (e.clipboardData || window.clipboardData).getData('text/plain'));
            e.preventDefault(); // Prevent the default paste action
        }
    }

    // Function to insert plain text into TinyMCE editor
    function insertPlainText(text) {
        var editor = tinyMCE.activeEditor;
        if (editor) {
            editor.focus();
            editor.selection.setContent(text);
        }
    }

    // Function to insert HTML content into TinyMCE editor
    function insertHTML(html) {
        var editor = tinyMCE.activeEditor;
        if (editor) {
            editor.focus();
            editor.execCommand('mceInsertContent', false, html);
        }
    }

    // Listen for paste event in TinyMCE editor
    tinymce.init({
        selector: '#content',
        init_instance_callback: function(editor) {
            editor.on('paste', function(e) {
                handlePasteEvent(e);
            });
        }
    });

    // Modal handling functions
    const modal = document.getElementById('my_modal');
    const removeFormattingBtn = document.getElementById('remove_formatting');
    const keepFormattingBtn = document.getElementById('keep_formatting');
    const closeButton = document.getElementsByClassName('close-button')[0];
    let currentPastedContent = '';

    function showModal(pastedHTML, pastedText) {
        currentPastedContent = { html: pastedHTML, text: pastedText };
        modal.style.display = "block";
    }

    function hideModal() {
        modal.style.display = "none";
    }

    removeFormattingBtn.onclick = function () {
        handlePaste(false);
        hideModal();
    };

    keepFormattingBtn.onclick = function () {
        handlePaste(true);
        hideModal();
    };

    closeButton.onclick = hideModal;

    function handlePaste(keepFormatting) {
        if (keepFormatting) {
            insertHTML(currentPastedContent.html);
        } else {
            insertPlainText(currentPastedContent.text);
        }
    }
});
