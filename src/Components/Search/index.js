import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import "./search.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../Store/StateProvider";
import { actionTypes } from "../../Store/reducer";

export default function Search({hideButtons=false}) {
  const [state, dispatch] = useStateValue()
  const [searchVal, setSearchVal] = useState(state.searchTerm || "");
  const history = useHistory()

  const search = (e) => {
    e.preventDefault();
    console.log(searchVal)
    dispatch({
        type: actionTypes.SET_SEARCH_TERM,
        searchTerm: searchVal
    })
    history.push(`/search/${encodeURI(searchVal)}`)
    
  };
  // console.log(searchVal)
  return (
    <div className="search">
      <div className="search_input">
        <SearchIcon className="search_input_icon" />
        <input 
            value={searchVal}
            onChange={e=>setSearchVal(e.target.value)}
            onKeyDown={(e)=>(e.keyCode===13 && search(e))}
        />
        <MicIcon />
      </div>

      {
          !hideButtons && 
            <div className="search_buttons">
                <Button onClick={search} variant="outlined">
                Google Search
                </Button>
                <Button variant="outlined">I'm feeling lucky</Button>
            </div>
      }
    </div>
  );
}
