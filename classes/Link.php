<?php
class Link  // Объявление класса Link
{
	public $link;
//Проверка на ссылку	
    public function __construct($link){ 
        if ($this->isLink($link)){
			$this->link = $link;}
		else {
			throw new \InvalidArgumentException('this is not link');}
	}
//Получение содержания
	public function getContents(){ 
		if($this->linkIsAvailable()){
			return file_get_contents($this->link);
		}
	}
//Доступна ли ссылка
	private function linkIsAvailable(){ 
		if (get_headers($this->link, 1)['0']=='HTTP/1.1 200 OK'||get_headers($this->link, 1)['0']=='HTTP/1.1 301 Moved Permanently'){
			return true;
		}else{
			throw new \LogicException('link is not available');
		}
	}
// Валидация URL	
	private function isLink($link){ 
        return preg_match('/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/',$link); 
	}
}