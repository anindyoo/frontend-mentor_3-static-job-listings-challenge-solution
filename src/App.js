import { createContext, useEffect } from "react";
import JobCard from "./components/job-card/JobCard";
import JobData from "./data/data.json";
import { useState } from "react";
import CategoryFilterButton from "./components/category-filter-button/CategoryFilterButton";

export const FilterContext = createContext();

function App() {
  const [jobDataState, setJobDataState] = useState(JobData);
  const [filterState, setFilterState] = useState({
    role: '',
    level: '',
    languages: [],
    tools: [],
  });

  const addCategoryFilter = (name, value) => {
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

  const removeCategoryFilter = (name, value) => {
    if (name === 'languages' || name === 'tools') {
      setFilterState((filter) => ({
        ...filter,
        [name]: filter[name].filter((cat) => cat !== value),
      }));
    } else {
      setFilterState((filter) => ({
        ...filter,
        [name]: '',
      }));
    }
  }

  const filteredCategoryList = Object.entries(filterState)
    .flatMap(([key, value]) => {
      return value.length > 0 && (Array.isArray(value) ? value.map(v => [key, v]) : [[key,value]])
    }
  );

  useEffect(() => {
     setJobDataState(JobData.filter((job) => {        
      return Object.entries(filterState)
        .every(([key, value]) => {
          const currentJobValue = job[key];
  
          return !value.length ? true 
            : Array.isArray(currentJobValue) 
              ? value.every((element) => currentJobValue.includes(element)) 
              : value === currentJobValue
        })
      })
    );
  }, [filterState]);
  

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
        {filteredCategoryList.some((cat) => cat) && (
          <div className="
            animated animatedFadeIn fadeInUp    
            flex flex-row flex-wrap items-center gap-4
            h-[4.5rem] w-full rounded-[0.25rem]
            drop-shadow-lg-cyan bg-white 
            px-10 
            mt-[7.5rem] 
            z-10 absolute
            xl:min-w-[69.375rem] xl:max-w-[69.375rem]"
          >{filteredCategoryList.map((category, index) => (
            category && <CategoryFilterButton
              key={`category-filter-button-` + index}
              categoryName={category[0]}
              categoryValue={category[1]} 
              removeCategoryFilter={removeCategoryFilter}
            />
          ))}</div>
        )}
      </header>
      <main className="
        flex flex-col items-center gap-6
        px-12 pt-[4.75rem] pb-[6.063rem]"
      >
        {jobDataState.map((data) => 
          <JobCard 
            key={`job-card-${data.id}`}          
            data={data} 
            addCategoryFilter={addCategoryFilter}
          />)}
      </main>
    </div>
  );
}

export default App;
