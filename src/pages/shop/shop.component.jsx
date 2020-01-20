import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component { 
        
    state = { 
        loading: true
    }
    
    unsubscribreFromSnapshtot = null;

    componentDidMount(){
        const { updateCollections } = this.props; 
        
        const collectionRef = firestore.collection('collections');
        // fetch('https://firestore.googleapis.com/v1/projects/ecom-clothing-store/databases/(default)/documents/collections')
        //     .then(res => res.json())
        //     .then(collectionss => console.log(collectionss));


        // Promise base Approach
        collectionRef.get().then(
            snapShot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
                updateCollections(collectionsMap);
                this.setState({ loading: false });
            }
        )
        
        // collectionRef.
        // .onSnapshot(async snapShot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // })
    }
    render(){
        const { match } = this.props;
        const { loading } = this.state
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/> } />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
            </div>
        )
    }
}

const mapDiapatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDiapatchToProps)(ShopPage); 
