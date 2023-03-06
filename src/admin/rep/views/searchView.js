import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import {searchRep} from '../services/services';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default function SearchView() {
  const [query, setQuery] = React.useState("");
  const [searchList, setSearchList] = React.useState([]);

  React.useEffect( () => {
    if (query.length >= 3) {
      searchRep(query)
      .then(repList => {
        let list = [];
        repList.docs.map(doc => list.push({id: doc.id, data:doc.data()}));
        setSearchList(list);
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    } else {
      setSearchList([]);
    }
  }, [query]);

  const Row = ({ index, style }) => (
    <ListItem button style={style} key={index} component={Link} to={"/admin/rep/"+searchList[index].id}>
      <ListItemText primary={searchList[index].data.firstName} />
    </ListItem>
  );

  const handleInputChange = event => {
    const query = event.target.value;
    setQuery(query);
  }
    return (
      <>
      <TextField
        id="search-bar"
        placeholder="Search…"
        size="medium"
        variant="outlined"
        color="secondary"
        onChange={handleInputChange}
        fullWidth
      />
      <br /><br />
      <FixedSizeList height={searchList.length > 5 ? 200 : searchList.length * 40} itemSize={40} itemCount={searchList.length}>
        {Row}
      </FixedSizeList>

      </>
    )
  }