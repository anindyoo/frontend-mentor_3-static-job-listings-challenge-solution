export default function JobCard(props) {
  const { 
    data,
    addCategoryFilter,
  } = props;

  const filterTabletStlye = `
    rounded-sm bg-lightGrayishCyanFilterTablets
    px-2 pt-[0.625rem] pb-[0.375rem]
    font-bold text-[0.984rem]/[1em] text-desaturatedDarkCyan
    transition-all duration-150 ease-in
    hover:bg-desaturatedDarkCyan hover:text-white`;

  const replaceWhitespace = (str) => str.replace(/\s+/g, '-').toLowerCase();
  const keyTemplate = replaceWhitespace(data.company) + '-' + replaceWhitespace(data.position) + '-';

  const getButtonAttribute = (event, attr) => event.currentTarget.getAttribute(attr);
  const addCategoryFilterClickHandler = (e) => {
    const name = getButtonAttribute(e, 'data-name')
    const value = getButtonAttribute(e, 'data-' + name);

    addCategoryFilter(name, value);
  };

  return (
    <div
      className={`
        JOB-CARD
        flex flex-row
        w-full h-auto max-h-[9.5rem]
        border-l-[0.313rem] rounded-md
        pl-[2.188rem] pr-10 py-8
        drop-shadow-lg-cyan bg-white
        xl:max-w-[69.375rem] 
        ${
          data.featured ? `border-l-desaturatedDarkCyan` : `border-l-white`
        }`}
    >
      <img src={require(`./../../assets/images/${data.logo}`)} alt="" />
      <div className="
        JOB-CARD-DESC-WRAPPER 
        flex flex-col
        ml-6"
      >
        <div className="JOB-CARD-DESC-UPPER flex flex-row mb-2">
          <h6 className="font-bold text-lg text-desaturatedDarkCyan md:truncate">{data.company}</h6>
          <span className="
            flex flex-row items-center gap-2
            ml-4
            text-sm text-white font-bold"
          >
            {data.new && (
              <p className="
                px-2 pt-[0.125rem]
                bg-desaturatedDarkCyan rounded-full"
              >NEW!</p>
            )}
            {data.featured && (
              <p className="
                px-2 pt-[0.125rem]
                bg-veryDarkGrayishCyan rounded-full"
              >FEATURED</p>
            )}
          </span>
        </div>
        <a 
          href="#"
          className="
            font-bold text-[1.375rem]/[1em] text-veryDarkGrayishCyan
            mb-2
            max-lg:text-[0.938rem]
            transition-all duration-150 ease-in
            hover:cursor-pointer hover:text-desaturatedDarkCyan"
        ><h4>{data.position}</h4></a>
        <div className="
          JOB-CARD-DESC-BOTTOM 
          flex flex-row place-items-center gap-4 
          font-md text-lg
          max-lg:text-sm"
        >
          <h6>{data.postedAt}</h6>
          <h6>•</h6>
          <h6>{data.contract}</h6>
          <h6>•</h6>
          <h6>{data.location}</h6>
        </div>
      </div>        
      <div className="
        flex flex-row flex-wrap grow items-center gap-4
        align-middle justify-end"
      >
        <button
          key={keyTemplate + data.role} 
          className={filterTabletStlye}
          data-name="role"
          data-role={data.role}
          onClick={addCategoryFilterClickHandler}
        >{data.role}</button>        
        <button 
          key={keyTemplate + data.level} 
          className={filterTabletStlye}
          data-name="level"
          data-level={data.level}
          onClick={addCategoryFilterClickHandler}
        >{data.level}</button>                  
        {data.languages.map((lang, index) => (
          <button 
            key={keyTemplate + lang + '-' + index}
            className={filterTabletStlye}
            data-name="languages"
            data-languages={lang}
            onClick={addCategoryFilterClickHandler}
          >{lang}</button>
        ))}
        {data.tools.map((tool, index) => (
          <button 
            key={keyTemplate + tool + '-' + index}
            className={filterTabletStlye}
            data-name="tools"
            data-tools={tool}
            onClick={addCategoryFilterClickHandler}
          >{tool}</button>
        ))}
      </div>
    </div>
  )
}