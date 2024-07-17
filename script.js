// Initialize CodeMirror editors
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
    mode: 'xml',
    htmlMode: true,
    lineNumbers: true
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
    mode: 'css',
    lineNumbers: true
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
    mode: 'javascript',
    lineNumbers: true
});

// Function to update the live preview
function updatePreview() {
    const htmlCode = htmlEditor.getValue();
    const cssCode = `<style>${cssEditor.getValue()}</style>`;
    const jsCode = `<script>${jsEditor.getValue()}<\/script>`;
    const iframeContent = `${htmlCode}${cssCode}${jsCode}`;

    const iframe = document.getElementById('live-preview');
    iframe.contentDocument.open();
    iframe.contentDocument.write(iframeContent);
    iframe.contentDocument.close();
}

// Event listeners to update the preview on code change
htmlEditor.on('change', updatePreview);
cssEditor.on('change', updatePreview);
jsEditor.on('change', updatePreview);

// Function to toggle dark mode
document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Function to save the current code snippet
document.getElementById('save-snippet').addEventListener('click', () => {
    const snippet = {
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
        js: jsEditor.getValue()
    };
    localStorage.setItem('codeSnippet', JSON.stringify(snippet));
    alert('Snippet saved successfully!');
});

// Function to load the saved code snippet
document.getElementById('load-snippet').addEventListener('click', () => {
    const snippet = JSON.parse(localStorage.getItem('codeSnippet'));
    if (snippet) {
        htmlEditor.setValue(snippet.html);
        cssEditor.setValue(snippet.css);
        jsEditor.setValue(snippet.js);
        updatePreview();
        alert('Snippet loaded successfully!');
    } else {
        alert('No saved snippet found!');
    }
});

// Load the initial saved snippet on page load
window.onload = function() {
    const snippet = JSON.parse(localStorage.getItem('codeSnippet'));
    if (snippet) {
        htmlEditor.setValue(snippet.html);
        cssEditor.setValue(snippet.css);
        jsEditor.setValue(snippet.js);
        updatePreview();
    }
};
