//index.js
const app = getApp()

Page({
  data: {
    swiper: {
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 800,
      imgUrls: ['../../images/indexSwiper_1.jpg', '../../images/indexSwiper_2.jpg', '../../images/indexSwiper_3.jpg', '../../images/indexSwiper_4.jpg']
    },
    horizontal: [
      {
        img: '../../images/plan.png',
        text: '活动策划'
      },
      {
        img: '../../images/wedding.png',
        text: '婚礼定制'
      },
      {
        img: '../../images/video.png',
        text: '视频中心'
      },
      {
        img: '../../images/dynamic.png',
        text: '最新动态'
      },
    ],
    wedding: [
      '../../images/indexSwiper_1.jpg', 
      '../../images/indexSwiper_2.jpg', 
      '../../images/indexSwiper_3.jpg', 
      '../../images/indexSwiper_3.jpg', 
      '../../images/indexSwiper_4.jpg'
    ],
    aboutUs: {
      img: '../../images/aboutUs.jpg',
      text: '喜鹊传媒是一家拥有年轻理念的综合优质服务商，创建于2016年，自组建团队以来，秉承以-精品-定制-高端的服务理念，在短暂的时间内得到客户及行业内的高度认可。凭借年轻新颖的理念，精准卓越的服务！'+
            '曾先后为天之蓝巡回演唱会、建业地产、万和城地产、名仕豪庭、上亿广场等知名地产企业和机构提供优质的创意服务。'+
            '拥有着国内顶尖的创意，策划，设计，活动执行团队。通过丰富的实战经验和深厚的专业涵养，为客户提供行业和区域最具销售力，竞争力和影响力的综合服务，尽心尽力致力于实效完美的创意及落地！'
    }
  }
})
