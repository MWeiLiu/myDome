var bb = {
  aa: function (event, obj){
    var self = obj;
    if(event == 'false'){
        self.animation.rotateY(90).step();
  
        self.setData({
          animate1: self.animation.export()
        });
      
      setTimeout(function(){
        self.fan2();
        self.setData({
          backface: 'true'
        })
      }, 400);
    }else{
        self.animation.rotateY(90).step();
  
        self.setData({
          animate2: self.animation.export()
        });
      
      setTimeout(function(){
        self.fan3();
        self.setData({
          backface: 'false'
        })
      }, 500);
    }
  }
}

module.exports.bb = bb