import JobCard from "./components/job-card/JobCard";
import JobData from "./data/data.json";

function App() {
  return (
    <div className="
      App 
      w-screen bg-lightGrayishCyanBackground 
      text-darkGrayishCyan">
      <header className="h-[9.75rem] bg-[url('./assets/images/bg-header-desktop.svg')] bg-desaturatedDarkCyan">
      </header>
      <main className="
        flex flex-col items-center gap-6
        px-8 pt-[4.75rem] pb-[6.063rem]"
      >      
        {JobData.map((data) => <JobCard data={data} key={`job-card-${data.id}`}/>)}
      </main>
    </div>
  );
}

export default App;
