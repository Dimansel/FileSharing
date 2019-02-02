import { createFactory } from 'react';
import getDisplayName from './getDisplayName';

export default (Components) => {
    const factories = Components.map(createFactory);
    const nest = ({ children, ...props }) =>
        factories.reduceRight((child, factory) => factory(props, child), children);

    if (process.env.NODE_ENV !== 'production') {
        const displayNames = Components.map(getDisplayName);

        nest.displayName = `nest(${displayNames.join(', ')})`;
    }

    return nest;
};
