import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from './List'

const FilterBar = ({colours, handleChange}) => {

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
                <List colours={colours} handleChange={handleChange}/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Department</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
          </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>Colour</Typography>
                </AccordionSummary>
            </Accordion>
        </div>
    )
}

export default FilterBar