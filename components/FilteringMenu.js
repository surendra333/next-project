import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DATE_FILTERING_ICONS = ['sort-numeric-down', 'sort-numeric-up'];
 const LIST_VIEW_ICONS = ['list','border-all']
const FilteringMenu = ({onChange,filter}) => {
    return (
        <div className='filtering-menu b2'>
            <FontAwesomeIcon className='clickable hoverable' style={{marginRight:'10px'}} size='lg' icon={LIST_VIEW_ICONS[filter.view.list]} onClick={() => onChange('view', { list: +!filter.view.list })}/>
           
           <FontAwesomeIcon
        className="clickable hoverable"
        size="2x"
        icon={DATE_FILTERING_ICONS[filter.date.asc]}
        onClick={() =>
          onChange('date', {asc: +!filter.date.asc })} />
        </div>
    )
}
export default FilteringMenu;