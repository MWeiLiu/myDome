class myClass:
    """description of class"""
        
    def myDef(name, age):
        return '姓名：' + name + '\n年龄：' + age + '岁'
    
    def age(age):
        x = '未成年';
        if int(age) > 18:
            x = '已成年';
        return x

    def shuifei():

        '''
        4人电费、水费
        1月
         |
         27天
         |
        12月
         |
         31天
         |
        11月
         |
         30天
         |
        10月
         |
         10天

        98天

        3人电费、水费
        10月
         |
         21天
         |
        9月
         |
         30天
         |
        8月
         |
        19天

        70天

        '''

        str = input("截止1月27日水费69吨，共345元，请输入你的姓氏拼音计算水费：");
        amount = 5;#水费单价
        parnum = 7;#总人数
        num = 69.3844;#水表字数
        time1 = 98;#4人时间
        time2 = 70;#3人时间

        #每天的水费
        price = float(amount * num / (time1 + time2) / 7);

        #return price;


        if str == 'liu':
            liu = price * 2 * (time1 + time2);
            return liu;
             
        if str == 'hao':
            hao = price * 2 * (time1 + time2);
            return hao;
             
        if str == 'sun':
            sun = price * 2 * (time1 + time2);
            return sun;
             
        if str == 'yue':
            yue = price * time1;
            return yue;

    def wangfei():
        str = input("截止1月27日共168天，共780元，请输入你的姓氏拼音计算网费：");
        price = 780;
        m = 365;
        parnum = 7;
        time1 = 98;#4人时间
        time2 = 70;#3人时间

        #每人每天网费
        amount = price / m / parnum;

        if str == 'liu':
            liu = amount * (time1 + time2) * 2;
            return liu;
             
        if str == 'hao':
            hao = amount * (time1 + time2) * 2;
            return hao;
             
        if str == 'sun':
            sun = amount * (time1 + time2) * 2;#137.9 + 11.5 - 103
            return sun;
             
        if str == 'yue':
            yue = amount * time1;
            return yue;

    