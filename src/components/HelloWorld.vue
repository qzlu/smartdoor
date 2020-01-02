<template>
  <div class="hello">
		<svg id="textPathDemo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="960" viewBox="0 0 581 120">
	        <path stroke="#FF4444" d="M62.9 14.9c-25-7.74-56.6 4.8-60.4 24.3-3.73 19.6 21.6 35 39.6 37.6 42.8 6.2 72.9-53.4 116-58.9 65-18.2 191 101 215 28.8 5-16.7-7-49.1-34-44-34 11.5-31 46.5-14 69.3 9.38 12.6 24.2 20.6 39.8 22.9 91.4 9.05 102-98.9 176-86.7 18.8 3.81 33 17.3 36.7 34.6 2.01 10.2.124 21.1-5.18 30.1" fill="none" stroke-width="1" stroke-dasharray="5 5" id="text-path1"></path>
	        <text>
	            <textPath  xlink:href="#text-path1" class="text-content" textLength="160" startOffset="-160">
	            	SVG 文字路径动画 
	            	 <animate attributeName="startOffset" from="-160" to ="830" begin="0s" dur="5s" repeatCount="1"/>
	            </textPath>
	        </text>
	    </svg>
      <div class="menus">
          <canvas id="canvas">
          </canvas>
          <ul>
            <li class="l" v-for="(item,i) in menus" :key="i" @click="index = i">{{item.name}}</li>
          </ul>
      </div>
 <canvas id="canvas1">

    </canvas>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="426" height="366" viewBox="0 0 426 366">
  <metadata><?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        ">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""/>
   </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?></metadata>
