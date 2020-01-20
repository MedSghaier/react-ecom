import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'

import CollectionPreviw  from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';
const CollectionOverview = ({ collectionsForPreview }) => (
    <div className="collections-overview">
         {
         collectionsForPreview.map(({ id, ...collectionProps }) => (
            <CollectionPreviw key={id} {...collectionProps} />
        ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collectionsForPreview: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview);
