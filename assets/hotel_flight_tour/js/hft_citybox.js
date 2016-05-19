/**
 * Created by apple on 16/5/17.
 */
(function(){
  function loadHistory(){
      var hf_ori_history = localStorage.getItem("hf_ori_history");
      var hf_des_history = localStorage.getItem("hf_des_history");
      var hft_ori_history = localStorage.getItem("hft_ori_history");
      var hft_des_history = localStorage.getItem("hft_des_history");

      if(hf_ori_history){
        var key="",val="";
        hf_ori_history = JSON.parse(hf_ori_history);
        hf_ori_history = hf_ori_history[hf_ori_history.length - 1];
        key = hf_ori_history.toString().split(":")[0];
        val = hf_ori_history.toString().split(":")[1];
        $("#hf_ori").attr("data-code",key);
        $("#hf_ori").attr("data-name",val);
        $("#hf_ori").html(val);
      }
    if(hf_des_history){
      var key="",val="";
      hf_des_history = JSON.parse(hf_des_history);
      hf_des_history = hf_des_history[hf_des_history.length - 1];
      key = hf_des_history.toString().split(":")[0];
      val = hf_des_history.toString().split(":")[1];
      $("#hf_des").attr("data-code",key);
      $("#hf_des").attr("data-name",val);
      $("#hf_des").html(val);
    }
    if(hft_ori_history){
      var key="",val="";
      hft_ori_history = JSON.parse(hft_ori_history);
      hft_ori_history = hft_ori_history[hft_ori_history.length - 1];
      key = hft_ori_history.toString().split(":")[0];
      val = hft_ori_history.toString().split(":")[1];
      $("#hft_ori").attr("data-code",key);
      $("#hft_ori").attr("data-name",val);
      $("#hft_ori").html(val);
    }
    if(hft_des_history){
      var key="",val="";
      hft_des_history = JSON.parse(hft_des_history);
      hft_des_history = hft_des_history[hft_des_history.length - 1];
      key = hft_des_history.toString().split(":")[0];
      val = hft_des_history.toString().split(":")[1];
      $("#hft_des").attr("data-code",key);
      $("#hft_des").attr("data-name",val);
      $("#hft_des").html(val);
    }
  }
  $("#hft_ori").click(function(){
    VM.Load("hft_ori");
  });

  $("#hft_des").click(function(){
    VM.Load("hft_des");
  });
  $("#hf_ori").click(function(){
    VM.Load("hf_ori");
  });

  $("#hf_des").click(function(){
    VM.Load("hf_des");
  });
  loadHistory();
})();
