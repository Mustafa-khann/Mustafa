import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import "./App.css";
import "./styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";
import Posts from "./components/Posts";
import PostDetail from "./components/PostDetail";
import Books from "./components/Books";
import Research from "./components/Research";
import ResearchDetail from "./components/ResearchDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id="content">
          <Switch>
            <Route path="/books" component={Books} />
            <Route path="/posts/:id" component={PostDetail} />
            <Route path="/posts" component={Posts} />
            <Route path="/research/:id" component={ResearchDetail} />
            <Route path="/research" component={Research} />
            <Route path="/" exact>
              <Intro />
              <About />
              <Experience />
              <Projects />
              <Credits />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
