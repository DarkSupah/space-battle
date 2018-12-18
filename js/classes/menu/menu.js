//  Класс меню
class Menu{
    constructor(element){
        var _element = element;
		
		this.Show = function(){     //Показать меню
			_element.classList.remove("hidden");
		}
		this.Hide = function(){     //Спрятать меню
			_element.classList.add("hidden");
		}
		this.GetElement = function(){
			return _element;
		}
		this.GetID = function(){
			return _element.id;
		}
    }
}