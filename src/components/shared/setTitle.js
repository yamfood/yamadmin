import React from 'react';
import { Helmet } from 'react-helmet';

const setTitle = (headTitle) => <Helmet><title>{headTitle}</title></Helmet>;
export default setTitle;
