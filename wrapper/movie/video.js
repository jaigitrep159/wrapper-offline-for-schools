(function(d,g){var f=function(m){var n=this;this.$el=m;this.$el.on("submit.video.goanimate",".video-license-form",function(p){var o=d(this);p.preventDefault();n.publish(o.serialize())}).on("click",'[data-action="buttonControl"]',function(q){var p=d(this);var o=true;if(p.data("show")=="#transfer_rights_form"){}else{if(p.data("hide")=="#transfer_rights_form"&&p.data("show")!="#movie_license_enterance"){if(n.validateAddressForm()==true){n.setLicense(d("#movie-license-form").serialize())}else{o=false}n.previewLicense()}}if(o==true){n.buttonControl(p.data("hide"),p.data("show"))}q.preventDefault()}).on("loaded",function(){n.resetState()})};f.sCountryWithoutZipCodeString="Afghanistan|Angola|Antigua and Barbuda|Aruba|Bahamas|Belize|Benin|Bhutan|Botswana|Burkina Faso|Burundi|Cameroon|Central African Republic|Comoros|Congo|Congo, The Democratic Republic of|Cook Islands|Côte d'Ivoire|Djibouti|Dominica|Equatorial Guinea|Eritrea|Fiji|Gambia|Gibraltar|Grenada|Guinea|Guyana|Hong Kong|Iceland|Kiribati|Korea, Democratic People's Republic of|Macao|Malawi|Mali|Mauritania|Mauritius|Montserrat|Namibia|Nauru|Netherlands Antilles|Niue|Panama|Qatar|Rwanda|Saint Kitts and Nevis|Saint Lucia|Saint Vincent and The Grenadines|Seychelles|Sierra Leone|Solomon Islands|Somalia|Suriname|Tanzania, United Republic of|Tokelau|Tonga|Trinidad and Tobago|Tuvalu|Uganda|United Arab Emirates|Vanuatu|Yemen|Zimbabwe";f.aCountryWithoutZipCode=f.sCountryWithoutZipCodeString.split("|");f.sCanadaStatesString="Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland|Northwest Territories|Nova Scotia|Nunavut|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon Territory";f.aCanadaStates=f.sCanadaStatesString.split("|");f.sCanadaStatesCodeString="AB|BC|MB|NB|NL|NT|NS|NU|ON|PE|QC|SK|YT";f.aCanadaStatesCode=f.sCanadaStatesCodeString.split("|");f.sUSAStatesString="Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming|Armed Forces Americas|Armed Forces|Armed Forces Pacific";f.aUSAStates=f.sUSAStatesString.split("|");f.sUSAStatesCodeString="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|AA|AE|AP";f.aUSAStatesCode=f.sUSAStatesCodeString.split("|");f.prototype=d.extend({},ModalBase.prototype,{setLicense:function(n){var m=this;this.loading();d.post("/ajax/manageMovieOwner/set",n,function(o){m.loading();if(o.error){m.alert(o.error,"error")}else{formDataArray=n.split("&");for(var p=0;p<formDataArray.length;p++){pair=formDataArray[p].split("=");replace_value=decodeURIComponent(pair[1]);m.$el.find(".u_"+pair[0]).html(replace_value.replace("+"," "))}}},"json")},getLicense:function(){var m=this;this.loading();d.post("/ajax/manageMovieOwner/get",formData,function(n){m.loading();if(n.error){m.alert(n.error,"error")}else{alert(n)}},"json")},buttonControl:function(n,m){this.$el.find(n).hide();this.$el.find(m).show();if(m=="#ending"||m=="#failure"){this.$el.find(".movie_license_header").hide()}else{this.$el.find(".movie_license_header").show()}},resetState:function(){var n=this;var o=this.$el.find("#cboCountry :selected").val();var m=this.$el.find("#user_state").val();if(o=="US"){this.$el.find("#input-state").hide();this.$el.find("#input-state").val("");this.$el.find("#cboState").show();n.updateOptions(this.$el.find("#cboState"),f.aUSAStates,f.aUSAStatesCode);this.$el.find("#cboState").val(m)}else{if(o=="CA"){this.$el.find("#input-state").hide();this.$el.find("#input-state").val("");this.$el.find("#cboState").show();n.updateOptions(this.$el.find("#cboState"),f.aCanadaStates,f.aCanadaStatesCode);this.$el.find("#cboState").val(m)}else{this.$el.find("#input-state").show();this.$el.find("#cboState").hide()}}n.updateZip()},toggleCompanyInput:function(){var n=this;var m=this.$el.find('[name="license_type"]:checked').val();if(m=="individual"){this.$el.find("#company_input").hide();this.$el.find('[name="company_name"]').val("")}else{if(m=="company"){this.$el.find("#company_input").show()}}},updateOptions:function(o,n,m){if(o.prop){var p=o.prop("options")}else{var p=o.attr("options")}d("option",o).remove();d.each(n,function(q,r){p[p.length]=new Option(r,m[q])})},updateZip:function(){var m=this;if(m.containsNoZip(this.$el.find("#cboCountry :selected").text())){this.$el.find("#fld_cczipcode").hide();this.$el.find("#cczipcode").val("00000")}else{if(this.$el.find("#cczipcode").val()=="00000"){this.$el.find("#cczipcode").val("")}this.$el.find("#fld_cczipcode").show()}},containsNoZip:function(n){for(var m=0;m<f.aCountryWithoutZipCode.length;m++){if(f.aCountryWithoutZipCode[m]===n){return true}}return false},validateAddressForm:function(){this.$el.find(".form-error").html("");var q=[];var m=this.$el.find('[name="company_name"]').val();var p=this.$el.find('[name="contact_person"]').val();var o=this.$el.find('[name="license_type"]:checked').val();var n=this.$el.find('[name="email"]').val();if(o=="company"){if(m==""){q.push({id:"fld_company_name",msg:GT.gettext("Please input your company name")})}}if(p==""){q.push({id:"fld_contact_person",msg:GT.gettext("Please input the name of your contact person")})}if(n!=""){if(!emailUtil.isValidFormat(n)){q.push({id:"fld_email",msg:GT.gettext("Invalid email")})}}for(i=0;i<q.length;i++){content=(q[i].msg);this.$el.find("#"+q[i].id).html(content)}if(q.length>0){return false}else{return true}},previewLicense:function(){var m=this.$el.find('[name="company_name"]').val();var n=this.$el.find('[name="contact_person"]').val();if(m!=""){this.$el.find(".b_contact").html(m)}else{this.$el.find(".b_contact").html(n)}},paymentConfirmed:function(m){this.buttonControl("#payment_info","#payment_confirmation");this.$el.find("#payment_confirmation").empty().html(m.html)}});var e=function(m){var n=this;this.$el=m;this.$el.on("submit.video.goanimate",".video-publish-form",function(q){var p=d(this);q.preventDefault();var o=p.serialize();o=o+"&ct="+encodeURIComponent(d('input[name="ct"]').attr("value"));n.publish(o)})};e.prototype=d.extend({},ModalBase.prototype,{publish:function(n){var m=this;this.loading();d.post("/ajax/saveMovieSettings",n,function(o){m.loading();if(o.error){m.alert(o.error,"error")}else{m.refresh();m.$el.trigger(d.Event("published"),[o.video])}},"json")}});var a=function(m){this.$el=m};a.prototype=d.extend({},ModalBase.prototype,{});var l=function(m,n){var o=this;this.$el=m;this.options=n;this.$el.on("click.video.goanimate","[data-video-export]",function(q){var p=d(this);q.preventDefault();if(p.data("videoExport")=="youtube"){o.popWindow(p.attr("href"))}else{o.requestExport(p.attr("href"))}}).on("exportError",function(q,p){o.alert(p.error,"error")}).on("exportSuccess",function(q,p){o.requestSuccess(p)}).on("click.video.goanimate",'[data-action="vidyard-connect"],[data-action="vidyard-reset"]',function(s,q){var r=d(this);var t=r.data("action");var p=d("#video-export #vidyard_token_in").val();if(t=="vidyard-connect"){o.$el.find(".modal-footer button.connect").addClass("disabled")}d.ajax({type:"POST",url:r.data("remote"),data:(t=="vidyard-reset"?{"delete":1}:{token:p}),success:function(u){if(u.error){o.alert(u.error,"error")}else{if(u.message){o.alert(u.message)}}if(u.status=="deleted"){o.$el.find(".modal-body,.modal-footer").removeClass("authorized").find(".vidyard-api-token").empty()}else{if(u.status=="updated"){o.$el.find(".modal-body,.modal-footer").addClass("authorized").find(".vidyard-api-token").text(p.substr(0,8)+"**********")}}o.$el.find(".modal-footer button.connect").removeClass("disabled")},error:function(){o.alert(GT.gettext("Error contacting the server"),"error");o.$el.find(".modal-footer button.connect").removeClass("disabled")}})}).on("wistiaConnectError",function(q,p){o.alert(p.error,"error")}).on("wistiaConnectSuccess",function(q,p){o.wistiaConnectSuccess(p)}).on("click.video.goanimate",'[data-action="wistia-connect"]',function(q){var p=d(this);q.preventDefault();o.popWindow(p.data("url"))}).on("click.video.goanimate",'[data-action="wistia-reset"]',function(q){var p=d(this);q.preventDefault();d.get("/wistiaReset",function(r){o.$el.find(".modal-body").removeClass("authorized").find(".wistia-account-name").empty()})}).on("change.video.goanimate keyup.video.goanimate",'[data-action="wevideo-auth"] input[name="email"]',function(p){if(!o.$el.find(".wevideo-export-authorize-action span:visible").hasClass("wevideo-export-authorize-button")){o.$el.find(".wevideo-export-authorize-action").find("span").hide().end().find(".wevideo-export-authorize-button").show()}}).on("submit.video.goanimate",'[data-action="wevideo-auth"]',function(q){var p=d(this);q.preventDefault();p.find(".wevideo-export-authorize-action").find("span").hide().end().find(".wevideo-export-authorize-loading").show();d.ajax({type:"POST",url:p.attr("action"),data:p.serialize(),success:function(r){if(r.suc){p.parents(".modal-body").find(".pick-resolution .wevideo_email").text(p.find('input[name="email"]').val());p.find(".wevideo-export-authorize-action").find("span").hide().end().find(".wevideo-export-authorize-message-success").show();o.$el.find('[data-action="wevideo-proceed-export"]').prop("disabled",false)}else{p.find(".wevideo-export-authorize-action").find("span").hide().end().find(".wevideo-export-authorize-message-fail").show()}},error:function(){o.alert(GT.gettext("Error contacting the server"),"error")},dataType:"json"})}).on("click.video.goanimate",'[data-action="wevideo-proceed-export"]',function(p){o.$el.find(".modal-body").addClass("authorized").end().find('.modal-footer [data-action="wevideo-proceed-export"]').hide()}).on("click.video.goanimate",'[data-action="wevideo-reset"]',function(q){var p=d(this);q.preventDefault();d.get("/ajax/wevideo/logout",function(r){o.$el.find(".modal-body").removeClass("authorized").end().find('.modal-footer [data-action="wevideo-proceed-export"]').prop("disabled",true).show()})});this.$el.on("click",'[data-action="vzaar-connect"]',function(q){var p=d(this);q.preventDefault();o.$el.find(".modal-content").addClass("authorizing");o.popWindow(p.data("url"))}).on("click",'[data-action="vzaar-reset"]',function(p){p.preventDefault();d.get("/vzaarReset",function(q){o.$el.find(".modal-content").removeClass("authorized").find(".vzaar-account-name").empty()})}).on("click",'[data-action="vzaar-authorize-cancel"]',function(p){p.preventDefault();o.$el.find(".modal-content").removeClass("authorizing")}).on("vzaarConnectError",function(q,p){o.alert(p.error,"error")}).on("vzaarConnectSuccess",function(q,p){o.vzaarConnectSuccess(p)}).on("loaded",function(p){if(navigator.appVersion.indexOf("Mac")!=-1){o.$el.find(".download-presentation .win").remove()}else{o.$el.find(".download-presentation .mac").remove()}})};l.prototype=d.extend({},ModalBase.prototype,{popWindow:function(m){g.open(m,"_go_video_export","toolbar=no,status=no,height=650,width=960")},requestExport:function(m){var n=this;d.get(m,function(o){if(o.error){n.alert(o.error,"error");return}n.requestSuccess(o)},"json").fail(function(o){n.alert("Error contacting server ("+o.status+"). Please try again later / reload the page.","error")})},requestSuccess:function(n){var m=" a.btn[data-video-export='"+n.type+"']";var p;switch(n.type){case"h5":case"h5presentation":p=GT.gettext("Processing (Beta)");break;default:p=GT.gettext("Processing");break}var o='<span class="btn btn-lg btn-dark">'+p+"...</span>";if(n.resolution){this.$el.find("."+n.resolution+m).replaceWith(o);switch(n.type){case"youtube":this.alert(GT.gettext("Your video is being converted and will be exported to YouTube. You can close this window."));break;case"lectora":this.alert(GT.gettext("Your video will be visible on Lectora Online after it has been converted. You can close this window."));break;case"viewbix":this.alert(GT.gettext("Your video is being converted. When the conversion is successful we will email you a URL you can use to create your Viewbix"));break;case"wevideo":this.alert(GT.gettext("You will receive an email once your video has been exported to WeVideo. You can close this window."));break;case"wistia":this.alert(GT.gettext("You will receive an email once your video has been exported to Wistia. You can close this window."));break;case"vidyard":this.alert(GT.gettext("You will receive an email once your video has been exported to Vidyard. You can close this window."));break;case"vzaar":this.alert(GT.gettext("You will receive an email once your video has been exported to vzaar. You can close this window."));break;case"gif":this.alert(GT.gettext("You will receive an email once your animated GIF is converted. You can close this window."));break;default:this.alert(GT.gettext("You will receive an email once your video is ready for download. You can close this window."))}}},wistiaConnectSuccess:function(m){this.$el.find(".modal-body").addClass("authorized").find(".wistia-account-name").text(m.account_name)},vzaarConnectSuccess:function(m){this.$el.find(".modal-content").removeClass("authorizing").addClass("authorized").find(".vzaar-account-name").text(m.login);this.alert(GT.gettext("Export to vzaar successfully activated."))}});g.videoExportError=function(m){d("#video-export").trigger("exportError",[m])};g.videoExportStarted=function(m){d("#video-export").trigger("exportSuccess",[m])};g.wistiaConnectError=function(m){d("#video-export").trigger("wistiaConnectError",[m])};g.wistiaConnectSuccess=function(m){d("#video-export").trigger("wistiaConnectSuccess",[m])};g.vzaarConnectError=function(m){d("#video-export").trigger("vzaarConnectError",[m])};g.vzaarConnectSuccess=function(m){d("#video-export").trigger("vzaarConnectSuccess",[m])};var b=function(m,n){var o=this;this.$el=m;this.options=n;this.$el.on("submit.video.goanimate",".video-settings-form",function(r){var q=d(this);r.preventDefault();var p=q.serialize();p=p+"&ct="+encodeURIComponent(d('input[name="ct"]').attr("value"));o.post(p)})};b.prototype=d.extend({},ModalBase.prototype,{post:function(n){var m=this;m.loading();d.post("/ajax/saveMovieSettings",n,function(o){var p=d.Event("saved");m.loading();if(o.error){m.alert(o.error,"error")}else{m.$el.modal("hide");showNotice(GT.gettext("Video settings updated"));m.$el.trigger(p,[o.video])}},"json")}});var h={doDelete:function(m){if(!confirm(GT.gettext("Are you sure you want to delete this video?"))){return}amplitudeIncrementUserProperty(AMPLITUDE_USER_PROPERTY_KEYS.TOTAL_SAVED_VIDEOS,-1);amplitudeTrackEvent(AMPLITUDE_EVENT.DELETED_VIDEO);d.post("/ajax/deleteMovie/"+m,{ct:d('input[name="ct"]').attr("value")},function(n){parseResponse(n);if(responseArray.code=="0"){var o=false;if(d("#video-"+m).data("dragVideoCurrentFolder")===""){o=true}else{o=false}d("#video-"+m).find('[rel="tooltip"]').tooltip("destroy");d("#video-"+m).fadeOut(300,function(){d(this).remove()});d(document).trigger("videoDeleted",o)}else{showNotice(responseArray.json.error,true)}resetResponse()})},doUnDelete:function(m){d.post("/ajax/undeleteMovie/"+m,{ct:d('input[name="ct"]').attr("value")},function(n){parseResponse(n);if(responseArray.code=="0"){var o=false;if(d("#video-"+m).data("dragVideoCurrentFolder")===""){o=true}else{o=false}d("#video-"+m).find('[rel="tooltip"]').tooltip("destroy");d("#video-"+m).fadeOut(300,function(){d(this).remove()});d(document).trigger("videoRestored",o)}else{showNotice(responseArray.json.error,true)}resetResponse()})}};var k=function(m){var n=this;this.$el=m;this.$el.on("submit.folder.goanimate",".folder-create-form",function(q){var p=d(this);var o=null;q.preventDefault();amplitudeSetUserProperty(AMPLITUDE_USER_PROPERTY_KEYS.TOTAL_CURRENT_FOLDERS,(folderCounts+1));amplitudeTrackEvent(AMPLITUDE_EVENT.CREATE_FOLDER);data=p.serializeArray();data.push({name:"ct",value:d('input[name="ct"]').val()});n.postCreate(d.param(data),p)});this.$el.on("click.folder.goanimate",".folder-create-another a",function(p){var o=d(this);p.preventDefault();d.tmpl("folder_create_tmpl").appendTo(n.$el.find(".folder-create-forms"));n.$el.find(".folder-create-another").hide()});this.$el.on("click.folder.goanimate",".folder-create-form .btn-delete-folder.active",function(p){var o=d(this);p.preventDefault();amplitudeSetUserProperty(AMPLITUDE_USER_PROPERTY_KEYS.TOTAL_CURRENT_FOLDERS,(folderCounts-1));amplitudeTrackEvent(AMPLITUDE_EVENT.DELETE_FOLDER);n.postDelete({folder_id:o.attr("data-enc-fid"),ct:d('input[name="ct"]').val()},o)})};k.prototype=d.extend({},ModalBase.prototype,{postCreate:function(o,m){var n=this;m.find(".btn-create-folder").find("button").children("span").hide().end().find(".msg-loading").show().end().attr("disabled",true);d.post("/ajax/addMovieFolder",o,function(q){m.find(".btn-create-folder").find("button").children("span").hide().end().find(".msg-default").show().end().attr("disabled",false);if(q.error){n.alert(q.error,"error")}else{myVideos.updateFolderList();m.find(".btn-create-folder").find("button").children("span").hide().end().find(".msg-created").show().end().attr("disabled",true);m.find(".btn-delete-folder").removeClass("invisible").attr("data-enc-fid",q.enc_fid);m.find("input[name=enc_fid]").val(q.enc_fid);n.$el.find(".folder-create-another").show();n.$el.find(".modal-footer").addClass("modal-footer-collapse-open");var p=m.find("input[name=from_assign]").val();if(d("#video-assign-folder")&&(p==1)){var r=d("<option></option>");r.val(q.enc_fid);r.text(q.name);r.prop("selected",true);d("#video-assign-folder").find(".folder-assign-form select[name=folder_id]").prepend(r)}}})},postDelete:function(n,o){var m=this;o.find(".icon-default").hide().end().find(".icon-loading").show();d.post("/ajax/deleteMovieFolder",n,function(r){o.find(".icon-loading").hide().end().find(".icon-default").show();if(r.error){m.alert(r.error,"error")}else{o.siblings(".btn-create-folder").find("button").children("span").hide().end().find(".msg-deleted").show();o.addClass("invisible");var p=o.attr("data-enc-fid");d("#videos-folders-nav").find('li[data-folder-id="'+p+'"]').remove();var q=o.parents("form.folder-create-form").find("input[name=from_assign]").val();if(d("#video-assign-folder")&&(q==1)){d("#video-assign-folder").find('.folder-assign-form select[name=folder_id] option[value="'+n.folder_id+'"]').remove()}}})}});var j=function(m){var n=this;this.$el=m;this.$el.on("submit.folder.goanimate",".folder-edit-form",function(p){var o=d(this);p.preventDefault();data=o.serializeArray();data.push({name:"ct",value:d('input[name="ct"]').val()});n.postEdit(d.param(data))});this.$el.on("click.folder.goanimate",".folder-edit-form .btn-delete-folder.active",function(p){var o=d(this);p.preventDefault();amplitudeSetUserProperty(AMPLITUDE_USER_PROPERTY_KEYS.TOTAL_CURRENT_FOLDERS,(folderCounts-1));amplitudeTrackEvent(AMPLITUDE_EVENT.DELETE_FOLDER);n.postDelete({folder_id:o.attr("data-enc-fid"),ct:d('input[name="ct"]').val()})});this.$el.on("click.folder.goanimate",".folder-recover-form-container .folder-recover-link",function(p){var o=d(this);p.preventDefault();data=d(".folder-recover-form").serializeArray();data.push({name:"ct",value:d('input[name="ct"]').val()});n.postDeleteReceover(d.param(data))})};j.prototype=d.extend({},ModalBase.prototype,{postEdit:function(n){var m=this;m.$el.find(".btn-edit-folder").find("button").children("span").hide().end().find(".msg-loading").show().end().attr("disabled",true);d.post("/ajax/updateMovieFolder",n,function(p){m.$el.find(".btn-edit-folder").find("button").children("span").hide().end().find(".msg-default").show().end().attr("disabled",false);if(p.error){m.alert(p.error,"error")}else{m.$el.find(".btn-edit-folder").find("button").children("span").hide().end().find(".msg-success").show().end().attr("disabled",true);m.$el.find(".modal-footer").addClass("modal-footer-collapse-open");var o=m.$el.find("form input[name=enc_fid]").val();var q=d("<div/>").text(m.$el.find("form input[name=name]").val()).html();d('div[data-category="folders/'+o+'"] .folder-name').html(q);d(".video-breadcrumb").find('li[data-folder-id="'+o+'"]').html(q)}})},postDelete:function(n){var m=this;m.$el.find(".btn-delete-folder").find(".icon-default").hide().end().find(".icon-loading").show();d.post("/ajax/deleteMovieFolder",n,function(p){m.$el.find(".btn-delete-folder").find(".icon-loading").hide().end().find(".icon-default").show();if(p.error){m.alert(p.error,"error")}else{m.$el.find(".modal-body").find(".folder-form-container").hide().end().find(".folder-recover-form-container").show();m.$el.find(".modal-footer").addClass("modal-footer-collapse-open");var o=m.$el.find("form input[name=enc_fid]").val();d("#videos-folders-nav").find('div[data-folder-id="'+o+'"]').remove()}})},postDeleteReceover:function(n){var m=this;m.loading();d.post("/ajax/addMovieFolder",n,function(o){m.loading();if(o.error){m.alert(o.error,"error")}else{myVideos.updateFolderList();m.$el.find(".folder-recover-confirm").hide().end().find(".folder-recover-status").show()}})}});var c=function(m){var n=this;this.$el=m;this.$el.on("submit.folder.goanimate",".folder-assign-form",function(p){var o=d(this);p.preventDefault();n.post(o.serialize())});this.$el.on("click.folder.goanimate",".folder-assign-form .btn-create-folder",function(r){var q=d(this),o=ModalBase.ensure("folder-create"),p=o.data("folderCreate");if(!p){o.data("folderCreate",p=new k(o))}r.preventDefault();p.load(q.data("remote"))})};c.prototype=d.extend({},ModalBase.prototype,{post:function(o){var n=this;n.$el.find(".btn-assign-folder").find("button").children("span").hide().end().find(".msg-loading").show().end().attr("disabled",true);var m=(n.$el.find("form input[name=current_folder_id]").val()==="")?"/ajax/addMovieToFolder":"/ajax/moveMovieToFolder";d.post(m,o,function(s){n.$el.find(".btn-assign-folder").find("button").children("span").hide().end().find(".msg-default").show().end().attr("disabled",false);if(s.error){n.alert(s.error,"error")}else{n.$el.find(".btn-assign-folder").find("button").children("span").hide().end().find(".msg-success").show().end().attr("disabled",true);n.$el.find(".modal-footer").addClass("modal-footer-collapse-open");var r=n.$el.find("form input[name=video_id]").val();var u=n.$el.find("form input[name=current_folder_id]").val();var q=parseInt(d("#videos-nav").find('.drop-region[data-folder-id="'+u+'"] .video-count').text())-1;d("#videos-nav").find('.drop-region[data-folder-id="'+u+'"] .video-count').text(q);d(".video-listing-heading .video-count").text(q);var p=n.$el.find("form select[name=folder_id]").val();var t=parseInt(d("#videos-nav").find('.drop-region[data-folder-id="'+p+'"] .video-count').text())+1;d("#videos-nav").find('.drop-region[data-folder-id="'+p+'"] .video-count').text(t);myVideos.list()}})}});d(document).on("click",'[data-action="video-share"]',function(p){var o=d(this),n=ModalBase.ensure("video-share"),m=n.data("videoShare");if(!m){n.data("videoShare",m=new e(n))}p.preventDefault();m.load(o.data("remote"))}).on("click",'[data-action="video-edit"]',function(p){var o=d(this),m=ModalBase.ensure("video-edit"),n=m.data("videoEdit");if(!n){m.data("videoEdit",n=new a(m))}p.preventDefault();n.load(o.data("remote"))}).on("click",'[data-action="remove-conversion"]',function(p){var o=d(this),m=ModalBase.ensure("video-edit"),n=m.data("videoEdit");enc_movie_id=o.data("video");d.post("/ajax/removePendingConversions/"+enc_movie_id,function(q){if(q.error){n.alert(q.error,"error")}else{n.alert("The conversion process has been cancelled. You can now edit your video. Re-start the conversion process to download/export the most recent version of your video.","success alert-icon");m.find("#video_enabled").show();m.find("#video_disabled").hide()}},"json");p.preventDefault()}).on("click",'[data-action="video-export"]',function(p){var o=d(this),n=ModalBase.ensure("video-export"),q=n.data("videoExport"),m=o.data("export-target");p.preventDefault();if(!o.hasClass("download")&&!o.hasClass("youtube")&&o.hasClass("disabled")){return}if(!q){n.data("videoExport",q=new l(n))}q.load(o.data("remote"))}).on("click",'[data-action="video-settings"]',function(o){var n=d(this),m=ModalBase.ensure("video-settings"),p=m.data("videoSettings");if(!p){m.data("videoSettings",p=new b(m))}o.preventDefault();p.load(n.data("remote"))}).on("click.video.goanimate",'[data-action="video-delete"]',function(m){m.preventDefault();h.doDelete(d(this).data("video"))}).on("click.video.goanimate",'[data-action="video-restore"]',function(m){m.preventDefault();h.doUnDelete(d(this).data("video"))}).on("click.video.goanimate",'[data-action="video-watermark"]',function(m){m.preventDefault();d.post("/ajax/getUserWatermarks/"+d(this).data("video"),function(n){showOverlay(n)})}).on("click",'[data-action="video-license"]',function(p){var o=d(this),m=ModalBase.ensure("video-license"),n=m.data("videoLicense");if(!n){m.data("VideoLicense",n=new f(m));g.themeassetprovider_payment_confirm=function(q){n.paymentConfirmed(q)}}p.preventDefault();n.load(o.data("remote"))}).on("change",'[name="cbo_country"]',function(p){var o=d(this),m=ModalBase.ensure("video-license"),n=m.data("videoLicense");if(!n){m.data("VideoLicense",n=new f(m))}p.preventDefault();n.resetState()}).on("change",'[name="license_type"]',function(p){var o=d(this),m=ModalBase.ensure("video-license"),n=m.data("videoLicense");if(!n){m.data("VideoLicense",n=new f(m))}p.preventDefault();n.toggleCompanyInput()}).on("click",'[data-action="folder-create"]',function(p){var o=d(this),m=ModalBase.ensure("folder-create"),n=m.data("folderCreate");if(!n){m.data("folderCreate",n=new k(m))}p.preventDefault();n.load(o.data("remote"))}).on("click",'[data-action="folder-edit"]',function(p){var o=d(this),n=ModalBase.ensure("folder-edit"),m=n.data("folderEdit");if(!m){n.data("folderEdit",m=new j(n))}p.preventDefault();m.load(o.data("remote"))}).on("click",'[data-action="assign-folder"]',function(p){var o=d(this),m=ModalBase.ensure("video-assign-folder"),n=m.data("folderAssign");if(!n){m.data("folderAssign",n=new c(m))}p.preventDefault();n.load(o.data("remote"))}).on("click",'[data-action="video-migrate-vm5"]',function(m){m.preventDefault();d("#modal-alpha-vm5").find("a.proceed-migration").attr("href",d(this).attr("href")).end().modal("show")}).on("click","#modal-alpha-vm5 .proceed-migration",function(){d("#modal-alpha-vm5").modal("hide")})})(jQuery,window);