import React from 'react'
import algoliasearch from 'algoliasearch/lite';
import { Heading1 } from '../components/StyledComponents'
import { Link } from "gatsby"
import ClothingItem from './ClothingItem'
import Flex from '../styles/Flex';
import {
    InstantSearch,
    HierarchicalMenu,
    RefinementList,
    SortBy,
    Pagination,
    ClearRefinements,
    ExperimentalConfigureRelatedItems,
    Highlight,
    Hits,
    HitsPerPage,
    Panel,
    Configure,
    SearchBox,
    Snippet,
    connectStateResults,
    ToggleRefinement,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
    'K8SF9T86WY',
    'b88108260d8ff9427171d1937d70e6d8'
);

const Hit = ({ hit, newIn }) => {
    if(newIn) return 
    return <Link to={`/clothing/${hit.handle}`}><ClothingItem hit={hit} src={hit.image1 || hit.image2} title={hit.title} description={hit.body_html_safe} price={hit.price} /></Link>
}

const ProductHitsWithFilter = ({pageHeading, newIn, indexName }) => (
    <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Flex width='52%' justifyBetween style={{ alignSelf: 'flex-end' }}>
            <Heading1>{pageHeading}</Heading1>
            <SearchBox />
        </Flex>
        <Flex width='100%' justifyAround>
            <Flex width='19%' style={{ paddingLeft: '12px', marginTop: '-30px' }} justifyCenter>
                <Panel header="Designer">
                    <RefinementList
                        attribute="vendor"
                        searchable={true}
                        searchableEscapeFacetValues={false}
                        translations={{
                            placeholder: 'Search for brands…',
                        }}
                    />
                </Panel>
                <Panel header="Type" style={{ marginTop: '45px' }}>
                    <RefinementList
                        attribute="type"
                        searchable={true}
                        translations={{
                            placeholder: 'Search for type',
                        }}
                    />
                </Panel>
                <Panel header="Colour" style={{ marginTop: '45px' }}>
                    <RefinementList
                        attribute="Option2 Value"
                        searchable={true}
                        translations={{
                            placeholder: 'Search for colour',
                        }}
                    />
                </Panel>
            </Flex>
            <Flex width='80%' margin='20px 0 0 0' justifyAround>
                <Hits hitComponent={Hit} newIn={newIn} />
                {/* {renderItems()}
          {/* {productList && productList.map((i, id) => {
            return <Link key={id} to={`/clothing/${i.slug}`}><ClothingItem data={productList} key={id} title={i.productName.productName} description={i.productDescription.productDescription} src={i.image[0].fluid.src} price={i.price} /></Link>
          })} */}
            </Flex>
        </Flex>
    </InstantSearch>
)

export default ProductHitsWithFilter