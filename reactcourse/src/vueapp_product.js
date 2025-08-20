import React from 'react';
  
  const Vueapp_product = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default Vueapp_product;
  jQuery(document).ready(function ($) {
  var getcount = 0;
  var url = '';
  var productcount = $('#categoryCount').val();
  var categoryCode = $('.categoryCode').val();
  var container = $('#getcatcontainer').val();
  var processing = $("#category-listing").html();
  var sortBy = $("input[name='Sort_By']:checked").val();
  var sortKey = $("#price_asc,#retailRadio2").val();
  const searchKey = getUrlVars()["Search"];
   if ((categoryCode == 'great-deals' || categoryCode == 'ws-specials')){
     sortBy =  '';
   }
  else if(sortBy === undefined) {
    $("#price_asc,#retailRadio4").attr('checked',true);
    sortBy =  $("#price_asc,#retailRadio4").val();
  }
  var offset = 0;
  if(productcount){
  var per_page = productcount;
  }else{
    var per_page = "16";
  }
  var products = [];
  var queryString = [];
  $(".mm_facet_checkbox:checked:visible").each(function() {
      var updatedString = $(this).val().replace("&", "%26");
      queryString.push(`&${$(this).attr("name")}=${updatedString}`);
  });
  var UOM = [];
  // Check for Page Code and set Url 
  if(getPageCode === 'SRCH') {
    categoryCode = 'SRCH';
    
  }
  let usedforsearchapi = TypofUser === 'Non-Profit' ? 'SRCHJSON_NP' : 'SRCHJSON';
  var searchurl =  `https://${location.hostname}/SRCHJSON.html?Search=${searchKey}&SearchOffset=${offset}&Sort_By=${sortKey}${queryString}&Per_Page=${per_page}&recipes=No&x=0&y=0`;
  url = getPageCode !== 'SRCH' ? `/Merchant5/merchant.mvc?Screen=CTGYJSON&Category_Code=${categoryCode}&CatListingOffset=${offset}&Offset=${offset}&Per_Page=${per_page}&Sort_By=${sortBy}&facets=1&${queryString.join('')}` : `https://${location.hostname}/${usedforsearchapi}.html?Search=${searchKey}&SearchOffset=${offset}&Sort_By=${sortKey}${queryString}&Per_Page=${per_page}&recipes=No&x=0&y=0`;
  $.get(
    url,
    function (dataval) {
      //console.log(dataval);
       let stockavailable = dataval.filter((inv) => {
        return inv.data.product_inventory > 0
    });

  //   var getsubstitution = dataval.filter((subs) => {
  //     return subs.data.substitute;
  // });

  // console.log(getsubstitution);
    
       
      var myObject = this;
      var pack_size = 9999;
      var uom = "";
      var addclass = "";
      var getdata;
      if(getPageCode == 'SFNT' || getPageCode == 'MSHIP' || getPageCode == 'ShelfLP' || getPageCode == 'ShelfLP_copy' || getPageCode == 'Origins' || getPageCode == 'solutions-program' || getPageCode == 'Gifts' ){
        getProductresponse(stockavailable);
      }else {
        getProductresponse(dataval);
        stockavailable = dataval;
        if(TypofUser === 'Non-Profit'){
              var nonprofittotalcount = dataval.length;
                if(nonprofittotalcount == 0){
                  $('.search-again').removeClass('hidden');
                  $('#left-navigation,.serchResult').hide();
                }else{
                  $('.search-again').addClass('hidden');
                  $('#left-navigation,.serchResult').show();
                }
                  if(nonprofittotalcount <= 1 ){
                    nonprofittotalcount = nonprofittotalcount == 1 ? 1 + " Item" : 0 + " Item";
                  }else{
                    nonprofittotalcount = nonprofittotalcount + " Items";
                  }
                  $("#serchResult,.serchResult").text(nonprofittotalcount);
        }
      }
      myObjects = new Vue({
        el: "#app-"+categoryCode,
        data: { products: stockavailable,
        savedforlater1: dataval },
        methods: {
          getallproducts(cat_id) {
            var seturl = '';
            if(cat_id == ''){
              // cat_id = categoryCode;
              cat_id = $("#categoryCode").val();
              var offset = parseInt($("#defaultoffset").val()) + 16;
            }else{
              var offset = 0;
            }
            var getcount = 0;
            var processing = $("#category-listing").html();
            var sortBy = $("input[name='Sort_By']:checked").val();
            var per_page = "16";
            var UOM = [];
            $("#getResponse").val(0);
            seturl = getPageCode !== 'SRCH' ? `/Merchant5/merchant.mvc?Screen=CTGYJSON&Category_Code=${cat_id}&CatListingOffset=${offset}&Offset=${offset}&Per_Page=${per_page}&Sort_By=${sortBy}&facets=1&${queryString}` : `https://${location.hostname}/${usedforsearchapi}.html?Search=${searchKey}&SearchOffset=${offset}&Sort_By=${sortKey}${queryString}&Per_Page=${per_page}&recipes=No&x=0&y=0`;
            $.get(
              seturl,
              function (dataval) {
                var myObject = this;
                $(".load-content").css("display", "flex");
              }
            )
              .then(function (response, status, xhr) {
                //console.log(xhr.status);
                $("#getResponse").val(xhr.status);
                //myObject.products = this.products.push(response);
                if (xhr.status == 200) {

                  if(response.length > 0) {
                    for (let i = 0; i < response.length; i++) {
                      var lowestUOM = "";
                      var pack_size = 9999;
                      var lowestprice = "";
                      var highestpacksize = "";
                      var highestprice = "";
                      var pricediscount = "";
                      var casesaving = "";
                      var isSale = "";
                      var isChildSale = "";
                      getcount++;
                      $("#getCount").val(getcount);
                      myObjects.products.push(response[i]);
                    }
                    //products.push(response);
                    setTimeout(function(){
                      getProductresponse(response);
                  },100)
                  $("#defaultoffset").val(offset);
                  $(".load-content").css("display", "none");
                  }                  
                }
              })
              .done(function (html, status, xhr) {
                $("#category-listing").attr("data-proccessed", "complete");
                if (getcount == 0) {
                  $("#getCount").val(getcount);
                  $(".load-content").css("display", "none");
                }
              });
          },
          getProductonClick(catcode) {
            var getcount = 0;
            queryString = "";
            $(".loaderContainerCategory").show();
            $(".splashloader").show();
            $('.expanded').css('height','400vh');
            $("input[type=radio]").removeAttr("checked");
            $(this).prop("checked", true);
            $("#defaultoffset").val(0);
            $("#getCount").val(1);
            sortKey = '';
            // var catcode = $("#catcode").val();
            $(".loaderContainerCategory").show();
            // var catcode = $("#catcode").val();
            $("#catcode").val(catcode);
            $('#categoryCode').val(catcode);
            per_page = 16;
            totalcount = "";
            var sortBy = $("input[name='Sort_By']:checked").val();
            $.get(
              `https://${location.hostname}/Merchant5/merchant.mvc?Screen=CTGYJSON&Category_Code=${catcode}&Per_Page=${per_page}&facets=1&Sort_By=${sortBy}${queryString}`,
              function (dataval) {
                var myObject = this;
                $(".load-content").css("display", "flex");
              }
            )
              .then(function (response, status, xhr) {
                var typeofurl = '';
                if(getPageCode !== 'SRCH'){
                  typeofurl = `/Merchant5/merchant.mvc?Screen=CTGY&Category_Code=${catcode}&Per_Page=${per_page}&facets=1&Sort_By=${sortKey}${queryString}`;
                }else if(getPageCode === 'SRCH') {
                  typeofurl = `https://${location.hostname}/SRCH.html?Search=${searchKey}&SearchOffset=${offset}&Sort_By=${sortKey}${queryString}&Per_Page=${per_page}&recipes=No&x=0&y=0`;
                }
                window.history.replaceState( {} , '', typeofurl );
                myObjects.products = [];
                if(response.length  < 1){
                  $('.noprouctsmsg').css('display','flex');
                  $('.splashloader').hide();
                  totalcount = response.length;
                }else{
                  $('.noprouctsmsg').css('display','none');
                //console.log(xhr.status);
                $("#getResponse").val(xhr.status);
                if (xhr.status == 200) {
                  if(response.length > 0) {
                    myObjects.products = "";
                    for (let i = 0; i < response.length; i++) {
                      var lowestUOM = "";
                      var pack_size = 9999;
                      var lowestprice = "";
                      var highestpacksize = "";
                      var highestprice = "";
                      var pricediscount = "";
                      var casesaving = "";
                      var isSale = "";
                      var isChildSale = "";
                      getcount++;
                      $("#getCount").val(getcount);
                      myObjects.products.push(response[i]);
                    }
                    //products.push(response);
                    setTimeout(function(){
                      getProductresponse(response);
                  },100)
                  $("#defaultoffset").val(offset);
                  $(".load-content").css("display", "none");
                  }  
                  
                  $("#defaultoffset").val(offset);
                  $(".load-content").css("display", "none");
                  $('.splashloader').hide();
                }
              }
              console.log('count ' + totalcount);
              if(totalcount <= 1 ){
                totalcount = totalcount == 1 ? 1 + " Item" : 0 + " Item";
              }else{
                totalcount = totalcount + " Items";
              }
              $("#categoryResult,.categoryResult").text(totalcount);
              $("#serchResult,.serchResult").text(totalcount);
              $('.facets-tree').html('').html('<span class="bold-ft txt-center" style="display: flex;justify-content: space-between;width: 100%;font-size: 18px;padding: 5px 10px;text-transform: uppercase;border-top: 1px dotted #8c92ac;border-bottom: 1px dotted #8c92ac;text-transform: capitalize;"><span>Sort By</span><span class="bold-ft sortby collapse-icon">-</span> </span>');
		            //myObjects.getFacets(catcode);
                //$(".facets-tree").append($(html).find("#sortoptions").html());
            
                $(".background-container").css("height", "initial");
                $(".background-container").css("overflow", "auto");
                myObjects.loadJqueryAssets();
                $('.expanded').css('height','auto');
                //myObjects.loadJqueryAssets();
              })
              .done(function (html, status, xhr) {
                $("#category-listing").attr("data-proccessed", "complete");
                if (getcount == 0) {
                  $("#getCount").val(getcount);
                  $(".load-content").css("display", "none");
                  $('.splashloader').hide();
                }
              });
        },
        getFilteredProducts() {
          $("body").on("change", ".mm_facet_checkbox", function (e) {
            $('.noprouctsmsg').css('display','none');
            $("body").find(".mm_facet_checkbox").prop('disabled',true);
            $("body").find("#checkbox1").prop('disabled',true);
            $("body").find("#checkbox2").prop('disabled',true);
            $('#checkbox2').prop('checked' ,false);
            $('#checkbox1').prop('checked' ,false);
            var getcount = 0;
            queryString = "";
            var seturl = '';
            e.preventDefault();

            
              var isChecked = $(this).prop('checked');
              if($(this).val() === 'VIPOnlySale'){
              $("input[name='vip_flag']").each(function() {
                  $(this).prop('checked', isChecked);
              });
            }
         

            $("input:checkbox.mm_facet_checkbox:visible").each(function () {
              if (this.checked) {

              
              if(jQuery("input[name='isThisthreebieProduct']:visible").is(':checked') == true) {
                $('#checkbox2').prop('checked' ,true);
                }
              

              if(jQuery("input[name='isSLACProduct']:visible").is(':checked') == true) {
                  $('#checkbox1').prop('checked' ,true);
                  }



                const updatedString = $(this).val().replace("&", "%26");
                queryString =
                  queryString + `&${$(this).attr("name")}=${updatedString}`;
                //console.log('yes');
              }
            });
            if (!this.checked) {
              //console.log('no');
            }
            //$('#category-listing').html(`<div id="#search-results" style="height:600px"></div>`);
            $(".loaderContainerCategory").show();
            var catcode = $("#catcode").val();
            var sortBy = $("input[name='Sort_By']:checked").val();
            per_page = 16;
            totalcount = "";
            products = [];
            seturl = getPageCode !== 'SRCH' ? `https://${location.hostname}/Merchant5/merchant.mvc?Screen=CTGYJSON&Category_Code=${catcode}&Per_Page=${per_page}&facets=1&Sort_By=${sortBy}${queryString}` : `https://${location.hostname}/${usedforsearchapi}.html?Search=${searchKey}&SearchOffset=${offset}&Sort_By=${sortKey}${queryString}&Per_Page=${per_page}&recipes=No&x=0&y=0`;
            $.get(
              seturl,
              function (dataval) {
                var myObject = this;
                $(".load-content").css("display", "flex");
              }
            )
              .then(function (response, status, xhr) {
                var typeofurl = '';
                if(getPageCode !== 'SRCH'){
                  typeofurl = `/Merchant5/merchant.mvc?Screen=CTGY&Category_Code=${catcode}&Per_Page=${per_page}&facets=1&Sort_By=${sortBy}${queryString}`;
                }else if(getPageCode === 'SRCH') {
                  typeofurl = `https://${location.hostname}/SRCH.html?Search=${searchKey}&SearchOffset=${offset}&Sort_By=${sortKey}${queryString}&Per_Page=${per_page}&recipes=No&x=0&y=0`;
                }
                window.history.replaceState( {} , '',  typeofurl);
                //console.log(xhr.status);
                $("#getResponse").val(xhr.status);
                if(response.length  < 1){
                  $('.noprouctsmsg').css('display','flex').html('<h5 class="ft-md ft-24p">No matching results found</h5>');
                }else{
                  $('.noprouctsmsg').css('display','none').html('');
                }
                if (xhr.status == 200) {
                  //console.log(response);
                  myObjects.products = [];
                  products = [];
                  getcount++;
                  $("#getCount").val(getcount);
                  for (let i = 0; i < response.length; i++) {
                    var lowestUOM = "";
                    var pack_size = 9999;
                    var lowestprice = "";
                    var highestpacksize = "";
                    var highestprice = "";
                    var pricediscount = "";
                    var casesaving = "";
                    var isSale = "";
                    var isChildSale = "";



                    
                    setTimeout(function () {
                      myObjects.products = response;
                      $("body").find(".mm_facet_checkbox").prop('disabled',false);
                      $("body").find("#checkbox1").prop('disabled',false);
                      $("body").find("#checkbox2").prop('disabled',false);
                    }, 500);
                    totalcount = response[i].data.total;
                  }
                  setTimeout(function(){
                    getProductresponse(response);
                },100);
                console.log('count ' + totalcount);
                  if(totalcount <= 1 ){
                    totalcount = totalcount == 1 ? 1 + " Item" : 0 + " Item";
                  }else{
                    totalcount = totalcount + " Items";
                  }
                  $("#categoryResult,.categoryResult").text(totalcount);
                  $("#serchResult,.serchResult").text(totalcount);
                  $("#defaultoffset").val(offset);
                  $(".load-content").css("display", "none");
                }
              })
              .done(function (html, status, xhr) {
                $("#category-listing").attr("data-proccessed", "complete");
                $("body").find(".mm_facet_checkbox").prop('disabled',false);
                $("body").find("#checkbox1").prop('disabled',false);
                $("body").find("#checkbox2").prop('disabled',false);
                if (getcount == 0) {
                  $("#getCount").val(getcount);
                  $(".load-content").css("display", "none");
                }
              });
            return false;
          });

          $("body").find(".mm_facet_checkbox").removeAttr("onclick");
          $("body").on("change", ".form-check-input", function (e) {
            e.preventDefault();
            var getcount = 0;
            queryString = [];
            var seturl = '';
            $(".loaderContainerCategory").show();
            $("input[type=radio]").removeAttr("checked");
            $("body").find(".mm_facet_checkbox").prop('disaled',true);
            $(this).prop("checked", true);
            $(this).prop("disabled", false);
            $("#defaultoffset").val(0);
            $("#getCount").val(1);
            sortKey = $(this).val();
            var catcode = $("#catcode").val();
            $(".loaderContainerCategory").show();
            var catcode = $("#catcode").val();
            per_page = 16;
            totalcount = "";
            $(".mm_facet_checkbox:checked:visible").each(function() {
              var updatedString = $(this).val().replace("&", "%26");
              queryString.push(`&${$(this).attr("name")}=${updatedString}`);
          });
          seturl = getPageCode !== 'SRCH' ? `https://${location.hostname}/Merchant5/merchant.mvc?Screen=CTGYJSON&Category_Code=${catcode}&Per_Page=${per_page}&facets=1&Sort_By=${sortKey}${queryString.join('')}` : `https://${location.hostname}/${usedforsearchapi}.html?Search=${searchKey}&SearchOffset=${offset}&Sort_By=${sortKey}${queryString}&Per_Page=${per_page}&recipes=No&x=0&y=0`;
            $.get(
              seturl,
              function (dataval) {
                var myObject = this;
                $(".load-content").css("display", "flex");
              }
            )
              .then(function (response, status, xhr) {
                var typeofurl = '';
                if(getPageCode !== 'SRCH'){
                  typeofurl = `/Merchant5/merchant.mvc?Screen=CTGY&Category_Code=${catcode}&Per_Page=${per_page}&facets=1&Sort_By=${sortKey}${queryString.join('')}`;
                }else if(getPageCode === 'SRCH') {
                  typeofurl = `https://${location.hostname}/SRCH.html?Search=${searchKey}&SearchOffset=${offset}&Sort_By=${sortKey}${queryString}&Per_Page=${per_page}&recipes=No&x=0&y=0`;
                }
                window.history.replaceState( {} , '',  typeofurl);
                //console.log(xhr.status);
                $("#getResponse").val(xhr.status);
                if (xhr.status == 200) {
                  //console.log(response);
                  getcount++;
                  $("#getCount").val(getcount);
                  for (let i = 0; i < response.length; i++) {
                    var lowestUOM = "";
                    var pack_size = 9999;
                    var lowestprice = "";
                    var highestpacksize = "";
                    var highestprice = "";
                    var pricediscount = "";
                    var casesaving = "";
                    var isSale = "";
                    var isChildSale = "";

                   

                    myObjects.products = "";
                    
                    setTimeout(function () {
                      myObjects.products = response;
                      $("body").find(".mm_facet_checkbox").prop('disabled',false);
                      $("body").find("#checkbox1").prop('disabled',false);
                      $("body").find("#checkbox2").prop('disabled',false);
                    }, 500);
                    totalcount = response[i].data.total;
                  }
                  setTimeout(function(){
                    getProductresponse(response);
                },100)
                  // myObject.products = response;
                  console.log('count ' + totalcount);
                  if(totalcount <= 1 ){
                    totalcount = totalcount == 1 ? 1 + " Item" : 0 + " Item";
                  }else{
                    totalcount = totalcount + " Items";
                  }
                  $("#categoryResult,.categoryResult").text(totalcount);
                  $("#serchResult,.serchResult").text(totalcount);
                  $("#defaultoffset").val(offset);
                  $(".load-content").css("display", "none");
                }
              })
              .done(function (html, status, xhr) {
                $("#category-listing").attr("data-proccessed", "complete");
                if (getcount == 0) {
                  $("#getCount").val(getcount);
                  $(".load-content").css("display", "none");
                  $("body").find(".mm_facet_checkbox").prop('disabled',false);
                }
              });
          });
        },
          getUomforInventorymessage(element) {
            return element.split("of")[0];
          },
          loadJqueryAssets() {
            $("#recipeFilter").click(function () {
              $(".filterContainer").removeClass("displayNone");
            });
            $(".Fclose").click(function () {
              $(".filterContainer").addClass("displayNone");
            });
            $(".applyFilter").on("click", function () {
              $(".filterContainer").addClass("displayNone");
            });

            jQuery(".showmore").click(function () {
              var facetClass = jQuery(this).attr("data-class");
              jQuery(".hidefacet." + facetClass).css("display", "block");
              jQuery(".collapse-" + facetClass).show();
              jQuery(this).hide();
            });
            jQuery(".collapse")
              .not(".alt_row")
              .click(function () {
                var facetClass = jQuery(this).attr("data-class");
                jQuery(".hidefacet." + facetClass).css("display", "none");
                jQuery(".show-" + facetClass).show();
                jQuery(this).hide();
              });

              $(".sortby").click(function() {
                $(".sort-by-options-wrappers").toggle();
                if ($(".sort-by-options-wrappers").is(":visible") == true) {
                    $(".sortby").text("-");
                } else {
                    $(".sortby").text("+");
                }
            });

              /*$('.product-details').mouseover(function() {
                $(this).find('.dropdown').each(function() {
                $(this).addClass('open');
                $(this).find('.dropdown-item').find('.slacdiscounttext').show();
                $('.dropdown-menu').addClass('ctgytealcolor');
            },
            function() {
                $(this).removeClass('open');
            });
            });
            $('.product-details').mouseleave(function() {
              $(this).find('.dropdown').each(function() {
              $(this).removeClass('open');
              $(this).find('.dropdown-item').find('.slacdiscounttext').hide();
              $('.dropdown-menu').addClass('ctgytealcolor');
          },
          function() {
              $(this).removeClass('open');
          });
          });*/
            $('.dropdown').click(function(){
              var _this = this;
                setTimeout(function(){
                    
                if($(_this).hasClass('open') == true){
                    $(_this).find('.dropdown-item').find('.slacdiscounttext').show();
                }else{
                    $(_this).find('.dropdown-item').find('.slacdiscounttext').hide();
                    $(_this).find('.dLabel1').find('.slacdiscounttext').hide();
                }
               },10);
            });

            $(".loginClick").click(function () {
              $(".newLoginContainer").removeClass("displayNone");
              $("#signinForm").removeClass("displayNone");
              $(".signUpForm").addClass("displayNone");
              $("#signUpMsg").addClass("displayNone");
              $(".Guest").css("display", "none");
              $(".ajaxmsg").html("");
              $("#login").find("input[type=password], input[type=email]").val("");
              $("#login").find("input[type=hidden]").val("login");
              $("#login").removeClass("checkoutlogin");
              $("#singUpNewsLetter").prop("checked", false);
              $(".accountLinked").addClass("displayNone");
            });

            jQuery('.loginClick, .createAccount, .businessaccount , .checkoutloginClick').click(function(){
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
               jQuery('body').addClass("noscroll");
              
             
               jQuery("#closelogin,.Lclose").click(function(){
                jQuery('body').removeClass("noscroll");
               });
             });



          },

          getFacets(catcode) {
            var url = `https://${
              location.hostname
            }/Merchant5/merchant.mvc?Screen=AJAXFACETS&Category_Code=${$('#categoryCode').val()}&facets=1`;
            $.ajax({
              url: url,
              beforeSend: function (xhr) {
                // here we are setting isRequested to true
                isRequested = true;
              },
              success: function (html, Status, xhr) {
                $(".facets-tree").append($(html).find("#sortoptions").html());
                $(".filterContent.filters").append(
                  $(html).filter(".mobilefilters").html()
                );
                $(".background-container").css("height", "initial");
                $(".background-container").css("overflow", "auto");
                myObjects.loadJqueryAssets();
                $('.expanded').css('height','auto');
              },
            });
          },
          capitalizeText(s) {
            return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
            //console.log(s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
          },
          roundNumbers(s) {
            // console.log(s);
            var number = parseFloat(s).toFixed(2);
            return number;
          },
          removehype(s) {
            if (s.match("-") == null) {
              console.log(s.replace("avg", ""));
              return s.replace("avg", "").replace("(", "").replace(")", "");
            } else {
              /*console.log(
                s
                  .replace(/^[^-]+ - /, "")
                  .replace("(", "")
                  .replace(")", "")
              );*/
              return s
                .replace(/^[^-]+ - /, "")
                .replace("(", "")
                .replace(")", "");
            }
            //console.log(s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
          },
           getCurrenctRestockDate(d) {
            // Convert date string to Date object
          var dDate = new Date(d);
          
          // Get current date with America/New_York timezone
          var currentDate = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
          currentDate = new Date(currentDate);
          // Set the time parts to zero to compare only the date parts
          dDate.setHours(0, 0, 0, 0);
          currentDate.setHours(0, 0, 0, 0);
          // Compare dates
          if (dDate < currentDate) {
              return false;
          } else {
              return true;
          }
          },
          getpacSize() {
            let pack_size = 9999;
            let uom = "";
            for (let i = 0; i < dataval.length; i++) {
              for (let j = 0; j < dataval[i].data.variants.length; j++) {
                if (
                  dataval[i].data.variants[j].pack_size < pack_size &&
                  this.vueUserType == "Retail"
                ) {
                  pack_size = dataval[i].data.variants[j].pack_size;
                  uom = dataval[i].data.variants[j].UOM;
                } else {
                  uom = "";
                  pack_size = 9999;
                }
                return uom;
                //console.log(uom);
              }
            }
          },
          getProductInputValcheck(element, formId) {
            element.target.value.replace(/\D/g, "");
            //console.log(element.target.value.replace(/\D/g, ''));
            var getProductCode = formId;
            getProductCode = getProductCode.replace("addProduct-", "");
            if (
              element.target.value.replace(/\D/g, "") == "" ||
              element.target.value.replace(/\D/g, "") == "0"
            ) {
              $(".ProductDetail-" + getProductCode)
                .find(".addbtn")
                .prop("disabled", true);
            } else if (element.target.value.replace(/\D/g, "") == "1") {
              $(".ProductDetail-" + getProductCode)
                .find(".addbtn")
                .prop("disabled", false);
            } else {
              $(".ProductDetail-" + getProductCode)
                .find(".addbtn")
                .prop("disabled", false);
              var newvalue = parseInt(element.target.value.replace(/\D/g, ""));
              var qtySize = parseInt(
                $(".ProductDetail-" + formId)
                  .find(".form-check-input")
                  .attr("data-min")
              );
              var getdataStock = parseInt(
                $(".ProductDetail-" + formId)
                  .find(".form-check-input")
                  .attr("data-stock-raw")
              );
              var acttualdataStock = parseInt(
                $(".ProductDetail-" + formId)
                  .find(".form-check-input")
                  .attr("data-stock-raw")
              );
              var qtyinCart = parseInt(
                $(".ProductDetail-" + formId)
                  .find(".QtyVal")
                  .attr("data-qtycart")
              );
              $(".ProductDetail-" + formId)
                .find("[name=Quantity")
                .attr("data-added", newvalue);
              $(".ProductDetail-" + formId)
                .find("[name=Quantity")
                .val(newvalue);
              $(".ProductDetail-" + formId)
                .find(".form-check-input")
                .attr("data-added", newvalue);
              $(".ProductDetail-" + formId)
                .find(".addbtn")
                .prop("disabled", false);
            }
          },
          getsubstitutionInventory(productcode,codes) {
            var responsedata 
            $.ajax({
                async: false,
                url: "/Merchant5/merchant.mvc?Screen=CUDET&ProductAction=substitution&Productcode="+productcode+"&substitutioncode="+codes,
                success: function (response) {
                  var responsedata = response;
                  if(responsedata < 1 || responsedata == '') {
                   setTimeout(function(){
                    $('.ProductDetail-'+productcode).find('#viewSubstitutions').hide();
                   },500);
                  } else {
                    setTimeout(function(){
                      $('.ProductDetail-'+productcode).find('#viewSubstitutions').show();
                     },500);
                  }
                  
                },
              });
              return responsedata;
          },
          BasketData(){
            setTimeout(function(){
                basketApp.CheckBasketItemss();
            },100);
          }
        },
        computed: {
          // vueUserTypes: function () {
          //   var responsedata = "";
          //   $.ajax({
          //     async: false,
          //     url: "/Merchant5/merchant.mvc?Screen=CUDET&getUserDetails=1",
          //     success: function (response) {
          //       var res = response;
          //       responsedata = res.replaceAll(/\s/g, "");
          //     },
          //   });
          //   return responsedata;
          // },
          // getSlac: function () {
          //   var responsedata 
          //   $.ajax({
          //       async: false,
          //       url: "/Merchant5/merchant.mvc?Screen=CUDET&pricegroup=yes&customertype=retail",
          //       success: function (response) {
          //         var res = response;
          //         responsedata = res.replaceAll(/\s/g, "");
          //         /*console.log(responsedata);*/
          //       },
          //     });
          //     return responsedata;
          // },
          gridClass: function() {
            var gridClass = '';
            if((getPageCodes != 'SFNT') && getPageCodes != 'BASK' && getPageCodes !='MSHIP' && getPageCodes !='ShelfLP' && getPageCode != 'ShelfLP_copy' || getPageCode == 'Origins' ){
                gridClass = 'col-xs-6s col-sm-6s col-md-4s col-lg-3s gridclass ' + getPageCode;
            }
            return gridClass;
          }
        },
        mounted() {
          this.$nextTick(() => {
            if(container == 'firstcategory') {
              //FirstCatCarousel();
              Productscroll('.firstcategory',stockavailable.length);
            }
            if(container == 'secondcategory'){
              //SecondCatCarousel();
              // $(".productListing").show();
              Productscroll('.secondcategory',stockavailable.length);
              
            }else{
              if(getPageCode === 'solutions-program'){
                setTimeout(function(){
                  Productscroll('.load'+categoryCode,stockavailable.length);
                },2500);

              }else{
              $(".productListing").show();
              }
            }

            
            // addProductNew();
            checkthreebiecounter();
            checkSlacCounter();
            // setTimeout(function(){
            //     addProductNew();
            //     myObjects.BasketData();
            //   },500);
            });
          $(window).scroll(function () {
            if (
              $(window).scrollTop() >
              $(document).height() - $(window).height() - 900
            ) {
              if (
                $("#getCount").val() > 0 &&
                $("#getResponse").val() == "200"
              ) {
                myObjects.getallproducts('');
              }
            }
          });
          if(getPageCode == 'SFNT' || getPageCode == 'MSHIP'){
            //deliciousCarousel();
	        Productscroll('.productListing',stockavailable.length);
          }
          if(getPageCode == 'BASK'){
		      loadgreatDealsCarousel()
          }
          $(document).ready(function () {
            myObjects.getFilteredProducts();
            myObjects.loadJqueryAssets();
          });

        },
        created() {
            
            setTimeout(function(){
              // console.log(dataval);
              const codes = dataval.filter(item => item.data.code).map(item => item.data.code);
              addProductNewchange(codes);
                // addProductNew();
                myObjects.BasketData();
              },500);
              if(getPageCode === 'solutions-program' || getPageCode == 'Gifts'){
                Productscroll('.load'+categoryCode,stockavailable.length);
              }else{
              $(".productListing").show();
              }
        },
        updated: function () {
          myObjects.loadJqueryAssets();
          setTimeout(function(){
            const codes = dataval.filter(item => item.data.code).map(item => item.data.code);
            addProductNewchange(codes);
                // addProductNew();
          },500);
        },
      });
    //   CheckBasketItemss();
      // addProductNew();
      if((getPageCodes != 'SFNT') && getPageCodes != 'BASK' && getPageCodes !='MSHIP' && getPageCodes  !='ShelfLP' || getPageCode != 'ShelfLP_copy' || getPageCode == 'Origins'){
      //myObjects.getFacets(catcode);
                $(".background-container").css("height", "initial");
                $(".background-container").css("overflow", "auto");
                myObjects.loadJqueryAssets();
                $('.expanded').css('height','auto');
      //myObjects.loadJqueryAssets();
      }
      setTimeout(function () {
        // checkthreebiecounter();
        // addProductNew();
        // checkthreebiecounter();
      }, 1000);
    }
  );
	if(getPageCodes == 'CTGY'){
    getshelfcoupons();
}
  $(".closeCart").on("click", function () {
    /*location.reload();*/
  });
});



