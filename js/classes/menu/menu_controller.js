//  Класс меню
class Menu{
    constructor(element){

		this.Show = function(){     //Показать меню
			element.classList.remove("hidden");
		}
		this.Hide = function(){     //Спрятать меню
			element.classList.add("hidden");
		}
		this.GetElement = function(){
			return element;
		}
		this.GetID = function(){
			return element.id;
		}
  }
}

//  Класс контроллера меню
class MenuController{
   constructor(){
       var MenuList = [];

       this.addMenu = function(menu){      //Добавить меню в список доступных меню
           MenuList.push(menu);
       }

       this.getMenuList = function(){   //Вернуть список доступных меню
           return MenuList;
       }

       this.showMenu = function(id){    //Показать нужное и спрятать ненужные меню
           MenuList.forEach(function(menu){
            if(menu.GetID() == id){
              menu.Show();
            }
            else{
              menu.Hide();
            }
        });
       }
   }
}
