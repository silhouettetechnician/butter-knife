import React, { useState, useEffect, useCallback } from 'react';
/* global instantsearch */
import { graphql } from "gatsby"
import ProductHitsWithFilter from '../templates/ProductHitsWithFilter'
import _ from 'lodash'


const Clothing = ({ data }) => {
  return (
    <>
      <ProductHitsWithFilter indexName='PRODUCTS' pageHeading='Clothing' />
    </>
  )
}

export default Clothing
