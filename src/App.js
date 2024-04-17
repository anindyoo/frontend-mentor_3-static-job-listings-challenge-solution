import { createContext } from "react";
import JobCard from "./components/job-card/JobCard";
import JobData from "./data/data.json";
import { useState } from "react";
import CategoryFilterButton from "./components/category-filter-button/CategoryFilterButton";

export const FilterContext = createContext();

function App() {
  const [filterState, setFilterState] = useState({
    role: '',
    level: '',
    languages: [],
    tools: [],
  });

  const filterCategory = (name, value) => {
    if (name === 'languages' || name === 'tools') {
      let pass = name === 'languages' ? !filterState.languages.includes(value) 
        : name === 'tools' ? !filterState.tools.includes(value)
        : true;
      
      pass && setFilterState((filter) => ({
        ...filter,
        [name]: [...filter[name], value],
      }));
    } else {
      setFilterState((filter) => ({
        ...filter,
        [name]: value,
      }));
    }
  };

  const filteredCategoryList = Object.values(filterState).filter(x => x.length > 0);  

  JobData =  JobData.filter((job) => {        
    return Object.entries(filterState)
      .every(([key, value]) => {
        const currentJobValue = job[key];

        return !value.length ? true 
          : Array.isArray(currentJobValue) 
            ? value.every((element) => currentJobValue.includes(element)) 
            : value === currentJobValue
      })
  });

  return (
    <div className="
      App 
      w-screen bg-lightGrayishCyanBackground 
      text-darkGrayishCyan">
      <header className="
        flex justify-center
        h-[9.75rem] 
        px-12
        bg-[url('./assets/images/bg-header-desktop.svg')] bg-desaturatedDarkCyan"
      >
        {filteredCategoryList.length > 0 && (
          <div className="
          animated animatedFadeInUp fadeInUp    
            flex flex-row flex-wrap items-center
            h-[4.5rem] w-full rounded-[0.25rem]
            drop-shadow-lg-cyan bg-white 
            px-10 py-5
            mt-[7.5rem] 
            absolute
            xl:min-w-[69.375rem] xl:max-w-[69.375rem]"
          >{filteredCategoryList.map((category, index) => (
            <CategoryFilterButton
              key={`category-filter-button-` +index}
              category={category} 
            />
          ))}</div>
        )}
      </header>
      <main className="
        flex flex-col items-center gap-6
        px-12 pt-[4.75rem] pb-[6.063rem]"
      >
        <pre>
        {JSON.stringify(filterState, undefined, 2)}

        </pre>
        {JobData.map((data) => 
          <JobCard 
            key={`job-card-${data.id}`}          
            data={data} 
            filterCategory={filterCategory}
          />)}
      </main>
    </div>
  );
}

export default App;
