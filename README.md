# wp_ceteicean
WordPress plugin adding CETEIcean support

When installed on WordPress, this plugin enables a shortcode in the form:
```
[ceteicean src="https://example.com/path/to/your/tei.xml"]
```
that will embed an imported TEI XML document into your post or page. The plugin comes with a minimal CSS stylesheet and a minimal set of behaviors. The included behaviors can be overridden by including a JavaScript file that defines them in a variable named `extra_ceteicean_behaviors`.
