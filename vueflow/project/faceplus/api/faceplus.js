const texts = [
  '看这拍照的姿势，就有一种领结婚证的冲动',
  '我的主要成分：2%的可爱+98%的单身。',
  '一个萌萌的单身狗，待撩，喜欢的抱走',
  '他们都说我没啥缺点，就是长得太好看',
  '外冷内热，对待感情非常专一',
  '心直口快，内心单纯，所以...你喜欢我吗？',
  '颜值不可一世，金星老师都说“完美”',
  '一句话低调奢华有内涵',
  '冬天就要到了，暖床必备小可爱',
  '一本正经的外表下面，有一颗躁动的心，还住着一只闷骚的小鬼',
  '时而热情似火，时而冷若冰霜，时而没心没肺，还有点丧心病狂',
  '独一无二的我，错过就要再等一个世纪',
  '端庄 乖巧 优雅 含蓄 严肃 斯文 懂事',
  '嘴很毒，心很善。玻璃心请绕道',
  '很洒脱很随意，却又固执地在乎一些事情',
  '总是看起来很快乐，看起来很坚强，可那都是伪装',
  '不喜欢做决定，大事小事都听你的',
  '用情至深，在爱上一个人之后是绝不轻言放弃',
  '善于察言观色，细心温柔',
  '不希望彼此干涉，个性豪爽，阳光自信的请下单',
  '恋爱中智商为0，所以，请对我好一点',
  '感情专一，完美主义者，个性非常古板、固执',
  '外冷内热型，不轻易表白心声，认定你就会表现温柔浪漫的特质喔',
  '个性非常温柔，很懂得体贴，不会挑剔缺点，享受平凡的爱情'
];
const price = [
  1,
  9.9,
  9.9,
  9.9,
  9.9,
  9.9,
  11.11,
  11.11,
  11.11,
  11.11,
  11.11,
  21,
  58,
  66,
  69,
  78,
  88,
  99,
  100,
  101,
  110,
  111,
  119,
  128,
  169,
  222,
  520,
  520,
  520,
  520,
  520,
  520,
  520,
  520,
  520,
  520,
  520,
  521,
  521,
  521,
  521,
  521,
  521,
  521,
  521,
  521,
  666,
  668,
  711,
  888,
  999,
  1000,
  1010,
  1020,
  1100,
  1111,
  1212,
  1234,
  1314,
  1314,
  1314,
  1314,
  1314,
  1314,
  1314,
  1314,
  1314,
  1314,
  6969,
  8888,
  9999,
  111111111,
  800000,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  5201314,
  '1百万',
  '1百万',
  '1百万',
  '1百万',
  '1百万',
  '1百万',
  '1百万',
  '1百万',
  '1百万',
  '1百万',
  '1百万',
  '1个亿',
  '1个亿',
  '1个亿',
  '1个亿',
  '1个亿',
  '1个亿',
  '1个亿',
  '1个亿',
  '1个亿',
  '1个亿'
];

function imgLoaded(imgUrl) {

  return new Promise((resolve, reject) => {
    let start_time=0;
    let image =new Image();
    // image.onload = function(){
    //   resolve(imgUrl);
    //   image.onload =null;
    // };
    let timer = setInterval(function() {
      if (image.complete) {
        resolve(imgUrl);
        console.log(Date.now()-start_time);
        clearInterval(timer)
      }
    },500);
    image.onerror = function () {
      reject('图片:'+imgUrl+' 加载失败:');
    };
    image.src = imgUrl;
    start_time = Date.now();
  });
}

function share(url) {
  let json = {
    imageUrl:url,
    shareUrl:url,
    title:'',
    content:'',
    shareCount:''
  };
  let innerUrl = '';
  if(isXl){
    innerUrl += 'xiaolu2.0://method_pull_up_share_view/'+JSON.stringify(json);
  }else if(isHnh){
    innerUrl += 'aman2.0://method_pull_up_share_view/'+JSON.stringify(json);
  }
  setTimeout(function () {
    window.location.href = innerUrl;
  },100);
}

function scaleCanvas(clipDom,scale) {
  let w = clipDom.offsetWidth+30;
  let h = clipDom.offsetHeight+40;
  let canvas = document.createElement('canvas');
  canvas.width = w*scale;
  canvas.height = h*scale;
  let context = canvas.getContext('2d');
  context.scale(scale,scale);
  return canvas;
}

