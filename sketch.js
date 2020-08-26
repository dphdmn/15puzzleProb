let num44 = [1, 2, 4, 10, 24, 54, 107, 212, 446, 946, 1948, 3938, 7808, 15544, 30821, 60842, 119000, 231844, 447342, 859744, 1637383, 3098270, 5802411, 10783780, 19826318, 36142146, 65135623, 116238056, 204900019, 357071928, 613926161, 1042022040, 1742855397, 2873077198, 4660800459, 7439530828, 11668443776, 17976412262, 27171347953, 40271406380, 58469060820, 83099401368, 115516106664, 156935291234, 208207973510, 269527755972, 340163141928, 418170132006, 500252508256, 581813416256, 657076739307, 719872287190, 763865196269, 784195801886, 777302007562, 742946121222, 683025093505, 603043436904, 509897148964, 412039723036, 317373604363, 232306415924, 161303043901, 105730020222, 65450375310, 37942606582, 20696691144, 10460286822, 4961671731, 2144789574, 868923831, 311901840, 104859366, 29592634, 7766947, 1508596, 272198, 26638, 3406, 70, 17];
let num33 = [1, 2, 4, 8, 16, 20, 39, 62, 116, 152, 286, 396, 748, 1024, 1893, 2512, 4485, 5638, 9529, 10878, 16993, 17110, 23952, 20224, 24047, 15578, 14560, 6274, 3910, 760, 221, 2]
let num43 = [1, 2, 4, 9, 20, 37, 63, 122, 232, 431, 781, 1392, 2494, 4442, 7854, 13899, 24215, 41802, 71167, 119888, 198363, 323206, 515778, 811000, 1248011, 1885279, 2782396, 4009722, 5621354, 7647872, 10065800, 12760413, 15570786, 18171606, 20299876, 21587248, 21841159, 20906905, 18899357, 16058335, 12772603, 9515217, 6583181, 4242753, 2503873, 1350268, 643245, 270303, 92311, 27116, 5390, 1115, 86, 18];
let num52=[1, 2, 3, 6, 11, 19, 30, 44, 68, 112, 176, 271, 411, 602, 851, 1232, 1783, 2530, 3567, 4996, 6838, 9279, 12463, 16597, 21848, 28227, 35682, 44464, 54597, 65966, 78433, 91725, 104896, 116966, 126335, 131998, 133107, 128720, 119332, 106335, 91545, 75742, 60119, 45840, 33422, 23223, 15140, 9094, 5073, 2605, 1224, 528, 225, 75, 20, 2];
let numTable=num44; 
let pzlMaxStates=10461394944000;
let pzlName="4x4";

let cumA = [];
let desP = [];
let cumP = [];


let maxV=80;
let minV=0;
let lastf1 = 0;
let lastf2 = 80;
let graphtype=1;

  $( function() {
    $("#slider-range").slider(
      {
      range: true,
      min: minV,
      max: maxV,
      values: [ 0, maxV],
      slide: function( event, ui ) {
        $("#amount").val("Moves "+ ui.values[0] + " - " + ui.values[1]);
        doOnChange(ui.values[0],ui.values[1]);
      },
      change: function(event,ui){
        $("#amount").val("Moves "+ ui.values[0] + " - " + ui.values[1]);
      doOnChange(ui.values[0],ui.values[1]);
      }            
    }
    ).slider().slider("pips", {
        rest: "label",
    })
    setVal();
    doOnChange(minV,maxV);
  } );

function getAm(num){
 return numTable[num];
}

function sumAm(a,b){
  let val;
  if (a>0){
    val = cumA[b]-cumA[a-1];
  } else{
    val = cumA[b];
  }
  return val;
}

function getRangeP(a,b){
let val;
  if (a>0){
    val = cumP[b]-cumP[a-1];
  } else{
    val = cumP[b];
  }
  return val;
}
function getP(num){
return desP(num);
}

