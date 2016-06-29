
function addToClass(className,data) {
  var names = className.split(" ");
  for(var x in names){
    $(data).appendTo(names[x]);
  }

}
function renderTable(className,arr) {
  var keys = Object.keys(arr[0]);
  for (var i = 0; i < arr.length; i++) {
    var tr = "<tr>";
    tr += "<td>"+arr[i][keys[0]]+"</td>";
    tr += "<td>"+arr[i][keys[1]]+"</td>";
    tr += "<td><button class='btn btn-danger' id ='"+className.substr(1,className.length)+"|"+arr[i][keys[0]]+"' >Remove</button></td></tr>";
    addToClass(className,tr);
  }
}



$(document).ready(function () {
  var ageGraph=[];
  var educationGraph ;
  $.getJSON("graph.json",function (data) {
                        ageGraph = data;
                        renderTable("#information-1",data);
                        renderAgeGraph(ageGraph,"#graphRender-1");
                      });
  $.getJSON("eduGraph.json",function (data) {
                        educationGraph=data;
                        renderTable("#information-2",educationGraph);
                        renderAgeGraph(educationGraph,"#graphRender-2") ;
                      });
  $(".tab-content").on("click","button",function () {
      var buttonId = $(this).attr("id");
      var graphId = buttonId.split("|")[0];
      var columnId = buttonId.split("|")[1];
      if(graphId == "information-1"){
        $(this).parent().parent().css("display","none");
        for (var i = 0; i < ageGraph.length; i++) {
          if(ageGraph[i]['x'] == columnId){
              ageGraph.splice(i,1);
              $("#graphRender-1").empty();
              renderAgeGraph(ageGraph,"#graphRender-1");
              break;
          }
        }
      }
      else if(graphId=="add"){
        var tempObj;
        if(columnId == 'g1'){
          if($("#x-g1").val()!=null && $("#x-g1").val() !="" && !isNaN($("#y-g1").val()) && $("#y-g1").val()>0){
            var tr = "<tr>";
            tr += "<td>"+$("#x-g1").val()+"</td>";
            tr += "<td>"+$("#y-g1").val()+"</td>";
            tr += "<td><button class='btn btn-danger' id ='information-1"+"|"+$("#x-g1").val()+"' >Remove</button></td></tr>";
            var par = $(this).parent().parent();
            $(tr).insertAfter(par);
            tempObj = {"x":$("#x-g1").val(),"y":$("#y-g1").val()};
            ageGraph.push(tempObj);
            $("#graphRender-1").empty();
            renderAgeGraph(ageGraph,"#graphRender-1");
            $("#x-g1").val("");
            $("#y-g1").val("");
        }
        }
        else {
          if($("#x-g2").val()!=null && $("#x-g2").val() !="" && !isNaN($("#y-g2").val()) && $("#y-g2").val()>0){
            var tr = "<tr>";
            tr += "<td>"+$("#x-g2").val()+"</td>";
            tr += "<td>"+$("#y-g2").val()+"</td>";
            tr += "<td><button class='btn btn-danger' id ='information-2"+"|"+$("#x-g2").val()+"' >Remove</button></td></tr>";
            var par = $(this).parent().parent();
            $(tr).insertAfter(par);
            tempObj = {"x":$("#x-g2").val(),"y":$("#y-g2").val()};
            educationGraph.push(tempObj);
            $("#graphRender-2").empty();
            renderAgeGraph(educationGraph,"#graphRender-2");
            $("#x-g2").val("");
            $("#y-g2").val("");
          }
        }


      }
      else{
        $(this).parent().parent().css("display","none");
        for (var i = 0; i < ageGraph.length; i++) {
          if(educationGraph[i]['x'] == columnId){
              educationGraph.splice(i,1);
              $("#graphRender-2").empty();
              renderAgeGraph(educationGraph,"#graphRender-2");
              break;
          }
        }
      }

  });

});
