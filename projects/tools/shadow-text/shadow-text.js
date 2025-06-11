class ShadowText {
    constructor(containerId = 'shadow-text-editor') {
        this.container = document.getElementById(containerId);
        this.selectedImage = null;
        this.emojiPicker = null;
        this.bulletSelect = null; // Initialize bulletSelect
        this.createEditorStructure();
        this.initStyles();
        this.initEventListeners();
    }

    createEditorStructure() {
        // Create toolbar
        const toolbar = this.createToolbar();

        // Create editor
        const editor = document.createElement('div');
        editor.id = 'editor';
        editor.contentEditable = true;

        // Append elements to container
        this.container.appendChild(toolbar);
        this.container.appendChild(editor);

        // Store references
        this.toolbar = toolbar;
        this.editor = editor;

        // Create emoji picker
        this.createEmojiPicker();
    }

    createToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'toolbar';

        // Font controls group
        const fontGroup = document.createElement('div');
        fontGroup.className = 'toolbar-group';

        // Font family dropdown
        const fontSelect = document.createElement('select');
        fontSelect.className = 'font-select';
        fontSelect.title = 'Font Family';

        const fonts = [
            { name: 'Default', value: 'Arial' },
            { name: 'Arial', value: 'Arial' },
            { name: 'Times New Roman', value: 'Times New Roman' },
            { name: 'Courier New', value: 'Courier New' },
            { name: 'Georgia', value: 'Georgia' },
            { name: 'Verdana', value: 'Verdana' },
            { name: 'Helvetica', value: 'Helvetica' },
            { name: 'Tahoma', value: 'Tahoma' },
            { name: 'Trebuchet MS', value: 'Trebuchet MS' },
            { name: 'Impact', value: 'Impact' },
            { name: 'Comic Sans MS', value: 'Comic Sans MS' },
            { name: 'Calibri', value: 'Calibri' },
            { name: 'Segoe UI', value: 'Segoe UI' }
        ];

        fonts.forEach(font => {
            const option = document.createElement('option');
            option.value = font.value;
            option.textContent = font.name;
            option.style.fontFamily = font.value;
            fontSelect.appendChild(option);
        });

        fontSelect.addEventListener('change', () => {
            document.execCommand('fontName', false, fontSelect.value);
        });

        fontGroup.appendChild(fontSelect);
        toolbar.appendChild(fontGroup);

        // Text formatting group
        const formatGroup = document.createElement('div');
        formatGroup.className = 'toolbar-group';

        const formatButtons = [
            { command: 'bold', icon: 'B', title: 'Bold' },
            { command: 'italic', icon: 'I', title: 'Italic' },
            { command: 'underline', icon: 'U', title: 'Underline' },
            { command: 'strikeThrough', icon: 'S', title: 'Strikethrough' }
        ];

        formatButtons.forEach(({ command, icon, title }) => {
            const button = document.createElement('button');
            button.dataset.command = command;
            button.innerHTML = icon;
            button.title = title;
            formatGroup.appendChild(button);
        });

        toolbar.appendChild(formatGroup);

        // Alignment group
        const alignGroup = document.createElement('div');
        alignGroup.className = 'toolbar-group';

        const alignButtons = [
            { command: 'justifyLeft', icon: '⫷', title: 'Align Left' },
            { command: 'justifyCenter', icon: '⫶', title: 'Align Center' },
            { command: 'justifyRight', icon: '⫸', title: 'Align Right' }
        ];

        alignButtons.forEach(({ command, icon, title }) => {
            const button = document.createElement('button');
            button.dataset.command = command;
            button.innerHTML = icon;
            button.title = title;
            alignGroup.appendChild(button);
        });

        toolbar.appendChild(alignGroup);

        // List group
        const listGroup = document.createElement('div');
        listGroup.className = 'toolbar-group';

        const listButtons = [
            { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
            { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' }
        ];

        listButtons.forEach(({ command, icon, title }) => {
            const button = document.createElement('button');
            button.dataset.command = command;
            button.innerHTML = icon;
            button.title = title;
            listGroup.appendChild(button);
        });

        toolbar.appendChild(listGroup);

        // Bullet style dropdown (add to listGroup)
        const bulletStyles = [
            { name: 'Disc', value: 'disc' },
            { name: 'Circle', value: 'circle' },
            { name: 'Square', value: 'square' },
            { name: 'Dash', value: 'dash' },
            { name: 'Check', value: 'check' },
            { name: 'Arrow', value: 'arrow' },
            { name: 'Star', value: 'star' }
        ];

        const bulletSelect = document.createElement('select');
        bulletSelect.id = 'bullet-style';
        bulletSelect.title = 'Bullet Style';
        bulletSelect.className = 'font-select'; // Reuse similar styling

        bulletStyles.forEach(style => {
            const option = document.createElement('option');
            option.value = style.value;
            option.textContent = style.name;
            bulletSelect.appendChild(option);
        });

        listGroup.appendChild(bulletSelect);
        this.bulletSelect = bulletSelect; // Store reference

        // Insert group
        const insertGroup = document.createElement('div');
        insertGroup.className = 'toolbar-group';

        const insertButtons = [
            { command: 'createLink', icon: '🔗', title: 'Insert Link' },
            { command: 'insertImage', icon: '🖼️', title: 'Insert Image' },
            { command: 'insertEmoji', icon: '😊', title: 'Insert Emoji' }
        ];

        insertButtons.forEach(({ command, icon, title }) => {
            const button = document.createElement('button');
            button.dataset.command = command;
            button.innerHTML = icon;
            button.title = title;
            insertGroup.appendChild(button);
        });

        toolbar.appendChild(insertGroup);

        return toolbar;
    }

    createEmojiPicker() {
        const emojis = [
            '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
            '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
            '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
            '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
            '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
            '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
            '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨',
            '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥',
            '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧',
            '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
            '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑',
            '🤠', '💩', '👻', '👽', '🤖', '😺', '😸', '😹',
            '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉',
            '🙊', '💌', '💘', '💝', '💖', '💗', '💓', '💞',
            '💕', '💟', '❣️', '💔', '❤️', '🧡', '💛', '💚',
            '💙', '💜', '🖤', '💯', '💢', '💥', '💫', '💦',
            '💨', '🕳️', '💣', '💬', '👁️‍🗨️', '🗨️', '🗯️', '💭',
            '💤', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌',
            '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
            '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊',
            '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏',
            '✍️', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻',
            '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️',
            '👅', '👄', '💋', '🩸', '👶', '👧', '🧒', '👦',
            '👩', '🧑', '👨', '👵', '🧓', '👴', '👮', '🕵️',
            '👷', '🫅', '🤴', '👸', '👳', '👲', '🧕', '🤵',
            '👰', '🤰', '🫃', '🫄', '🤱', '👼', '🎅', '🤶',
            '🦸', '🦹', '🧙', '🧚', '🧛', '🧜', '🧝', '🧞',
            '🧟', '🧌', '💆', '💇', '🚶', '🧍', '🧎', '🏃',
            '💃', '🕺', '🕴️', '👯', '🧖', '🧗', '🤺', '🤼',
            '🤽', '🤾', '🤹', '🧘', '🛀', '🛌', '👭', '👫',
            '👬', '💏', '💑', '🗣️', '👤', '👥', '🫂', '👣'
        ];

        const picker = document.createElement('div');
        picker.className = 'emoji-picker';
        picker.style.display = 'none';

        const grid = document.createElement('div');
        grid.className = 'emoji-grid';

        emojis.forEach(emoji => {
            const button = document.createElement('button');
            button.className = 'emoji-button';
            button.textContent = emoji;
            button.title = emoji;
            button.onmousedown = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.insertEmoji(emoji);
            };
            grid.appendChild(button);
        });

        picker.appendChild(grid);
        document.body.appendChild(picker);
        this.emojiPicker = picker;
    }

    insertEmoji(emoji) {
        document.execCommand('insertText', false, emoji);
        this.emojiPicker.style.display = 'none';
    }

    initStyles() {
        const styles = `
            #shadow-text-editor {
                font-family: Arial, sans-serif;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin: 20px;
            }

            #toolbar {
                padding: 10px;
                background: #f5f5f5;
                border-bottom: 1px solid #ccc;
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }

            .toolbar-group {
                display: flex;
                gap: 5px;
                align-items: center;
            }

            #toolbar button {
                padding: 5px 10px;
                border: 1px solid #ccc;
                background: white;
                border-radius: 3px;
                cursor: pointer;
                min-width: 30px;
            }

            #toolbar button:hover {
                background: #e9e9e9;
            }

            #toolbar select {
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 3px;
            }

            #editor {
                min-height: 300px;
                padding: 20px;
                outline: none;
                overflow-y: auto;
            }

            #editor:focus {
                background: #fff;
            }

            #editor img {
                max-width: 100%;
                height: auto;
                cursor: pointer;
                transition: outline 0.2s;
            }

            #editor img.selected {
                outline: 2px solid #007bff;
            }

            /* Image resize handles */
            .resize-handle {
                position: absolute;
                width: 10px;
                height: 10px;
                background: #007bff;
                border: 1px solid white;
                z-index: 1000;
            }

            .resize-handle.nw { top: -5px; left: -5px; cursor: nw-resize; }
            .resize-handle.ne { top: -5px; right: -5px; cursor: ne-resize; }
            .resize-handle.sw { bottom: -5px; left: -5px; cursor: sw-resize; }
            .resize-handle.se { bottom: -5px; right: -5px; cursor: se-resize; }

            /* Emoji picker styles */
            .emoji-picker {
                position: fixed;
                background: white;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 10000;
                padding: 10px;
                max-height: 300px;
                overflow-y: auto;
            }

            .emoji-grid {
                display: grid;
                grid-template-columns: repeat(8, 1fr);
                gap: 5px;
            }

            .emoji-button {
                width: 30px;
                height: 30px;
                padding: 0;
                border: 1px solid #eee;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                font-size: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.2s;
            }

            .emoji-button:hover {
                background: #f0f0f0;
                border-color: #ccc;
            }

            /* Custom bullet styles */
            #editor ul[style*="list-style-type: disc"] {
                list-style-type: disc !important;
            }
            #editor ul[style*="list-style-type: circle"] {
                list-style-type: circle !important;
            }
            #editor ul[style*="list-style-type: square"] {
                list-style-type: square !important;
            }
            #editor ul[style*="list-style-type: dash"] {
                list-style-type: none !important;
            }
            #editor ul[style*="list-style-type: dash"] li::before {
                content: "— ";
            }
            #editor ul[style*="list-style-type: check"] {
                list-style-type: none !important;
            }
            #editor ul[style*="list-style-type: check"] li::before {
                content: "✓ ";
            }
            #editor ul[style*="list-style-type: arrow"] {
                list-style-type: none !important;
            }
            #editor ul[style*="list-style-type: arrow"] li::before {
                content: "→ ";
            }
            #editor ul[style*="list-style-type: star"] {
                list-style-type: none !important;
            }
            #editor ul[style*="list-style-type: star"] li::before {
                content: "★ ";
            }

            .image-wrapper {
                position: relative;
                display: inline-block;
                width: fit-content;
            }

            .image-wrapper img {
                display: inline-block;
                max-width: 100%;
                height: auto;
            }

            /* Font select styles */
            .font-select {
                padding: 5px;
                margin-right: 5px;
                border: 1px solid #ccc;
                border-radius: 4px;
                background: white;
                font-size: 14px;
                min-width: 120px;
                cursor: pointer;
            }

            .font-select option {
                padding: 5px;
            }

            /* Toolbar styles */
            .toolbar {
                display: flex;
                gap: 10px;
                padding: 8px;
                background: #f8f9fa;
                border-bottom: 1px solid #dee2e6;
                flex-wrap: wrap;
            }

            .toolbar-group {
                display: flex;
                gap: 2px;
                padding: 0 5px;
                border-right: 1px solid #dee2e6;
            }

            .toolbar-group:last-child {
                border-right: none;
            }

            .toolbar button {
                padding: 6px 10px;
                border: 1px solid #dee2e6;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                min-width: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .toolbar button:hover {
                background: #e9ecef;
            }

            .toolbar button.active {
                background: #e9ecef;
                border-color: #adb5bd;
            }

            /* Font select styles */
            .font-select {
                padding: 6px 10px;
                border: 1px solid #dee2e6;
                border-radius: 4px;
                background: white;
                font-size: 14px;
                min-width: 140px;
                cursor: pointer;
                height: 32px;
            }

            .font-select option {
                padding: 5px;
            }

            /* Active state for toolbar buttons */
            .toolbar button.active {
                background: #e9ecef;
                border-color: #adb5bd;
                color: #495057;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    initEventListeners() {
        // Toolbar button clicks
        this.toolbar.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;

            const command = button.dataset.command;
            if (command === 'createLink') {
                this.createLink();
            } else if (command === 'insertImage') {
                this.insertImage();
            } else if (command === 'insertUnorderedList') {
                this.insertUnorderedList();
            } else if (command === 'insertEmoji') {
                e.preventDefault();
                e.stopPropagation();
                this.toggleEmojiPicker(button);
            } else if (command.startsWith('justify')) {
                this.handleAlignment(command);
            } else {
                document.execCommand(command, false, null);
            }
        });

        // Update toolbar state on various events
        this.editor.addEventListener('keyup', this.updateToolbarState.bind(this));
        this.editor.addEventListener('mouseup', this.updateToolbarState.bind(this));
        this.editor.addEventListener('input', this.updateToolbarState.bind(this));
        this.editor.addEventListener('keydown', this.updateToolbarState.bind(this));

        // Font select change handler
        const fontSelect = this.toolbar.querySelector('.font-select');
        if (fontSelect) {
            fontSelect.addEventListener('change', () => {
                document.execCommand('fontName', false, fontSelect.value);
                // Store the current font in a data attribute
                this.editor.dataset.currentFont = fontSelect.value;
            });
        }

        // Close emoji picker when clicking outside
        document.addEventListener('mousedown', (e) => {
            if (this.emojiPicker && this.emojiPicker.style.display === 'block') {
                const isClickInsidePicker = e.target.closest('.emoji-picker');
                const isClickOnEmojiButton = e.target.closest('[data-command="insertEmoji"]');

                if (!isClickInsidePicker && !isClickOnEmojiButton) {
                    this.emojiPicker.style.display = 'none';
                }
            }
        });

        // Format block changes
        this.toolbar.addEventListener('change', (e) => {
            const select = e.target.closest('select');
            if (!select) return;

            if (select.id === 'bullet-style' && select === this.bulletSelect) {
                this.updateBulletStyle(select.value);
            }
        });

        // Handle paste events for images
        this.editor.addEventListener('paste', (e) => {
            const items = (e.clipboardData || e.originalEvent.clipboardData).items;

            for (let item of items) {
                if (item.type.indexOf('image') !== -1) {
                    e.preventDefault();
                    const file = item.getAsFile();
                    this.convertImageToBase64(file);
                }
            }
        });

        // Handle image selection
        this.editor.addEventListener('click', (e) => {
            const img = e.target.closest('img');
            const wrapper = e.target.closest('.image-wrapper');

            if (img && !wrapper) {
                e.preventDefault();
                this.selectImage(img);
            } else if (!img && !wrapper) {
                this.deselectImage();
            }
        });

        // Handle editor area clicks
        this.editor.addEventListener('mousedown', (e) => {
            // Check if clicking on whitespace (directly on editor or empty paragraph)
            const isWhitespace = e.target === this.editor ||
                (e.target.tagName === 'P' && !e.target.textContent.trim() && !e.target.querySelector('img'));

            if (isWhitespace) {
                this.deselectImage();
                window.getSelection().removeAllRanges();
            }
        });

        // Handle image resizing
        this.editor.addEventListener('mousedown', (e) => {
            const handle = e.target.closest('.resize-handle');
            if (handle && this.selectedImage) {
                e.preventDefault();
                this.startResize(handle, e);
            }
        });
    }

    toggleEmojiPicker(button) {
        if (!this.emojiPicker) {
            this.createEmojiPicker();
        }

        if (this.emojiPicker.style.display === 'block') {
            this.emojiPicker.style.display = 'none';
        } else {
            const rect = button.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            // Position the picker below the button
            this.emojiPicker.style.top = `${rect.bottom + scrollTop + 5}px`;
            this.emojiPicker.style.left = `${rect.left + scrollLeft}px`;
            this.emojiPicker.style.display = 'block';

            // Ensure the picker is visible in the viewport
            const pickerRect = this.emojiPicker.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            // Check if picker goes below viewport
            if (pickerRect.bottom > viewportHeight) {
                this.emojiPicker.style.top = `${rect.top - pickerRect.height - 5 + scrollTop}px`;
            }

            // Check if picker goes beyond right edge
            if (pickerRect.right > viewportWidth) {
                this.emojiPicker.style.left = `${viewportWidth - pickerRect.width - 10 + scrollLeft}px`;
            }
        }
    }

    insertUnorderedList() {
        document.execCommand('insertUnorderedList', false, null);
        // Apply the selected bullet style from the dropdown
        if (this.bulletSelect && this.bulletSelect.value) {
            this.updateBulletStyle(this.bulletSelect.value);
        }
    }

    updateBulletStyle(style) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        let list = range.commonAncestorContainer;

        // Traverse up to find the UL element
        if (list.nodeType === Node.TEXT_NODE) {
            list = list.parentNode;
        }
        list = list.closest('ul');

        if (list) {
            list.style.listStyleType = style;
        }
        // Ensure focus remains in the editor to see the change immediately
        this.editor.focus();
        selection.removeAllRanges(); // Clear selection to avoid issues
        selection.addRange(range);   // Restore selection/cursor position
    }

    async convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                this.editor.focus();
                document.execCommand('insertHTML', false, img.outerHTML);
                resolve(e.target.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async insertImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                await this.convertImageToBase64(file);
            }
        };

        input.click();
    }

    createLink() {
        const url = prompt('Enter the URL:');
        if (url) {
            document.execCommand('createLink', false, url);
        }
    }

    handleAlignment(command) {
        if (this.selectedImage) {
            // Handle image alignment
            const alignment = command.replace('justify', '').toLowerCase();
            const wrapper = this.selectedImage.closest('.image-wrapper');

            if (wrapper) {
                if (alignment === 'center') {
                    wrapper.style.float = 'none';
                    wrapper.style.display = 'block';
                    wrapper.style.margin = '0 auto';
                    wrapper.style.textAlign = 'center';
                    wrapper.style.width = 'fit-content';
                    this.selectedImage.style.display = 'inline-block';
                } else {
                    wrapper.style.float = alignment;
                    wrapper.style.display = 'inline-block';
                    wrapper.style.margin = '0';
                    wrapper.style.textAlign = alignment;
                    wrapper.style.width = 'auto';
                }
            }
        } else {
            // Handle text alignment
            document.execCommand(command, false, null);
        }
    }

    selectImage(img) {
        this.deselectImage();
        this.selectedImage = img;
        img.classList.add('selected');

        // Add resize handles
        const handles = ['nw', 'ne', 'sw', 'se'].map(pos => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${pos}`;
            return handle;
        });

        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = 'fit-content';

        // Preserve any existing alignment
        const computedStyle = window.getComputedStyle(img);
        if (computedStyle.float === 'none' && computedStyle.marginLeft === 'auto' && computedStyle.marginRight === 'auto') {
            wrapper.style.display = 'block';
            wrapper.style.margin = '0 auto';
            wrapper.style.textAlign = 'center';
        } else {
            wrapper.style.float = computedStyle.float;
            wrapper.style.margin = computedStyle.margin;
        }

        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        handles.forEach(handle => wrapper.appendChild(handle));
    }

    deselectImage() {
        if (this.selectedImage) {
            // Remove selection class
            this.selectedImage.classList.remove('selected');

            // Remove wrapper and restore image
            const wrapper = this.selectedImage.closest('.image-wrapper');
            if (wrapper) {
                // Preserve any alignment styles
                const alignment = wrapper.style.textAlign;
                const float = wrapper.style.float;
                const display = wrapper.style.display;
                const margin = wrapper.style.margin;

                // Move image out of wrapper
                wrapper.parentNode.insertBefore(this.selectedImage, wrapper);

                // Apply preserved styles to image
                this.selectedImage.style.textAlign = alignment;
                this.selectedImage.style.float = float;
                this.selectedImage.style.display = display;
                this.selectedImage.style.margin = margin;

                // Remove wrapper
                wrapper.remove();
            }

            // Clear selection
            window.getSelection().removeAllRanges();
            this.selectedImage = null;
        }
    }

    startResize(handle, e) {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = this.selectedImage.offsetWidth;
        const startHeight = this.selectedImage.offsetHeight;
        const aspectRatio = startWidth / startHeight;

        const handlePos = handle.className.split(' ')[1];
        const isRight = handlePos.includes('e');
        const isBottom = handlePos.includes('s');

        const moveHandler = (e) => {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;

            if (isRight) {
                newWidth = startWidth + deltaX;
            } else {
                newWidth = startWidth - deltaX;
            }

            newHeight = newWidth / aspectRatio;

            this.selectedImage.style.width = `${newWidth}px`;
            this.selectedImage.style.height = `${newHeight}px`;
        };

        const upHandler = () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
    }

    updateToolbarState() {
        // Update font select
        const fontSelect = this.toolbar.querySelector('.font-select');
        if (fontSelect) {
            const currentFont = document.queryCommandValue('fontName');
            if (currentFont) {
                fontSelect.value = currentFont;
                this.editor.dataset.currentFont = currentFont;
            } else if (this.editor.dataset.currentFont) {
                // If no font is selected but we have a stored font, apply it
                document.execCommand('fontName', false, this.editor.dataset.currentFont);
            }
        }

        // Update other toolbar states
        const commands = ['bold', 'italic', 'underline', 'strikeThrough'];
        commands.forEach(command => {
            const button = this.toolbar.querySelector(`[data-command="${command}"]`);
            if (button) {
                if (document.queryCommandState(command)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });

        // Update alignment buttons
        const alignments = ['justifyLeft', 'justifyCenter', 'justifyRight'];
        alignments.forEach(alignment => {
            const button = this.toolbar.querySelector(`[data-command="${alignment}"]`);
            if (button) {
                if (document.queryCommandState(alignment)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    // Public methods for external use
    getContent() {
        return this.editor.innerHTML;
    }

    setContent(content) {
        this.editor.innerHTML = content;
    }

    getText() {
        return this.editor.textContent;
    }

    setText(text) {
        this.editor.textContent = text;
    }
}

function shadowExport(contents, type) {
    if (type === 'html') {
        // Return the contents wrapped in a basic HTML structure
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Document</title>
</head>
<body>
    ${contents}
</body>
</html>`;
    } else if (type === 'markup') {
        let markup = contents;

        // 1. Normalize <br> tags to newlines
        markup = markup.replace(/<br\s*\/?>/gi, '\n');

        // 2. Headings (H1-H3)
        markup = markup.replace(/<h1>(.*?)<\/h1>/gis, '# $1\n');
        markup = markup.replace(/<h2>(.*?)<\/h2>/gis, '## $1\n');
        markup = markup.replace(/<h3>(.*?)<\/h3>/gis, '### $1\n');

        // 3. Lists (Unordered and Ordered)
        markup = markup.replace(/<ul>(.*?)<\/ul>/gis, (match, ulContent) => {
            return ulContent.replace(/<li>(.*?)<\/li>/gis, (liMatch, liContent) => `- ${liContent.trim()}\n`);
        });
        markup = markup.replace(/<ol>(.*?)<\/ol>/gis, (match, olContent) => {
            let counter = 1;
            return olContent.replace(/<li>(.*?)<\/li>/gis, (liMatch, liContent) => `${counter++}. ${liContent.trim()}\n`);
        });

        // 4. Links <a href="...">...</a>
        markup = markup.replace(/<a\s+href="([^"]+)">(.*?)<\/a>/gis, '$2');

        // 5. Images <img src="..." alt="...">
        markup = markup.replace(/<img\s+src="([^"]+)"\s+alt="([^"]*)"[^>]*>/gis, '!$2');
        markup = markup.replace(/<img\s+src="([^"]+)"[^>]*>/gis, '!'); // Fallback for no alt

        // 6. Paragraphs <p>...</p> - convert to content followed by two newlines
        markup = markup.replace(/<p>(.*?)<\/p>/gis, '$1\n\n');

        // 7. Inline formatting (bold, italic, underline, strikethrough)
        markup = markup.replace(/<b>(.*?)<\/b>/gis, '**$1**');
        markup = markup.replace(/<strong>(.*?)<\/strong>/gis, '**$1**');
        markup = markup.replace(/<i>(.*?)<\/i>/gis, '_$1_');
        markup = markup.replace(/<em>(.*?)<\/em>/gis, '_$1_');
        markup = markup.replace(/<u>(.*?)<\/u>/gis, '__$1__'); // Markdown has no standard underline, this is one convention
        markup = markup.replace(/<s>(.*?)<\/s>/gis, '~~$1~~');
        markup = markup.replace(/<strike>(.*?)<\/strike>/gis, '~~$1~~');

        // 8. Strip any remaining HTML tags
        markup = markup.replace(/<[^>]+>/g, '');

        // 9. Clean up newlines and whitespace
        // Consolidate sequences of 3 or more newlines (with optional space between) into two newlines
        markup = markup.replace(/(\n\s*){3,}/g, '\n\n');
        // Trim leading/trailing whitespace from the entire string.
        markup = markup.trim();

        return markup;
    } else {
        throw new Error('Invalid export type. Use "html" or "markup".');
    }
}

// Initialize the editor
document.addEventListener('DOMContentLoaded', () => {
    window.shadowText = new ShadowText();
}); 