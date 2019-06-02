// 1.初始化数据
var keys = init()['keys']
var hash = init()['hash']

// 2.生成键盘
generateKbdboard(keys, hash)

// 3.监听键盘
document.onkeypress = function(e){
  if(!input.getAttribute("autofocus")){
    key = e.key
    // location.href = 'http://' + hash[key]
    window.open('http://' + hash[key], '_blank')
  }
}

// 4.生成搜索栏
var form = tag('form')
var input = tag('input', {type: 'text', placeholder: 'Search'})
var baidu = tag('a', {textContent: '百度', className: 'baidu'})
var google = tag('a', {textContent: '谷歌', className: 'google'})
form.appendChild(input)
form.appendChild(baidu)
form.appendChild(google)
header.appendChild(form)
document.onclick = function (evt){
  if(evt.target.localName == "input"){
    input.setAttribute("autofocus","autofocus")
  }else{
    input.removeAttribute("autofocus")
  }
}
var search_buttons = document.querySelectorAll("a");
for (var i = 0; i < search_buttons.length; i++) {
  search_buttons[i].onclick = function (evt){
    var question = document.querySelector("input").value;
    if (question) {
      switch(evt.target.className) {
        case "baidu": window.open("https://www.baidu.com/s?wd=" + question); break;
        case "google": window.open("https://www.google.com/search?q=" + question); break;
      }
    } else {
      location.reload()
    }
  }
}

createDescription()


function getFromLocalStorage(name){
  return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag(tagName, attributes){
  var element = document.createElement(tagName)
  for(var key in attributes){
    element[key] = attributes[key]
  }
  return element
}

function createButton(buttonId){
  var button = tag('button', {textContent: '编辑', id: buttonId})
  button.onclick = function(e){
    var button2 = e.target
    var img2 = button2.nextSibling
    var kbd2 = button.parentNode
    var key = button2.id //q w e r...
    x = prompt('新的导航地址为？ （PS：需要填写完整的域名哦！）')
    if(x == '' || x.result  == ''){
      alert('请输入新的导航网址')
    }else{
      hash[key] = x // hash 变更
      kbd2.title = x
      img2.src = 'http://' + x + '/favicon.ico'
      img2.onerror = function(e){
        e.target.src = 'http://' + 'i.loli.net/2019/06/01/5cf25ab4d49cd37954.png'
      }
      // hash 变更后将 hash 存到 localStorage
      localStorage.setItem('zzz', JSON.stringify(hash))
      alert('导航网址修改成功')
    }
  }
  return button
}

function createImg(domain){
  var img = tag('img')
  if(domain){
    img.src = 'http://' + domain + '/favicon.ico'
  }else{
    img.src = 'http://' + 'i.loli.net/2019/06/01/5cf25ab4d49cd37954.png'
  }
  img.onerror = function(e){
    e.target.src = 'http://' + 'i.loli.net/2019/06/01/5cf25ab4d49cd37954.png'
  }
  return img
}

function init(){
  var keys =  {
    0: ['q','w','e','r','t','y','u','i','o','p'],
    1: ['a','s','d','f','g','h','j','k','l',],
    2: ['z','x','c','v','b','n','m'],
    length: 3
  }
  var hash = {
    q: 'jquery123.com', 
    w: 'weibo.com', 
    e: 'element.eleme.io', 
    r: 'jianshu.com',
    t: 'tinypng.com', 
    y: 'yarnpkg.com', 
    u: 'ucdchina.com', 
    i: 'iconfont.cn', 
    o: 'oschina.net', 
    p: 'processon.com', 
    a: 'acfun.cn', 
    s: 'segmentfault.com', 
    d: 'daqianduan.com', 
    f: 'ifeng.com', 
    g: 'geekpark.net', 
    h: 'huxiu.com', 
    j: 'juejin.im', 
    k: 'guokr.com', 
    l: 'layui.com', 
    z: 'zhihu.com', 
    x: 'xiaozhuanlan.com', 
    c: 'csdn.net', 
    v: 'v2ex.com', 
    b: 'baidu.com', 
    n: 'cnodejs.org', 
    m: 'imooc.com'
  }
  
  //取出 localStorage 中的 zzz 对应的 hash
  var hashLocalStorage = getFromLocalStorage('zzz')
  if(hashLocalStorage){
    hash = hashLocalStorage
  }

  return hash = {
    keys: keys,
    hash: hash
  }
}

function generateKbdboard(keys, hash){
  for(var index = 0; index < keys.length; index = index + 1){
    var div = tag('div', {className: 'row'})
    main.appendChild(div)
  
    var row = keys[index] //第一组 第二组 第三组
    for(var index2 = 0; index2 < row.length; index2 = index2 + 1){
      var span = tag('span', {textContent: row[index2], className: 'text'})
  
      var button = createButton(row[index2])
  
      var img = createImg(hash[row[index2]])
      console.log(hash[row[index2]])
  
      var kbd = tag('kbd', {title: hash[row[index2]]})
      kbd.appendChild(span)
      kbd.appendChild(button)
      kbd.appendChild(img)
      div.appendChild(kbd)
    }
  }
}

function createDescription(){
  var p = document.createElement("p");
  p.setAttribute("class","description");
  p.innerHTML = "<span>使用说明</span>:<br>1. 编辑按钮可自定义与字母关联的导航地址<br>2. 按下键盘字母即打开相应得网址<br>3. 字母相关的导航地址可将鼠标悬浮其上查看 "
  footer.appendChild(p);
}

