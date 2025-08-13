import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import "./styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";

// Route-based code splitting
const Intro = lazy(() => import("./components/Intro"));
const Experience = lazy(() => import("./components/Experience"));
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Credits = lazy(() => import("./components/Credits"));
const Posts = lazy(() => import("./components/Posts"));
const PostDetail = lazy(() => import("./components/PostDetail"));
const Books = lazy(() => import("./components/Books"));
const Ideas = lazy(() => import("./components/Ideas"));
const IdeaDetail = lazy(() => import("./components/IdeaDetail"));
const ProjectList = lazy(() => import("./components/ProjectList"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));

function App() {
  return (
    <div className="App">
      <NavBar />
      <div id="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/books" exact component={Books} />
            <Route path="/posts/:title" component={PostDetail} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/ideas/:title" component={IdeaDetail} />
            <Route path="/ideas" exact component={Ideas} />
            <Route path="/projects/:title" component={ProjectDetail} />
            <Route path="/projects" exact component={ProjectList} />
            <Route path="/" exact>
              <Intro />
              <About />
              <Experience />
              <Projects />
              <Credits />
            </Route>
            <Route>
              <div style={{ padding: 24 }}>Page not found.</div>
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
