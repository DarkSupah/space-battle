//Класс таймера
class Timer{
  constructor(){
    var time = 0;         //Время в таймере

    var started = false;  //Запущен ли таймер

    this.setTime = function(amt){   //Установить время на таймере
      time = amt;
    }

    this.start = function(){        //Запустить таймер
      started = true;
    }

    function run(){
      if(!started)
        return;

      time++;
    }

    this.addTime = function(amt){   //Метод добавления времени к таймеру
      time += amt;                //Если меньше, то добавить время
    }

    this.stop = function(){         //Остановить таймер
      started = false;
    }

    this.getTime = function(){      //Получить время без формата
      return time;
    }

    //Вызываем метод run каждую секунду
    setInterval(run, 1000);
  }
}
