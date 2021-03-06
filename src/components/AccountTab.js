import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const CenteredTabs = ({value, setValue}) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="rgb(254, 205, 47)"
        textColor="rgb(254, 205, 47)"
        centered
      >
        <Tab label="Account details" />
        <Tab label="Past orders" />
        <Tab label="Item Three" />
      </Tabs>
    </Paper>
  );
}

export default CenteredTabs