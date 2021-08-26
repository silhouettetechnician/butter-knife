import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

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

const CheckboxList = ({ data, productList, setProductList, checked, setChecked, }) => {
    const classes = useStyles();
    const [activeFilter, setActiveFilter] = useState([])
      const handleChange = (text) => (event) => {
        setActiveFilter((prev) => ({
          ...prev,
          [text]: event.target.checked,
        }));
    };

    return (
        <List className={classes.root}>
            {data && data.map(node => {
                const labelId = `checkbox-list-label-${node}`;
                return (
                    <ListItem key={node} role={undefined} dense button >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                value={node}
                                onChange={handleChange(node)}
                                tabIndex={-1}
                                classes={{
                                    root: classes.root,
                                    checked: classes.checked
                                  }}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${node}`} />
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