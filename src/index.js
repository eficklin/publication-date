import { registerBlockType } from '@wordpress/blocks';

import meta from './block.json';
import Edit from './edit.js';

registerBlockType(meta, {
    edit: Edit,
});