function getProductresponse(dataval) {
if(dataval.length  < 1){
$('.noprouctsmsg').css('display','flex');
}else{
  $('.noprouctsmsg').css('display','none');
}
  var products = [];
  var productprice = [];
  var allPrices = '';
  var uom = "";
  var addclass = "";
  for (let i = 0; i < dataval.length; i++) {
    var lowestUOM = "";
    var pack_size = 9999;
    var lowestprice = "";
    var highestpacksize = "";
    var highestprice = "";
    var pricediscount = "";
    var casesaving = "";
    var casesavingwholesale = "";
    var isSale = "";
    var isChildSale = "";
    var checkdealflags = "";
    var getpacksize;
    var restockdate;
     var totalcount = "";
    getpacksize = Math.min.apply(null, dataval[i].data.variants.map(function(item) {
      return item.pack_size;
    }));

                totalcount = dataval[i].data.total;
    
    //  check restock date and format the in US Standard
    restockdate = new Date(dataval[i].data.restock_date);
    dataval[i].restock_month = restockdate.toLocaleString('en-US',{month:'2-digit'});
    dataval[i].restock_day  = restockdate.toLocaleString('en-US',{day: '2-digit'});
    dataval[i].restock_year  = restockdate.toLocaleString('en-US',{year: 'numeric'});
    dataval[i].data.restock_date_formatted = dataval[i].restock_year+'-'+dataval[i].restock_month+'-'+dataval[i].restock_day;
    dataval[i].data.restock_date_formattednew = new Date(dataval[i].data.restock_date_formatted+'T12:00:00');
    dataval[i].data.restock_date_formattednew = dataval[i].data.restock_date_formattednew.toLocaleString('en-US', { timeZone: 'America/New_York' , month: '2-digit' }) + '/' + dataval[i].data.restock_date_formattednew.toLocaleString('en-US', { timeZone: 'America/New_York' , day: '2-digit' }) + '/' + dataval[i].data.restock_date_formattednew.toLocaleString('en-US', { timeZone: 'America/New_York' , year: 'numeric' })

    for (let j = 0; j < dataval[i].data.variants.length; j++) {
      if (getpacksize < pack_size) {
        lowestUOM = dataval[i].data.variants[j].UOM;
        pack_size = dataval[i].data.variants[j].pack_size;
        isChildSale = dataval[i].data.variants[j].sale;
        if (isChildSale == 0) {
          lowestprice = dataval[i].data.variants[j].price;
        }
      }
    }



    for (let j = 0; j < dataval[i].data.variants.length; j++) {
      var specificProductCode = dataval[i].data.variants[j].code;
      if (dataval[i].data.variants[j].pack_size != getpacksize) {
        dataval[i].data.variants[j].addclass = "hidden";
        dataval[i].data.variants[j].default = "0";
        isSale = dataval[i].data.variants[j].sale;

        if(dataval[i].data.variants[j].slac == "1" || dataval[i].data.variants[j].slac_retail == "1"){
          checkdealflags = 'yes';
          dataval[i].data.variants[j].checkdealflags = "yes";
          }else{
          checkdealflags = 'yes';
          }
          



        if (dataval[i].data.variants[j].slacdiscount == 0  &&  setWholesaleuser != 1 && TypofUser !== "Non-Profit") {
          highestprice = parseFloat(dataval[i].data.variants[j].price);
          msrpprice = parseFloat(dataval[i].data.variants[j].msrp);
          
          var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);
          
          getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(2);
          casesaving = 100 * (msrpprice - highestprice) / (msrpprice);
          if (casesaving.toFixed(2) > 0 && dataval[i].data.variants[j].slacdiscount <= '0') {
            // dataval[i].data.variants[j].notes = "Save " + parseFloat(casesaving.toFixed(2)) + '%';
            dataval[i].data.variants[j].slacdiscount = parseFloat(casesaving.toFixed(2) );
          }
          if(dataval[i].data.variants[j].notes != '' && dataval[i].data.variants[j].UOM_TEXT != 'Threebie' && dataval[i].data.variants[j].sale == '1' && setWholesaleuser != 1){
            dataval[i].data.variants[j].notes = dataval[i].data.variants[j].notes;
           }
          else if(dataval[i].data.variants[j].sale != '1' && setWholesaleuser != 1) {
             dataval[i].data.variants[j].notes = '';
            }
           else if(dataval[i].data.variants[j].sale != '1' && setWholesaleuser === 1){
             dataval[i].data.variants[j].notes = '';
            }
        }

       else if (isSale == 0 && isChildSale == 0) {
          highestpacksize = dataval[i].data.variants[j].pack_size;
          highestprice = parseFloat(dataval[i].data.variants[j].price);
          pricediscount = parseFloat(lowestprice * highestpacksize);
          var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);
          // 100 x (each price * no of items - case price) / (each price * no of items)
          getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(2);
          casesavingwholesale = 100 * (pricediscount - highestprice) / (pricediscount);
savedamount = (pricediscount - highestprice).toFixed(2);

          shownonprofittext = dataval[i].data.variants[j].UOM.split('of')[0].trim().includes('Pack') ? highestpacksize : ' a ' + dataval[i].data.variants[j].UOM.split('of')[0].trim();
          if (casesavingwholesale.toFixed(2) > 0 && dataval[i].data.variants[j].catch_weight != '1' && dataval[i].data.variants[j].notes == '') {
              dataval[i].data.variants[j].notes = "Save " + parseFloat(casesavingwholesale.toFixed(2)) + '%'; 
dataval[i].data.variants[j].nonprofitnotes = `Buy  ${shownonprofittext}, Save ${parseFloat(casesavingwholesale.toFixed(2)) + '%'}`;
          }else{
              dataval[i].data.variants[j].notes = "";
          }
        }
      }
         else {
            dataval[i].data.variants[j].default = "1";
            if(dataval[i].data.variants[j].notes != '' && dataval[i].data.variants[j].UOM_TEXT != 'Threebie' && dataval[i].data.variants[j].sale == '1' && setWholesaleuser != 1){
             dataval[i].data.variants[j].notes = dataval[i].data.variants[j].notes;
            }
            else if(dataval[i].data.variants[j].notes != '' && dataval[i].data.variants[j].vip_sale === 1){
              dataval[i].data.variants[j].notes = dataval[i].data.variants[j].notes;
             }
           else if(dataval[i].data.variants[j].sale != '1' && setWholesaleuser != 1){
              dataval[i].data.variants[j].notes = '';
             }
            else if(dataval[i].data.variants[j].sale != '1' && setWholesaleuser === 1){
              dataval[i].data.variants[j].notes = '';
             }
            
          }

      if (dataval[i].data.variants[j].UOM == "EA") {
        dataval[i].data.variants[j].UOM = "EACH";
      } else if (dataval[i].data.variants[j].UOM == "CS") {
        dataval[i].data.variants[j].UOM =
          "CASE" + " of " + dataval[i].data.variants[j].pack_size;
      } else if (dataval[i].data.variants[j].UOM == "BAG") {
        dataval[i].data.variants[j].UOM =
          "BAG" + " of " + dataval[i].data.variants[j].pack_size;
      } else if (dataval[i].data.variants[j].UOM == "BX") {
        dataval[i].data.variants[j].UOM =
          "Box" + " of " + dataval[i].data.variants[j].pack_size;
      } else if (dataval[i].data.variants[j].UOM == "PK") {
        dataval[i].data.variants[j].UOM =
          "Pack" + " of " + dataval[i].data.variants[j].pack_size;
      } else if (dataval[i].data.variants[j].UOM == "TUB") {
        dataval[i].data.variants[j].UOM =
          "TUB" + " of " + dataval[i].data.variants[j].pack_size;
      } else {
        dataval[i].data.variants[j].UOM = dataval[i].data.variants[j].UOM;
      }

      if(dataval[i].data.variants[j].sale == 0 && dataval[i].data.variants[j].sale_offer == 1){
        dataval[i].data.variants[j].sale = 2;
      }
      else if((dataval[i].data.variants[j].sale == 0 && dataval[i].data.variants[j].vip_sale == 1) || dataval[i].data.variants[j].sale == 1 && dataval[i].data.variants[j].vip_sale == 1){
        dataval[i].data.variants[j].sale = 3;
      }
      else{
        dataval[i].data.variants[j].sale = dataval[i].data.variants[j].sale ;
      }

      
    //   dataval[i].data.variants[j].newproductprice = `${dataval[i].data.variants[j].code}-${dataval[i].data.variants[j].price}`
    //   if (dataval[i].data.variants[j].code === specificProductCode) {
    //     productprice.push(dataval[i].data.variants[j].newproductprice);
    //     allPrices = productprice.join('|');
    //     console.log(dataval[i].data.variants[j].newproductprice);
    // }
      
    }

    for (let i = 0; i < dataval.length; i++) {
      let newProductPrices = []; // Array to store newproductprice values
    
      for (let j = 0; j < dataval[i].data.variants.length; j++) {
        var specificProductCode = dataval[i].data.variants[j].code;
        dataval[i].data.variants[j].newproductprice = `${dataval[i].data.variants[j].code}=${dataval[i].data.variants[j].price}`;
    
        if (dataval[i].data.variants[j].code === specificProductCode) {
          newProductPrices.push(dataval[i].data.variants[j].newproductprice); // Add newproductprice to array
        }
      }
    
      let joinedPrices = newProductPrices.join('|'); // Join array with '|'
      //console.log(joinedPrices); // Log the joined string
      dataval[i].data.newprices = joinedPrices;
      // console.log(dataval[i].data.newprices);
    }
    

      
      

    setTimeout(function(){
      if(dataval[i].data.product_inventory <= 0 && dataval[i].data.substitute !=''){
        myObjects.getsubstitutionInventory(dataval[i].data.code,dataval[i].data.substitute);
        }
    },10);



  }
  // console.log(dataval);
  //console.log(products);
    if (urlpath === "https://www.foodrelated.com" & getPageCode === 'SRCH') {
    dataLayer.push({
      searchTerm: searchKey, //pass the search term
      numberOfSearchResult: totalcount, //number of searches appeared
      event: "internalSearch",
    });
	// console.log(dataLayer);
  }
}

function getThreebieProducts() {
  if(screen.width < 768){
    $('#recipeFilter').click();
    $('.container-checkbox').find(' input[name="isThisthreebieProduct"]').click();
    $('.applyFilter').click();
  }else{
    $('input[name="isThisthreebieProduct"]:visible').trigger('click');
  }         
}

function getSlacProducts() {
  if(screen.width < 768){
    $('#recipeFilter').click();
    $('.container-checkbox').find(' input[name="isSLACProduct"]').click();
    $('.applyFilter').click();
  }else{
    $('input[name="isSLACProduct"]:visible').trigger('click');
  }         
}

 function getSlacCheck() {
  var responsedata 
  $.ajax({
      async: false,
      url: "/Merchant5/merchant.mvc?Screen=CUDET&pricegroup=yes&customertype=retail",
      success: function (response) {
        var res = response;
        responsedata = res.replaceAll(/\s/g, "");
        /*console.log(responsedata);*/
      },
    });
    return responsedata;
}

function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
  }
  return vars;
}