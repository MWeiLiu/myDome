package com.sinossc.stocktrade.bossweb.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.sinossc.stocktrade.bossweb.common.SendARUtil;
import com.sinossc.stocktrade.bossweb.common.SessionUtil;
import com.sinossc.stocktrade.tradecenter.facade.stub.vo.ExternalRecDetailResultVO;

/**
 * XXX管理
 * @author haoyanyan 2017.10.24 10:00
 *
 */
@Controller //使用Spring框架注解
@RequestMapping("recDetail") //外部访问接口的地址
public class TestController {
	
	//访问该接口时这样请求地址    本机IP:端口号/路径
	// http://127.0.0.1:8080/recDetail/showTest   点击菜单返回一个页面时这样用
	//http://127.0.0.1:8080/recDetail/selectStudent  前端要联调后台，获取所有学生的信息
	
	/**
	 * 去XXX管理页
	 * @return
	 */
	@RequestMapping("showTest") //外部访问接口的方法地址
	public String showTest(){
		return "jsp/test/showTest"; //反悔一个页面，在jsp包下的test包下的showTest.jsp
	}
	
	/**
	 * 查询学生列表数据
	 * @author haoyy 2017.10.23 09:40
	 * @param vo
	 * @return
	 */
	@RequestMapping(value="selectStudent", method={RequestMethod.POST}) //该方法对应的访问地址，前端只能是post请求来访问
	@ResponseBody
	public List<Student> selectRecDiffDetail(Student vo){
		//这里不去查数据库然后返回对应的数据，我做个测试，自己组装个集合数据出来
		
		//Student是实体类，对应你要展示在前端的数据
		List<Student> list = new ArrayList<Student>();
		Student st1 = new Student();//创建一个实体类对象
		st1.setSid(1001L);
		st1.setName("刘威");
		st1.setAge(23);
		Student st2 = new Student();//创建第二个实体类对象
		st2.setSid(1001L);
		st2.setName("刘威");
		st2.setAge(23);
		
		list.add(st1);//把对象1放到数组中
		list.add(st2); //把对象二放到数组中
		//将集合返回，前端调用该接口后就会拿到这个list中的值
		return list;
	}
	
	/**
	 *  查询本地存在的外部对账明细数据
	 * @author haoyy 2017.10.23 09:40
	 * @param vo
	 * @return
	 */
	@RequestMapping(value="selectRecLocalDetail", method={RequestMethod.POST})
	@ResponseBody
	public String selectRecLocalDetail(ExternalRecDetailResultVO vo){
		if(logger.isInfoEnabled()){
			logger.info(" 查询本地存在的外部对账明细数据列表,入参数据ExternalRecDetailResultVO{}", JSON.toJSONString(vo));
    	}
		SessionUtil.setCommonParams(vo);
		String result = null;
        try {
        	result = SendARUtil.send("/externalReconciliationDetailResult/selectRecLocalDetail", vo);
        	if(logger.isDebugEnabled()){
	        	logger.debug(" 查询本地存在的外部对账明细数据列表成功!", result);
	        }
        } catch (Exception e) {
        	if(logger.isErrorEnabled()){
        		logger.error(" 查询本地存在的外部对账明细数据列表异常", e);
			}
		}
		return result;
	}
	
	/**
	 * 查询券商存在的外部对账明细数据
	 * @author haoyy 2017.10.23 09:40
	 * @param vo
	 * @return
	 */
	@RequestMapping(value="selectRecTraderDetail", method={RequestMethod.POST})
	@ResponseBody
	public String selectRecTraderDetail(ExternalRecDetailResultVO vo){
		if(logger.isInfoEnabled()){
			logger.info(" 查询券商存在的外部对账明细数据列表,入参数据ExternalRecDetailResultVO{}", JSON.toJSONString(vo));
    	}
		SessionUtil.setCommonParams(vo);
		String result = null;
        try {
        	result = SendARUtil.send("/externalReconciliationDetailResult/selectRecTraderDetail", vo);
        	if(logger.isDebugEnabled()){
	        	logger.debug(" 查询券商存在的外部对账明细数据列表成功!", result);
	        }
        } catch (Exception e) {
        	if(logger.isErrorEnabled()){
        		logger.error(" 查询券商存在的外部对账明细数据列表异常", e);
			}
		}
		return result;
	}
	
}
