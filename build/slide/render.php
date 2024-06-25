<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
  $wrapper_attributes = get_block_wrapper_attributes( array( 'class' => "" ) );
  $inner_blocks_html = ''; 
  foreach ( $block->inner_blocks as $inner_block ) { 
    $inner_blocks_html .= $inner_block->render(); 
  } 
?>
<div <?php echo $wrapper_attributes ?>>
  <?php echo $inner_blocks_html; ?>
</div>