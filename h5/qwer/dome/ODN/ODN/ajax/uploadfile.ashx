<%@ WebHandler Language="C#" Class="uploadfile" %>

using System;
using System.IO;
using System.Web;
using System.Web.SessionState;
using System.Net;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Xml.Linq;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Security.Cryptography;
public class uploadfile : IHttpHandler, IRequiresSessionState
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/html";
        context.Response.Charset = "UTF-8";

        try
        {
            string size = "", name = "", lj = "", filename = "", wjm = "";
            string uploadpath = context.Server.MapPath(@"/u/");//保存路径 
            HttpPostedFile uploadFile = context.Request.Files[0];//文件  
            //目录验证
            if (!Directory.Exists(uploadpath))
                Directory.CreateDirectory(uploadpath);

            string[] temp = uploadFile.FileName.Split('.');
            string currentType = "." + temp[temp.Length - 1].ToLower();
            size = uploadFile.ContentLength / 1024 + " K";

            //MD5版本
            int countBytes = uploadFile.ContentLength;
            byte[] buffer = new byte[countBytes];
            uploadFile.InputStream.Read(buffer, 0, countBytes);
            MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider();
            byte[] data = md5Hasher.ComputeHash(buffer);
            // 32位
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            foreach (byte b in data) sb.Append(b.ToString("x2"));
            name = sb.ToString() + currentType;

            wjm = uploadFile.FileName;
            if (wjm.IndexOf('\\') > -1)
                wjm = wjm.Substring(wjm.LastIndexOf('\\') + 1);

            filename = uploadpath + name;
            lj = @"/u/" + name;

            uploadFile.SaveAs(filename);
            //向浏览器返回数据json数据
            context.Response.Write("<script type=\"text/javascript\">parent.imageupload=\"" + lj +
                "\";parent.imageOtherInfo={\"size\":\"" + size + "\",\"filename\":\"" + wjm + "\"}</script>");

        }
        catch (Exception ee)
        {   
            context.Response.Write("<script type=\"text/javascript\">parent.imageMessage=\"系统异常"+ee.Message+"\";</script>");
        }
    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}