<image id="inspection" width="426" height="366" xlink:href="data:img/png;base64,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Ja3x23cdHcsNXf2Xl/qpEBHRTsQWFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWNQERFR0hhURESUNAYVEREljUFFRERJY1AREVHSGFRERJQ0BhURESWNQUVEREljUBERUdIYVERElDQGFRERJY1BRURESWtc6gdAREQ724c+//KWrs+gIiKii0FG/B/oiP8ZVERENHHiv0z0Fc4LLFw42ei0AlAGFRERTVoIpwyugdTwp0NQhYDqA8j9/0VgjS+oZOs3QUREO4uULakGgCaAlv9qwoUVUIZU13/Bf68AhC0qIiKatBBUUwCm/VcbLqwA14rqAFhBWY0eWlkcoyIiosnxnW0ZXCtqCsAuAHMAZv15gGs9LcMFl8AFVO6/LIOKiIgmSeAaRS0AMwD2PN7d8/3H8umfRTRGNSP9e2+dOvkbcC2pXvQ17haVYLCQg4iIXq1qLaoZuNbUgb7KofhyVuQQgD1wY1TLAFbhqwO5MgUREU2EiAAuqzK4br02gFkDna5f1kCbcN2CU3ChVlQFMqiIiGiLZL2fhGKKNoBpI2gPuVwDZZFFA9F8qzEGlaz9Iwldgrqx21D/vfgvIiJKk5bH9XCqbExVWlUNAC2Btuo3IdAMZWsqzLMCcDFaVDLsDN3qjRAR0URM5HhbmfArUQhFQpBlqK1cMcGg2kBRRVgg40JfF+YWEdHmyTrfD7uC1L8XwEjUYPJfOvK2w8TfEETDHtVASAEcoyIiootMLrC5cZGCik0gIqKdafLH9zEGlY7o7YvHpNZob9YLJiTOXB1+HQYgEdHW6Yhjc727b0PH3KgbcEyH6DFX/flQClV+UgsVGXyi1XMUa70Ywuo/IqKL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"/>
</svg>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      menus:[
        {
          name:'项目态势'
        },
        {
          name:'实时监测'
        },
        {
          name:'预告警管理'
        },
        {
          name:'设备管理'
        }
      ],
      index:1
    }
  },
  mounted(){
    let {$nextTick} = this
    $nextTick(() => {
      this.draw()
      this.draw1()
    })
  },
  methods:{
    draw(){
  
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d');
      canvas.width = 1546
      canvas.height = 60
      ctx.clearRect(0, 0, 1546, 60);
      var start = 0;
      let _this = this
      function auto(){
        let i = _this.index
        ctx.clearRect(0, 0, 1546, 60);
        ctx.shadowColor = "rgba(0, 193, 220, 1)";
        ctx.shadowBlur = 5;
        ctx.strokeStyle = "#004CB3";
        ctx.lineWidth = 3;
        ctx.fillStyle = "none";
        ctx.moveTo(0,40);
        ctx.lineTo(186+i*164,40)
        ctx.bezierCurveTo(206+i*164,40,206+i*164,3,226+i*164,3)
        ctx.lineTo(320+i*164,3)
        ctx.bezierCurveTo(346+i*164,3,346+i*164,40,366+i*164,40)
        ctx.lineTo(1546, 40);
        ctx.stroke();
        /* ctx.fill(); */
        ctx.beginPath()
        var grd = ctx.createLinearGradient(0, 40, 1546, 40);
        grd.addColorStop(start, "rgba(0,0,0,0)");
        grd.addColorStop(start, "rgba(0,0,0,0)");
        grd.addColorStop(start + 0.16, "#8ED6FF");
        grd.addColorStop(start + 0.32, "#8ED6FF");
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = grd;
        ctx.moveTo(0,40);
        ctx.lineTo(186+i*164,40)
        ctx.bezierCurveTo(206+i*164,40,206+i*164,3,226+i*164,3)
        ctx.lineTo(320+i*164,3)
        ctx.bezierCurveTo(346+i*164,3,346+i*164,40,366+i*164,40)
        ctx.lineTo(1546, 40);
        ctx.stroke();
        if (start + 0.32+0.02 >= 1) {
            start = 0;
        } else {
            start = start + 0.005;
        }
        window.requestAnimationFrame(auto)
      }
      auto()
    },
    getWidth(pointA, pointB) {
                var xWidth = (pointA.x - pointB.x) * (pointA.x - pointB.x);
                var yWidth = (pointA.y - pointB.y) * (pointA.y - pointB.y)
                var edgeWidth = Math.sqrt( xWidth + yWidth );
                return 100 / edgeWidth ;
    },
    draw1(){
      let canvas = document.getElementById('canvas1')
      let ctx = canvas.getContext('2d');
      canvas.width = 1000
      canvas.height = 260
      var start = 0;
      var pointA = {
          x: 0,
          y: 100
      };
      var pointB = {
          x: 700,
          y: 100
      };    
      var width = this.getWidth(pointA, pointB);
      function auto() {
                    ctx.beginPath();
                    var grd = ctx.createLinearGradient(pointA.x, pointA.y, pointB.x, pointB.y);
                    grd.addColorStop(0, "#5BC0DE");
                    grd.addColorStop(start, "#5BC0DE");
                    grd.addColorStop(start + (width / 2), "#ffff00");
                    grd.addColorStop(start + width, "#5BC0DE");
                    grd.addColorStop(1, "#5BC0DE");
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = grd;
                    ctx.moveTo(0, 100);
                    ctx.lineTo(100,100)
                    ctx.bezierCurveTo(120,100,120,60,146,60)
                    ctx.lineTo(200, 60);
                    ctx.bezierCurveTo(220,60,220,100,240,100)
                    ctx.lineTo(700, 100);
                    ctx.stroke();
                    ctx.closePath();  

                    if (start + width + 0.02 >= 1) {
                        start = 0;
                    } else {
                        start = start + 0.02;
                    }
                    setTimeout(function() {
                        auto();
                    }, 100);        
                }
                auto();                
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.menus{
  position: relative;
  #canvas{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0
  }
  ul{
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #626262;
    font-size: 18px;
    padding-left: 200px;
    position: relative;
    z-index: 1;
    li{
      width: 164px;
      cursor: pointer;
    }

  }
}
</style>