function bl(s){
  return "<b><font color=\"#CE5B78\">" + s + "</font></b>";
}
let nscr=100;
let ac=2;
function doOnChange(f1,f2){
  makeGraph(f1,f2);
  lastf1=f1;
  lastf2=f2;
  out="";
  let rp = getRangeP(f1,f2);
  out+="<p>The probability of " + bl(pzlName) + " puzzle being optimally solved in ";
  if (f1 != f2){
  out+="range from " + bl(f1) + " to "+ bl(f2) + " moves is ";
  }
  else{
  out+="solved in <i>exactly</i> " + bl(f1) + " moves is "
  }
  out+=editP(rp);
  
  out+= "<br><br>(since there are " + bl(sumAm(f1,f2)) + " states in that range of total " + pzlMaxStates+" states of this puzzle)</p>";
  pSc = (1-Math.pow((1 - rp/100),nscr))*100; 
  if (pSc == -0){
    pSc = 0;
  }
  let sc=nscr;
  if (nscr == 1000){
    sc="1000";
  }
  if (nscr == 10000){
    sc="10 000";
  }
  if (nscr == 1000000){
    sc= "1 000 000";
  }
  out+= "<p>The probability of getting at least one scramble within that range after " + bl(sc) + " scrambles is " + editP(pSc);

  
 result.innerHTML=out;
}

function editP(rp){
  out = "";
  if (rp < 1){
    out+="1 in "+ bl((100/rp).toFixed(0));
  }else{
    out+=bl(rp.toFixed(ac)) + "%";
  }
  return out;
}
function setVal(){
 $("#amount").val("Moves "+$("#slider-range").slider( "values", 0) +
      " - " + $("#slider-range" ).slider( "values", 1)); 
 cumA.length = [];
 desP.length = [];
 cumP.length = [];
  
  let sum = 0;
  for (let i = 0; i<=maxV;i++){
    sum+=numTable[i];
    cumA[i]=sum;
    desP[i]=100*(numTable[i]/pzlMaxStates);
    cumP[i]=100*(sum/pzlMaxStates);
  }
  
}
$('input[type=radio][name=scr]').change(function(){
  nscr=parseInt(this.value);
  doOnChange(lastf1,lastf2);
});
$('input[type=radio][name=g]').change(function(){
  if (this.value=='1'){
    graphtype=1;
    chartdiv.style="";
  }
  if (this.value=='2'){
    graphtype=2;
    chartdiv.style="";
  }
  if (this.value=='3'){
    graphtype=3;
    chartdiv.style="display:none";
  }
  makeGraph(lastf1,lastf2);
});

$('input[type=radio][name=pzl]').change(function() {
    let v = this.value;
    if (v == '4') {
        numTable=num44;
        pzlName="4x4";
        pzlMaxStates=10461394944000;
    }
    else if (v == '3') {
        numTable=num33;
        pzlName="3x3";
        pzlMaxStates=181440;
    } else if(v == '43'){
      numTable=num43;
      pzlName="4x3";
      pzlMaxStates=239500800;
    }
  else if(v == '52'){
      numTable=num52;
      pzlName="5x2";
      pzlMaxStates=1814400;
    }
  
    maxV = numTable.length-1
    setVal();
    doOnChange(minV,maxV);
  
    $("#slider-range").slider('option', {max: maxV});
    $("#slider-range").slider("values",0,minV);
    $("#slider-range").slider("values",1,maxV);
    $("#slider-range").slider("pips", "refresh");
    
  
    makeGraph(minV,maxV)
});

function makeGraph(f1, f2){
  if (graphtype != 3){
      let maximumv=0;
      let val=0;
      data.length=0;
      data = [];
      if (graphtype == 1){
      for (var i = f1; i <= f2; i++) {
        val = getRangeP(i,i);
        data.push({ moves: i, amount: val});
        if (val>maximumv){
          maximumv=val;
        }
      }
      }else{
        for (var i = f1; i <= f2; i++) {
          val = getRangeP(f1,i);
          if (val>maximumv){
          maximumv=val;
        }
          if (val >99.999999999){
            val = 100-0.00000001;
             
          }
          data.push({ moves: i, amount: val});
      }
      }
      chart.data = data;
    chart.numberFormatter=new am4core.NumberFormatter();
    //console.log(maximumv);
    if (maximumv < 1){

      chart.numberFormatter.numberFormat = '#.######e';

    }else{
      chart.numberFormatter.numberFormat = '#.######'
    }

    categoryAxis.numberFormatter = new am4core.NumberFormatter();
    categoryAxis.numberFormatter.numberFormat="#.#";
  }
}

function setup(){
  makeGraph(minV,maxV);
}