import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        '&$checked': {
            color: 'rgb(254, 205, 47)',
          },
        width: '100%',
        maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
    },
    checked: {}

}));

const CheckboxList = ({ colours, handleChange }) => {
    const classes = useStyles();
    console.log(colours, 'colours list')
    return (
        <List className={classes.root}>
            {colours && colours.map(color => {
                const labelId = `checkbox-list-label-${color}`;
                return (
                    <ListItem key={color} role={undefined} dense button /*onClick={handleToggle(color)}*/>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                // checked={checked} 
                                onChange={(event) => handleChange(event, color)}
                                tabIndex={-1}
                                classes={{
                                    root: classes.root,
                                    checked: classes.checked
                                  }}
                                disableRipple
                                labelStyle={{color: 'rgb(254, 205, 47)'}}
                                iconStyle={{color: 'rgb(254, 205, 47)'}}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${color}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}
export default CheckboxList