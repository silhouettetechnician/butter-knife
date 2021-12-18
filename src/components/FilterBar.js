import React, { useContext, useState } from 'react'
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
import StoreContext from '../contexts/StoreContext'
// import InputRange from 'react-input-range';
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

const FilterBar = ({  checkboxesToFilter, price, setPrice, getItems, handleInputChange }) => {
    const classes = useStyles();
    const { state } = useContext(StoreContext)
    
    return (
        <div id='content-desktop' className={classes.root} style={{ margin: '2%', width: '95%' }}>
            {Object.entries(checkboxesToFilter).map(([key, val]) =>
                <Accordion style={{ backgroundColor: `${state.isDark ? '#212121' : 'white'}` }} expanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography style={{ color: `${state.isDark ? 'white' : 'black'}`, textDecorationColor: `${state.isDark ? '#0131D2' : 'rgb(254, 205, 47)'}` }} className='filterLabel'>{key}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {val.sort().map(i => {
                            const labelId = `checkbox-list-label-${i}`;
                            return <ListItem style={{ color: `${state.isDark ? 'white' : 'black'}` }} key={i} role={undefined}>
                                <ListItemIcon>
                                    <Checkbox
                                        style={{ color: `${state.isDark ? 'white' : 'black'}` }}
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
            <Typography style={{ color: `${state.isDark ? 'white' : 'black'}`, textDecorationColor: `${state.isDark ? '#0131D2' : 'rgb(254, 205, 47)'}` }} className='filterLabel'>Size</Typography>
            {/* <InputRange
                formatLabel={value => `£${value}`}
                maxValue={parseInt(priceMax)}
                minValue={parseInt(priceMin)}
                value={price}
                onChange={value => {setPriceDetect(!priceDetect); return setPrice({min: parseInt(value.min), max: parseInt(value.max)})}}
                onChangeComplete={value => setPrice({min: parseInt(value.min), max: parseInt(value.max)})}
                 /> */}
        </div>
    )
}

export default FilterBar
