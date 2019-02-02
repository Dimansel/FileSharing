import createBrowserHistory from 'history/createBrowserHistory';
import qhistory             from 'qhistory';
import { parse, stringify } from 'query-string';

export default qhistory(createBrowserHistory(), stringify, parse);
