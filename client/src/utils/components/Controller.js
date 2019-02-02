/* eslint-disable react/jsx-no-bind*/

import React from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';

const Controller = ({ Layout, Page, ...rest })  => (
    <Route
        {...rest} render={() => (
            <Layout>
                <Page />
            </Layout>
        )}
    />);

Controller.propTypes = {
    Layout : PropTypes.string.isRequired,
    Page   : PropTypes.node.isRequired
};

export default Controller;

