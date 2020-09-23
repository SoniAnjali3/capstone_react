import React from 'react';
// import AllProductsPage from './components/AllProductsPage';
// import LoginPageView from './components/LoginPageView';
// import RegisterUser from './components/RegisterUser';
// import AddProductPage from './components/AddProductPage';
// import ProductDetailPage from './components/ProductDetailPage';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import configureStore from './stores/configureStore';
import { Provider } from 'react-redux';

import '../App.css';

const AllProductsPage = lazy(() => import('./components/AllProductsPage'));
const LoginPageView = lazy(() => import('./components/LoginPageView'));
const RegisterUser = lazy(() => import('./components/RegisterUser'));
const AddProductPage = lazy(() => import('./components/AddProductPage'));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const TopViewProducts = lazy(() => import('./components/TopViewProducts'));
const EditProduct = lazy(() => import('./components/EditProduct'));
const UserDetailsPage = lazy(() => import('./components/UserDetailsPage'));
export default class App extends React.Component {
  render() {
    const store = configureStore();
    return (
      <Router>
        <div className='App'>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Switch>
              <Provider store={store}>
                <Route exact path='/' component={AboutPage}></Route>
                <Route path='/login' component={LoginPageView} />
                <Route path='/products' component={AllProductsPage} />
                <Route path='/register' component={RegisterUser} />
                <Route
                  path='/addProduct/:userID/:userName'
                  component={AddProductPage}
                />
                <Route
                  path='/topview/:userID/:userName'
                  component={TopViewProducts}
                />
                <Route
                  path='/product/:ProductName/:userID/:userName'
                  component={ProductDetailPage}
                />
                <Route
                  // path='/editProduct/:ProductName/:ProductDetail/:Manufacturer/:Price/:Quantity/:id/:userID/:userName'
                  path='/editProduct/:id/:userID/:userName'
                  component={EditProduct}
                />
                <Route
                  path='/userDetail/:userID/:userName'
                  component={UserDetailsPage}
                />
              </Provider>
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}
