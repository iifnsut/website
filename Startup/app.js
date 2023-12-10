const widgets = document.getElementById('widgets');
const dropdownSelection = document.getElementById('dropdownSelection');
function filterWidgets(obj){
    const divSelector = obj.parentElement;
    const activeButton = divSelector.getElementsByClassName('active')[0];
    const activeFilter = activeButton.getAttribute('data-filter');
    const filter=obj.getAttribute('data-filter');
    widgets.classList.remove(activeFilter+"-filter");
    activeButton.classList.remove('active');
    dropdownSelection.textContent=filter.charAt(0).toUpperCase() + filter.slice(1);
    widgets.classList.add(filter+'-filter');
    obj.classList.add('active');
}