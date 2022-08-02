import React from 'react';

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RadioControl, TextControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { dateI18n, __experimentalGetSettings as getDateSettings } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

const Edit = () => {
  const postDate = useSelect((select) => select('core/editor').getEditedPostAttribute('date'), []);
  const modifiedDate = useSelect((select) => select('core/editor').getEditedPostAttribute('modified'), []);
  const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  /* Get site date setttings and prepare display options. */
  const {formats} = getDateSettings();
  /* Start with site setting. */
  const displayOptions = [
    {label: `${dateI18n(formats.date, postDate)} (default)`, value: formats.date},
  ];
  /* 
    Hard-coded options for the sake of example; real world useage might be
    to pull from site/network options instead.
  */
  ['F Y', 'Y-m-d', 'm/d/Y', 'd/m/Y'].forEach((val) => {
    displayOptions.push({label: dateI18n(val, postDate), value: val});
  });

  const [meta, setMeta] = useEntityProp('postType', postType, 'meta');
  const {
    publication_date_format: dateFormat,
    publication_date_prepend_text: prependText,
    publication_date_display_modified_date: displayModified,
  } = meta;

  const updatePrependText = (newText) => setMeta({
    ...meta,
    publication_date_prepend_text: newText,
  });

  const updateDateFormat = (newFormat) => setMeta({
    ...meta,
    publication_date_format: newFormat,
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Formatting Options', 'publication-date')}>
          <RadioControl
            label={__('Select a date format', 'publication-date')}
            selected={dateFormat}
            options={displayOptions}
            onChange={(newValue) => updateDateFormat(newValue)}
          />
          <TextControl
            label={__('Text to prepend to date', 'publication-date')}
            value={prependText}
            onChange={(newValue) => updatePrependText(newValue)}
          />
        </PanelBody>
      </InspectorControls>
      <div className="block-publication-date">
        <div className="publication-date-post-date">
          {prependText && <span className="publication-date-prepend">{ prependText }</span>}
          {prependText && '\u00a0'}
          <time dateTime={postDate}>{dateI18n(dateFormat, postDate)}</time>
        </div>
        {displayModified && (
          <div className="publication-date-updated">
            <span className="publication-date-prepend">{__('Updated on', 'publication-date')}</span>
            &nbsp;
            <time dateTime={modifiedDate}>{ dateI18n(dateFormat, modifiedDate) }</time>
          </div>
        )}
      </div>
    </>
  );
};

export default Edit;
