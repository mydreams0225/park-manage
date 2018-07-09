var Mock=require('mockjs');
Mock.mock('/api/data',function(){
	return{
		data:[{username:"admin"}]
	}
})