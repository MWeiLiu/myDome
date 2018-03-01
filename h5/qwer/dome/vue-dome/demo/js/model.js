$(function(){
	//商品
	new Vue({
	    el: '#good',
	    data: {
	    	gods: [
	        {id: '1',img: 'img/1.jpg',title: '苹果',price: '10元/斤'},
			{id: '2',img: 'img/1.jpg',title: '橘子',price: '20元/斤'},
			{id: '3',img: 'img/1.jpg',title: '葡萄',price: '30元/斤'}]
	    },
	    methods: {
	    	deleteMsg:function(){
	    		var ids = [];
		        $(".good li").each(function (i,v) {
		            var id = $(v).attr("data-id");
		            ids.push(id);
		        });
		        if (ids.length != 0) {
                    var amounts = 0;
                    $(".good li").each(function (i, v) {
                        var id = $(v).attr("data-id");
                        if (ids.indexOf(id) > -1) {
                            $(v).parents("li").remove();
                        }
                    });
                    if ($(".good li").length == 0) {
                        $(".editor").show();
                    }
		        }
	    	}
	    }
	});
	
	//商店
	new Vue({
	    el: '#shop',
	    data: {
	    	shops: [
	        {id: '1',img: 'img/1.jpg',title: '水果店'},
			{id: '2',img: 'img/1.jpg',title: '蔬菜店'},
			{id: '3',img: 'img/1.jpg',title: '烟酒店'}]
	    }
	});
	
	
//	new Vue({
//	    el: '#app',
//	    data: {
//	        todos: [  ] 
//	    },
//	    created: function() {
//	        $.get('你的api')
//	          .done((data) => {
//	                this.todos = data;
//	          });
//	    }
//	});
})
