import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject()
  {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,        
      };
    })
  }

  function handleAddProject(projectData)
  {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId
    };

    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]        
      };
    })
  }

  function handleSelectProject(id)
  {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      };
    })
  }

  function handleCancelAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,        
      };
    })
  }

  function handleDeleteProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined, 
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)       
      };
    })
  }

  const selectProjectObj = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject onDelete={handleDeleteProject} project={selectProjectObj}> </SelectedProject>;

  if(projectsState.selectedProjectId === null)
  {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  }
  else if(projectsState.selectedProjectId === undefined)
  {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject}/>
      {content}
    </main>
  );
}

export default App;
