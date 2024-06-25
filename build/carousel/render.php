<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
  $reverse = $attributes['reverse'] ? 'true' : 'false';
  $reverseClass = $reverse == 'true' ? 'lht-carousel-reverse' : '';
  $wrapper_attributes = get_block_wrapper_attributes( array( 'class' => "lht-shows-{$attributes['slidesToShow']}-slides lht-carousel-gap-{$attributes['gap']} lht-carousel-y-margin-{$attributes['yMargin']} $reverseClass" ) );
  $inner_blocks_html = ''; 
  foreach ( $block->inner_blocks as $inner_block ) { 
    $inner_blocks_html .= $inner_block->render(); 
  } 
  $arrows = $attributes['arrows'] ? 'true' : 'false';
  $dots = $attributes['dots'] ? 'true' : 'false';
  $autoplay = $attributes['autoplay'] ? 'true' : 'false';
?>
<div 
  data-slidesToShow="<?php echo $attributes['slidesToShow'] ?>" 
  data-gap="<?php echo $attributes['gap'] ?>" 
  data-speed="<?php echo $attributes['speed'] ?>" 
  data-reverse="<?php echo $reverse ?>" 
  data-arrows="<?php echo $arrows ?>" 
  data-dots="<?php echo $dots ?>" 
  data-autoplay="<?php echo $autoplay ?>" 
  data-autoplaySpeed="<?php echo $attributes['autoplaySpeed'] ?>" 
  data-responsiveWidth="<?php echo $attributes['responsiveWidth'] ?>" 
  data-responsiveSlidesToShow="<?php echo $attributes['responsiveSlidesToShow'] ?>" 

  <?php echo $wrapper_attributes ?>
>
  <?php echo $inner_blocks_html; ?>

  <?php if($attributes['dots']) {?>
  <ul class="lht-carousel-dots">

  </ul>
  <?php } ?>

  <?php if($attributes['arrows']) {?>
    <button class="lht-carousel-arrow-prev">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 16l1.4-1.4l-1.6-1.6H16v-2h-4.2l1.6-1.6L12 8l-4 4zm0 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
    </button>
    <button class="lht-carousel-arrow-next">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 16l4-4l-4-4l-1.4 1.4l1.6 1.6H8v2h4.2l-1.6 1.6zm0 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
    </button>
  <?php } ?>
</div>

