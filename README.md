# Markdown-CkEditor-spring-boot

CKEditor is a WYSIWYG rich text editor which enables writing content directly inside of web pages or online applications.<br />

Important Links : 
- [HTML-OUTPUT CKEditor Repository](https://github.com/suraj-repositories/Html-CkEditor-spring-boot)
- [Ck Editor 5 download/cdn/npm](https://ckeditor.com/ckeditor-5/download/#zip)
- [Official Website](https://ckeditor.com/)

<div align="center">
<img src="./screenshots/1.png" width="80%" />
</div>

## Steps

### Using CDN

1. When you are using CDN you need to add the following stylesheet in your html head section

```html
    <link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5/42.0.1/ckeditor5.css" />
```
2. Add the javascript needed (Make sure to paste the code in html files not on js file)

```html
<script type="importmap">
        { 
            "imports": {
                "ckeditor5": "https://cdn.ckeditor.com/ckeditor5/42.0.1/ckeditor5.js",
                "ckeditor5/": "https://cdn.ckeditor.com/ckeditor5/42.0.1/"
            }
        }
</script>
```

3. The next step is to add needed plugins and customize your ckeditor according to your need
    <br>The basic One : 
    
```html

        <script type="module">
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
            } from 'ckeditor5';

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
                        console.error(error);
                    });
            });
</script>
```

4. After this you are able to use the ckeditor - To use this 
    - Where-ever you want to use ckeditor : you need to add a class `ckeditor` on the element
    
```html
<textarea class="form-control ckeditor" name="description" id="editor" cols="30" rows="5"></textarea>
```

5. Tip : It will shows a logo at bottom-right corner : To remove that logo use the collowing code 

```html
<style>
    .ck-powered-by {
        display: none !important;
    }
</style>
```

6. The ckeditor-markdown will convert your all edits into a markdown format when you need to retrieve it you need to parse markdown in html to show the content into view
  - in the given example i make use of `flexmark` to convert markdown to html 

```xml
<dependency>
    <groupId>com.vladsch.flexmark</groupId>
    <artifactId>flexmark-all</artifactId>
    <version>0.62.2</version>
</dependency>
```
  - the above dependency make `flexmark` available for you
  - you need to configure `flexmark` according to your need : the needed settings for this demo is mentioned at `/Markdown-CKEditor-spring-boot/src/main/java/com/on5Aug/services/MarkdownService.java`
  - after configuration you can convert the markdown in html as just like the given example
  
  ```java
  @Override
	public List<Todo> getAllTodos() {
		List<Todo> all = repository.findAll();
		for (Todo todo : all) {
			todo.setDescription(markdownService.convertToHtml(todo.getDescription()));
		}
		return all;
	}
  ```
  - markdown provides security against XSS attacks because it does not usign insecure html at the database layer

7. If you are using `thymeleaf` there is how to show the stored content as HTML on your view :: use `th:utext` to show output

```html
<div th:utext="${todo.description}"></div>
```

### Using Local setup for CKEditor

1. downlad the ckeditor : [Ck Editor 5 download/cdn/npm](https://ckeditor.com/ckeditor-5/download/#zip)
  
2. after Extracting the zip file : find the directory named ckeditor5 copy this directory as  `/Html-CKEditor-spring-boot/src/main/resources/static/ckeditor5`

3. create a `ckeditor-config.js` file in your static directory for configuration related to CKEditor<br/>
 you can view my config file at : `/Html-CKEditor-spring-boot/src/main/resources/static/ckeditor-config.js`

4. If you copyied the `ckeditor5` directory directly to `/Html-CKEditor-spring-boot/src/main/resources/static` directory : here is how to use perform local imports

```html
<link rel="stylesheet" th:href="@{/ckeditor5/ckeditor5.css}" />

<script type="importmap">
	   {
	       "imports": {
	           "ckeditor5": "./ckeditor5/ckeditor5.js",
	           "ckeditor5/": "./ckeditor5/"
	       }
	   }
</script>

<script type="module" th:src="@{/ckeditor-config.js}"></script>
```

5. The next steps are same to using CDN Follow the steps 4 to 7 

## Important  

- Make sure to Create bean of `HiddenHttpMethodFilter` if you want to send requests other than `GET` or `POST`
- After saving your data when retrieve you need to add styles on your classes, special tags used in ckeditor <br/>
  for example i use `blockquote` it just add a tag to my element  : i have to specify the meaning of that tag in my stylesheet by giving proper style to that tag: in that case when apply `blockquote` it will add a tag `blockquote` so we need to do something in our stylesheet
 
```css
    blockquote{
    	    font-size: 0.8rem;
		    width: 100%;
		    background-color: #eeeeee9c;
		    padding: 10px;
		    margin: 10px 15px;
		    display: inline-block;
    }
```

### Files where I made changes
 
 - In the whole package : `/Html-CKEditor-spring-boot/src/main/java/com/on5Aug`
 - In the template directory : `/Html-CKEditor-spring-boot/src/main/resources/templates`
 - In the static directory : `/Html-CKEditor-spring-boot/src/main/resources/static`
 - for database related configs : `/Html-CKEditor-spring-boot/src/main/resources/application.properties`

<br />
<br />
<p align="center">⭐️ Star my repositories if you find it helpful.</p>
<br />
