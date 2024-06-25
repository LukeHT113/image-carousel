/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import {
	CheckboxControl,
	RadioControl,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';

const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;

export default function Edit({ attributes, setAttributes }) {

	const blockProps = useBlockProps( {
		className: `lht-shows-${attributes.slidesToShow}-slides lht-carousel-gap-${attributes.gap} lht-carousel-y-margin-${attributes.yMargin} ${attributes.reverse ? 'lht-carousel-reverse' : ''}`
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title='Carousel Settings' initialOpen={ true }>
					<RangeControl
						label="Slides to Show"
						min={1}
						max={10}
						value={attributes.slidesToShow}
						onChange={ (nextValue ) => {
							setAttributes( {slidesToShow: nextValue} );
						}}
					/>
					<RangeControl
						label="Gap Between Slides (px)"
						value={attributes.gap}
						min={0}
						max={32}
						step={4}
						onChange={ (nextValue ) => {
							setAttributes( {gap: nextValue} );
						}}
					/>
					<RangeControl
						label="Top & Bottom Margin (px)"
						value={attributes.yMargin}
						min={0}
						max={32}
						step={4}
						onChange={ (nextValue ) => {
							setAttributes( {yMargin: nextValue} );
						}}
					/>
					<RangeControl
						label="Slide Animation Speed (ms)"
						value={attributes.speed}
						min={0}
						max={1000}
						step={25}
						onChange={ (nextValue ) => {
							setAttributes( {speed: nextValue} );
						}}
					/>
					<ToggleControl
						label="Reverse Direction"
						checked={attributes.reverse}
						onChange={ (nextValue) => {
							setAttributes( {reverse: nextValue} );
						}}
					/>
					<ToggleControl
						label="Prev/Next Arrows"
						checked={attributes.arrows}
						onChange={ (nextValue) => {
							setAttributes( {arrows: nextValue} );
						}}
					/>
					<ToggleControl
						label="Dots Navigation"
						checked={attributes.dots}
						onChange={ (nextValue) => {
							setAttributes( {dots: nextValue} );
						}}
					/>
					<ToggleControl
						label="Autoplay"
						checked={attributes.autoplay}
						onChange={ (nextValue) => {
							setAttributes( {autoplay: nextValue} );
						}}
					/>
					{attributes.autoplay ?
					<RangeControl
						label="Autoplay Slide Speed (ms)"
						value={attributes.autoplaySpeed}
						min={1000}
						max={20000}
						step={500}
						onChange={ (nextValue ) => {
							setAttributes( {autoplaySpeed: nextValue} );
						}}
					/> : ''
					}
				</PanelBody>
				<PanelBody title='Responsive Settings' initialOpen={ false }>
					<TextControl
						label="Screen Width (px)"
						type='number'
						help="Screen width when resposive styles get implemented"
						value={attributes.responsiveWidth}
						onChange={ (nextValue ) => {
							setAttributes( {responsiveWidth: nextValue } );
						}}
					/>
					<RangeControl
						label="Slides to Show"
						min={1}
						max={10}
						help="Number of slides to show at given screen width"
						value={attributes.responsiveSlidesToShow}
						onChange={ (nextValue ) => {
							setAttributes( {responsiveSlidesToShow: nextValue} );
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks
					value={attributes.slides}
					onChange={(newSlides) => {
						setAttributes( {slides: newSlides} );
					}}
					allowedBlocks={ [ 'lht/slide' ] }
				/>
				{attributes.dots ? 
				<ul class="lht-carousel-dots">
					<li><button class="lht-dot active-dot"><svg xmlns="http://www.w3.org/2000/svg" class="dot-svg" viewBox="0 0 48 48"><path stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"></path></svg></button></li>
					<li><button class="lht-dot"><svg xmlns="http://www.w3.org/2000/svg" class="dot-svg" viewBox="0 0 48 48"><path stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"></path></svg></button></li>
					<li><button class="lht-dot"><svg xmlns="http://www.w3.org/2000/svg" class="dot-svg" viewBox="0 0 48 48"><path stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"></path></svg></button></li>
				</ul> 
				: ''}
				{attributes.arrows ?
				<>
					<button class="lht-carousel-arrow-prev">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 16l1.4-1.4l-1.6-1.6H16v-2h-4.2l1.6-1.6L12 8l-4 4zm0 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
					</button>
					<button class="lht-carousel-arrow-next">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 16l4-4l-4-4l-1.4 1.4l1.6 1.6H8v2h4.2l-1.6 1.6zm0 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
					</button>
				</>
				: ''}
			</div>
		</>
	);
}

export function Save({ attributes }) {

	const blockProps = useBlockProps.save()

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content/>
			<h2>Inspector Control Fields</h2>
			<ul>
				<li>slidesToShow: { attributes.slidesToShow }</li>
				<li>gap: { attributes.gap }</li>
				<li>yMargin: { attributes.yMargin }</li>
				<li>speed: { attributes.speed }</li>
				<li>reverse: { attributes.reverse }</li>
				<li>arrows: { attributes.arrows }</li>
				<li>dots: { attributes.dots }</li>
				<li>autoplay: { attributes.autoplay }</li>
				<li>autoplaySpeed: { attributes.autoplaySpeed }</li>
				<li>responsiveWidth: { attributes.responsiveWidth }</li>
				<li>responsiveSlidesToShow: { attributes.responsiveSlidesToShow }</li>
			</ul>
		</div>
	);
}
