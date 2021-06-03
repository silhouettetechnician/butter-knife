import React, { useState } from 'react';
import { graphql } from 'gatsby'
import ProductHitsWithFilter from '../templates/ProductHitsWithFilter'
// import * as styles from './EmailListForm.module.scss';

const WhatsNew = () => {
  

  return (

   <>
     {/* <img src='/export butter.png' style={{width: '20%'}}/> */}
     <ProductHitsWithFilter indexName='PRODUCTS_asc_date' pageHeading='New in'/>
   </>
  );
};
export default WhatsNew;

