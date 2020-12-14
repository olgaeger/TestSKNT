<?php
class ApiLink extends Link //Объявление дочернего(расширенного) класса ApiLink
{
    private $json;
//Открытый метод
	public function __construct($link) 
    {
		parent::__construct($link); //Обращение к родительскому классу, от которого наследуемся
        if (!$this->responseIsJSON()){ 
			throw new \InvalidArgumentException('response is not valid JSON');} 
			return $this->json; 
	}
//Получение JSON
	public function getJson(){ 
		return $this->json;
	}
//Декодировка полученного JSON и проверка, действительно ли это JSON
	private function responseIsJSON(){ 
		$this->json = json_decode($this->getContents());  
		return json_last_error()===0; 
	}
}