import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomeContainer from '../pages/HomeContainer'

const App = () => {
  return (
    <Router> 
        <Switch>
          <Route exact path="/" component={HomeContainer} />  
        </Switch>      
    </Router>
  );
}

export default App