<?php  
  
  
class controller__test {  
  
  
    public function write($controller, $method) {  
        //config__test::load('test');  
        model__test::write($controller, $method);  
    }  
  
  
}  

  
class model__test {  
  
    public function write($model, $method) {  
        echo 'From controller:'.$model.' to model: ' . $model . ' ,method: ' . $method;  
    }  
  
}  
?>