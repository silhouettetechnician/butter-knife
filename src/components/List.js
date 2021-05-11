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

const CheckboxList = ({ data, handleChange, checkedInputs, setCheckedInputs, productList, setProductList, checked, setChecked, }) => {
    const classes = useStyles();
    const handleInputChange = (event) => {
        console.log(event, '[event.target.value]: event.target.checked')
        setCheckedInputs({ ...checkedInputs, [event.target.value]: event.target.checked })
      }
    return (
        <List className={classes.root}>
            {data && Object.entries(data).map(([color, value]) => {
                const labelId = `checkbox-list-label-${color}`;
                return (
                    <ListItem key={color} role={undefined} dense button /*onClick={handleToggle(color)}*/>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                // checked={checkedInputs[value]}
                                value={color}
                                onChange={(e) => handleInputChange(e)}
                                tabIndex={-1}
                                classes={{
                                    root: classes.root,
                                    checked: classes.checked
                                  }}
                                disableRipple
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