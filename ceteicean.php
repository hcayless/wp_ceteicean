<?php
/**
 * Plugin Name:       CETEIcean
 * Author:            Hugh Cayless
 * Author URI:        https://philomousos.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

function ceteicean_shortcode($atts) {
  $atts = shortcode_atts(
    array(
      'src' => '',
      'id' => uniqid("c_"),
      'css' => null
    ),
    $atts,
    'ceteicean'
  );

  if (isset( $atts['src'])) {
    $result =  '<div id="' . $atts['id'] . '">';
    $result .= '<script>';
    $result .= '  let ' . $atts['id'] . ' = new CETEI();';
    $result .= '  if (typeof ceteicean_behaviors !== "undefined") { ';
    $result .= '    ' . $atts['id'] . '.addBehaviors(ceteicean_behaviors); } ';
    $result .= $atts['id'] . '.getHTML5("' . $atts['src'] . '", function(data) { document.getElementById("' . $atts['id'] . '").appendChild(data);});';
    $result .= "</script></div>";
    return $result;
  }
}

function add_ceteicean_css() {
  wp_register_style('ceteiceancss', '/wp-content/plugins/ceteicean/styles/ceteicean.css');
  wp_enqueue_style('ceteiceancss');
}

function add_ceteicean_js() {
  if ( !is_admin() ) {
    wp_register_script('ceteiceanjs','/wp-content/plugins/ceteicean/javascript/CETEI.js',);
    wp_enqueue_script('ceteiceanjs');
    wp_register_script('ceteiceanbehaviors','/wp-content/plugins/ceteicean/javascript/behaviors.js',);
    wp_enqueue_script('ceteiceanbehaviors');
  }
}

add_shortcode('ceteicean', 'ceteicean_shortcode');
add_action('wp_enqueue_scripts', 'add_ceteicean_js');
add_action('wp_enqueue_scripts', 'add_ceteicean_css');

?>