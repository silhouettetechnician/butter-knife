import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from './List'

const FilterBar = ({ data,checkedInputs,setCheckedInputs, checked, handleInputChange, setChecked, handleSelectedExperts, brands, colors, colours, types, selectedExpertArr, colorsArray, setProductList, productList, activeFilter}) => {
    console.log(colours, 'colours inn filter bar')
    return (
        <div style={{margin: '2%', width: '80%'}}>
            <Accordion expanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Colour</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <List data={colours} handleInputChange={handleInputChange} checkedInputs={checkedInputs} setCheckedInputs={setCheckedInputs} checked={checked} setChecked={setChecked} colors={colors} colorsArray={colorsArray} selectedExpertArr={selectedExpertArr} productList={productList} handleSelectedExperts={handleSelectedExperts} setProductList={setProductList} activeFilter={activeFilter}/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <List data={types} colors={colors} colorsArray={colorsArray} handleInputChange={handleInputChange} checkedInputs={checkedInputs} setCheckedInputs={setCheckedInputs} productList={productList} handleSelectedExperts={handleSelectedExperts} setProductList={setProductList} activeFilter={activeFilter}/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>Brand</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <List data={brands} handleInputChange={handleInputChange} checkedInputs={checkedInputs} setCheckedInputs={setCheckedInputs} selectedExpertArr={selectedExpertArr} productList={productList} handleSelectedExperts={handleSelectedExperts} setProductList={setProductList} activeFilter={activeFilter}/>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default FilterBar