function handleImg(Orientation,url) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = function() {
      let expectWidth = this.naturalWidth;
      let expectHeight = this.naturalHeight;

      if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
        expectWidth = 800;
        expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
      } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
        expectHeight = 1200;
        expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
      }
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = expectWidth;
      canvas.height = expectHeight;
      ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
      let base64 = null;
      //修复ios
      if (navigator.userAgent.match(/iphone/i)) {
        console.log('iphone');
        //alert(expectWidth + ',' + expectHeight);
        //如果方向角不为1，都需要进行旋转 added by lzk
        if(Orientation != "" && Orientation != 1){
          console.log('旋转处理');
          switch(Orientation){
            case 6://需要顺时针（向左）90度旋转
              console.log('需要顺时针（向左）90度旋转');
              rotateImg(this,'left',canvas);
              break;
            case 8://需要逆时针（向右）90度旋转
              console.log('需要顺时针（向右）90度旋转');
              rotateImg(this,'right',canvas);
              break;
            case 3://需要180度旋转
              console.log('需要180度旋转');
              rotateImg(this,'right',canvas);//转两次
              rotateImg(this,'right',canvas);
              break;
          }
        }

        /*var mpImg = new MegaPixImage(image);
        mpImg.render(canvas, {
            maxWidth: 800,
            maxHeight: 1200,
            quality: 0.8,
            orientation: 8
        });*/
        base64 = canvas.toDataURL("image/jpeg", 0.8);
      }
      else if (navigator.userAgent.match(/Android/i)) {// android不做处理
        // let encoder = new JPEGEncoder();
        // base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
        base64 = canvas.toDataURL("image/jpeg", 0.8);
      }
      else{
        //alert(Orientation);
        if(Orientation !== "" && Orientation !== 1){
          //alert('旋转处理');
          switch(Orientation){
            case 6://需要顺时针（向左）90度旋转
              console.log('需要顺时针（向左）90度旋转');
              rotateImg(this,'left',canvas);
              break;
            case 8://需要逆时针（向右）90度旋转
              console.log('需要顺时针（向右）90度旋转');
              rotateImg(this,'right',canvas);
              break;
            case 3://需要180度旋转
              console.log('需要180度旋转');
              rotateImg(this,'right',canvas);//转两次
              rotateImg(this,'right',canvas);
              break;
          }
        }

        base64 = canvas.toDataURL("image/jpeg", 0.8);
      }
      resolve(base64);
    };
    image.src = url;
  });
}

//对图片旋转处理 added by lzk
function rotateImg(img, direction,canvas) {
  //alert(img);
  //最小与最大旋转方向，图片旋转4次后回到原方向
  let min_step = 0;
  let max_step = 3;
  //var img = document.getElementById(pid);
  if (img === null)return;
  //img的高度和宽度不能在img元素隐藏后获取，否则会出错
  let height = img.height;
  let width = img.width;
  //var step = img.getAttribute('step');
  let step = 2;
  if (step === null) {
    step = min_step;
  }
  if (direction === 'right') {
    step++;
    //旋转到原位置，即超过最大值
    step > max_step && (step = min_step);
  } else {
    step--;
    step < min_step && (step = max_step);
  }
  //img.setAttribute('step', step);
  /*var canvas = document.getElementById('pic_' + pid);
  if (canvas == null) {
      img.style.display = 'none';
      canvas = document.createElement('canvas');
      canvas.setAttribute('id', 'pic_' + pid);
      img.parentNode.appendChild(canvas);
  }  */
  //旋转角度以弧度值为参数
  let degree = step * 90 * Math.PI / 180;
  let ctx = canvas.getContext('2d');
  switch (step) {
    case 0:
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      break;
    case 1:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, 0, -height);
      break;
    case 2:
      canvas.width = width;
      canvas.height = height;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, -height);
      break;
    case 3:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, 0);
      break;
  }
}


if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {

      let binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
        len = binStr.length,
        arr = new Uint8Array(len);

      for (let i=0; i<len; i++ ) {
        arr[i] = binStr.charCodeAt(i);
      }
      callback( new Blob( [arr], {type: type || 'image/png'} ) );
    }
  });
}

export {
  texts,
  price,
  imgLoaded,
  share,
  scaleCanvas,
  handleImg
}
