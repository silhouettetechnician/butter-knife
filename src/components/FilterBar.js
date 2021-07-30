import React, { useState } from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '&$checked': {
            color: 'rgb(254, 205, 47)',
        },
        width: '100%',
        maxWidth: 360,
    },
    checked: {}

}));

const FilterBar = ({  checkboxesToFilter, handleInputChange}) => {
    const classes = useStyles();
    return (
        <div className={classes.root} style={{ margin: '2%', width: '75%' }}>
            {Object.entries(checkboxesToFilter).map(([key, val]) => 
            <Accordion expanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography className='filterLabel'>{key}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {val.map(i => {
                        const labelId = `checkbox-list-label-${i}`;
                        return <ListItem key={i} role={undefined}>
                            <ListItemIcon>
                                <Checkbox
                                    value={i}
                                    onChange={(e) => handleInputChange(e, key)}
                                    tabIndex={-1}
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked
                                    }}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${i}`} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    })}
                </AccordionDetails>
            </Accordion>)}
        </div>
    )
}

export default FilterBar