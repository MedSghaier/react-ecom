import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollections } from '../../redux/shop/shop.selectors'

import CollectionPreviw  from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';
const CollectionOverview = ({ collections }) => (
    <div className="collections-overview">
         {
         Object.values(collections).map(({ id, ...collectionProps }) => (
            <CollectionPreviw key={id} {...collectionProps} />
        ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections : selectCollections
})

export default connect(mapStateToProps)(CollectionOverview);
