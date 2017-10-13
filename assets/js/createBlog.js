var text = 0,code = 0, image = 0, vedio = 0;
var divStructure = {};
var currentEntry = {
    inProcess : 0,
    id : 0,
    type : 'text'
}
var functionCollection = {
}

var ID = {
    blogContent : $("#blog-content"),
    addText : $("#add-text-box"),
    addCode : $("#add-code-box"),
    addImage : $("#add-image-box"),
    addVedio : $("#add-vedio-box"),
    addnew : $(".add-new"),
    idStructure : {
        codeDiv : "code-block-div-",
        codeContent : "code-block-body-",
        textDiv : "text-block-div-",
        textContent : "text-block-content-",
    }
}



function deleteBlock(id,type){
    var div,content;
    if(type == "text"){
        div = ID.idStructure.textDiv;
    }else if(type == "code"){
        div = ID.idStructure.codeDiv;
    }
    $( "#"+div+id).remove();
    ID.addnew.show();
}
function saveBlock(id,type){
    console.log("Entered here");
    var div,content,classProto;
    if(type == "text"){
        classProto = "text"
        div = ID.idStructure.textDiv;
        content = $( "#"+ID.idStructure.textContent+id).val();
        if(content != ""){
            $("#"+div+id).removeClass(classProto);
            $("#"+div+id).html(divStructure.textStatic(content));
        }else{
            $( "#"+div+id).remove();
        }
    }else if(type == "code"){
        classProto = "code"
        div = ID.idStructure.codeDiv;
        content = $( "#"+ID.idStructure.codeContent+id).val();
        if(content != ""){
            $("#"+div+id).removeClass(classProto);
            $("#"+div+id).html(divStructure.codeStatic(content));
        }
    } 
    ID.addnew.show();

}

$(document).ready(function(){
    $("#blog_date").text(new Date().toLocaleDateString());
    divStructure = {
        textBlock : function(i){
            currentEntry.id = i;
            currentEntry.type = 'text';
            currentEntry.inProcess = 1;

            var div = "";

            div+= '<div class="common-head text" id="text-block-div-'+i+'">';
            div+= '<textarea name="text" class="input-text" id="text-block-content-'+i+'" rows="14" wrap="soft" placeholder=""></textarea>';
            div+= '<div class="row">';
            div+=     '<div class="col-sm-9">';
            div+=     '</div>';
            div+=     '<div class="col-sm-3">';
            div+=         '<div class="row" style="margin:5%;">';
            div+=                 '<i style="color:green;font-size:150%;" class="fa fa-check col-sm-6" aria-hidden="true"></i>';
            div+=                 '<i style="color:orange;font-size:150%;" onclick="deleteBlock('+"'"+i+"','text'"+')" class="fa fa-trash-o col-sm-6" aria-hidden="true"></i>';
            div+=         '</div>';
            div+=     '</div>';
            div+= '</div>';
            div+= '</div>';
            return div;
        },
        textStatic : function(content){
            var div = "";
            div+= '<div class="text-highlight" id="blog-text-static-0">'+content+'</div>';
            return div;
        },
        codeStatic : function(content){
            var div = "";
            div+= '<pre class="common-head code-highlight" id="blog-text-static-0">'+content+'</pre>';
            return div;
        },
        codeBlock : function(i){
            var div = "";
            currentEntry.id = i;
            currentEntry.type = 'code';
            currentEntry.inProcess = 1;

            var idObject = {
                codeDiv : "",
                codeContentDiv : ""
            }
            idObject.codeDiv = "code-block-div-"+i;
            idObject.cocodeContentDivdeDiv = "code-block-body-"+i;
            div+= '<div class="common-head code" id="code-block-div-'+i+'">';
            div+= '<textarea name="text" class="code-block-body" id="code-block-body-'+i+'" rows="14" wrap="soft" placeholder=""></textarea>';
            div+= '<div class="row">';
            div+=     '<div class="col-sm-9">';
            div+=        '<div class="dropdown" style="margin:2%;">';
            div+=            '<div class="dropdown-toggle" type="button" style="background:#fff;" data-toggle="dropdown">Language'
            div+=             '<span class="caret"></span></div>'
            div+=            '<ul class="dropdown-menu">'
            div+=                '<li><a href="#">HTML</a></li>'
            div+=                '<li><a href="#">CSS</a></li>'
            div+=                '<li><a href="#">JavaScript</a></li>'
            div+=            '</ul>'
            div+=         '</div>'
            div+=     '</div>';
            div+=     '<div class="col-sm-3">';
            div+=         '<div class="row" style="margin:5%;">';
            div+=                 '<i style="color:green;font-size:150%;" class="fa fa-check col-sm-6" aria-hidden="true"></i>';
            div+=                 '<i style="color:orange;font-size:150%;" onclick="deleteBlock('+"'"+i+"','code'"+')" class="fa fa-trash-o col-sm-6" aria-hidden="true"></i>';
            div+=         '</div>';
            div+=     '</div>';
            div+= '</div>';
            div+= '</div>';
            return div;
        }
    };

    ID.addText.on('click',function(){
        text++;
        ID.blogContent.append(divStructure.textBlock(text));
    });
    ID.addCode.on('click',function(){
        code++;
        ID.blogContent.append(divStructure.codeBlock(code));
    });
    ID.addnew.on('click',function(){
        console.log("Clicked the edit new");
        if(currentEntry.inProcess == 1){
            saveBlock(currentEntry.id,currentEntry.type);
            currentEntry.inProcess = 0;
            currentEntry.id = null;
            currentEntry.type = null;
        }
    });
});