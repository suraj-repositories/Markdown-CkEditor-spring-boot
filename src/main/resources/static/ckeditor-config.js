

import {
	ClassicEditor,
	Markdown,
	Bold,
	Italic,
	Link,
	Paragraph,
	Heading,
	BlockQuote,
	CodeBlock,
	List,
	Table,
	TableToolbar,
	HorizontalLine,
	Essentials,
	Undo
} from 'ckeditor5/ckeditor5.js';

document.addEventListener('DOMContentLoaded', () => {
	let ckEditors = document.querySelectorAll(".ckeditor");

	ckEditors.forEach((editor) => {
		ClassicEditor
			.create(editor, {
				plugins: [
					Essentials,
					Markdown,
					Bold,
					Italic,
					Link,
					Paragraph,
					Heading,
					BlockQuote,
					CodeBlock,
					List,
					Table,
					TableToolbar,
					HorizontalLine,
					Undo
				],
				toolbar: {
					items: [
						'undo', 'redo', '|',
						'heading', '|',
						'bold', 'italic', '|',
						'link', '|',
						'bulletedList', 'numberedList', '|',
						'blockQuote', 'codeBlock', '|',
						'insertTable', '|',
						'horizontalLine'
					]
				}
			})
			.then(editor => {
				window.editor = editor;
			})
			.catch(error => {
				console.error('An error occurred while initializing CKEditor:', error);
			});
	});
});
