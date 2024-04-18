import { createContext, useEffect } from "react";
import JobCard from "./components/job-card/JobCard";
import JobData from "./data/data.json";
import { useState } from "react";
import CategoryFilterButton from "./components/category-filter-button/CategoryFilterButton";

export const FilterContext = createContext();

function App() {
  const initialCategoryFilter = {
    role: '',
    level: '',
    languages: [],
    tools: [],
  };

  const [jobDataState, setJobDataState] = useState(JobData);
  const [filterState, setFilterState] = useState(initialCategoryFilter);

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

  const emptyCategoryFilter = () => setFilterState(initialCategoryFilter);

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
        flex flex-col items-center
        h-[9.75rem]
        px-12
        bg-[url('./assets/images/bg-header-desktop.svg')] bg-desaturatedDarkCyan"
      >
        {filteredCategoryList.some((cat) => cat) && (
          <div className="
            CATEGORY-FILTER-BAR-WRAPPER
            flex justify-center
            w-full rounded-[0.25rem]
            px-12
            mt-[7.5rem]
            z-10 absolute 
          ">
            <div className="
              CATEGORY-FILTER-BAR
              animated animatedFadeIn fadeInUp    
              flex flex-row justify-between
              w-full rounded-[0.25rem]
              drop-shadow-lg-cyan bg-white 
              px-10 py-5
              xl:max-w-[69.375rem] lg:max-w-[73.75rem]"
            >
              <div className="
                CATEGORY-FILTER-BUTTONS-WRAPPER
                flex flex-row flex-wrap items-center gap-4
              ">
                {filteredCategoryList.map((category, index) => (
                  category && 
                  <CategoryFilterButton
                    key={`category-filter-button-` + index}
                    categoryName={category[0]}
                    categoryValue={category[1]} 
                    removeCategoryFilter={removeCategoryFilter}
                  />
                ))}
              </div>
              <span className="
                self-center
                font-semibold 
                transition-all duration-150 ease-in"
              >
                <button 
                  className="hover:underline hover:text-desaturatedDarkCyan"
                  onClick={emptyCategoryFilter}>Clear</button>
              </span>
            </div>
          </div>
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
