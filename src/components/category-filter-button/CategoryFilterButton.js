export default function CategoryFilterButton(props) {
  const {
    categoryName,
    categoryValue,
    removeCategoryFilter,
  } = props

  const getButtonAttribute = (event, attr) => event.target.getAttribute(attr);
  const removeCategoryFilterClickHandler = (e) => {
    const name = getButtonAttribute(e, 'data-name');
    const value =getButtonAttribute(e, 'data-value');

    removeCategoryFilter(name, value);
  }

  return (
    <div className="
      SELECTED-CATEGORY-FILTER-BUTTON
      animated animatedFadeIn fadeInLeft
      flex 
      rounded-md
      overflow-hidden"
    >
      <span className="
        px-2 pt-0.5
        text-base font-semibold text-desaturatedDarkCyan
        content-center
        bg-lightGrayishCyanFilterTablets"
      >{categoryValue}</span>
      <button className="
        bg-desaturatedDarkCyan
        text-white
        p-[0.563rem]
        transition-all duration-150 ease-in
        hover:bg-veryDarkGrayishCyan"
        data-name={categoryName}
        data-value={categoryValue}
        onClick={removeCategoryFilterClickHandler}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={4} 
          stroke="currentColor" 
          className="w-[18px] h-[18px] pointer-events-none"
        >
          <path 
            className="pointer-events-none"
            strokeLinecap="square" 
            strokeLinejoin="miter" 
            d="M6 18 18 6M6 6l12 12" 
          />
        </svg>
      </button>
    </div>
  )
}