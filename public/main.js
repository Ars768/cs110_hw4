'use strict';

const search_in_list = function(){

    const search = $('#search').val();

    $.ajax({

        url: "/search",

        method: "get",

        dataType: "json",

        data: {search: search},

        success: function (data) {

            $("tbody").html('');

            data.items.forEach(function (item) {

                let box = $("<tr id = '"+item.id+"'><td class='message'><p>" + item.message +

                    "</p></td><td><input onclick = 'update_to_do(this)' type ='checkbox'></td>" +

                    "<td><button class='del' onclick = 'delete_to_do(this)'>Delete</button></td></tr>");

                let check = box.find("input");

                check.prop("checked", item.checked);

                $("tbody").append(box);

            });

        },

        error: function (err) {

            alert("Listing error");

        }

    });

};



const create_to_do = function(){

    const title = $('#create').val();

    if(title === '') alert("Error: the to-do cannot be empty");

    else{

        $.ajax({

            url: "/create",

            method: "post",

            dataType: "text",

            data: JSON.stringify({

                message   : title,

                completed : false

            }),

            success: function () {

                search_in_list();

                $('#create').val('');

            },

            error: function (err) {

                alert("Creating error");

            }

        });

    }

};

const update_to_do = function(to_do_item){

    let to_do_itemID = $(to_do_item).parent().parent().attr('id');

    $.ajax({

        url         : "/update/" + to_do_itemID,

        type        : 'put',

        dataType    : 'text',

        contentType : "application/json; charset=utf-8",

        success     : function(data) {

            search_in_list();



        },

        error       : function(data) {

            alert('Cannot update to-do list');

        }

    });



};



const delete_to_do = function(to_do_item){

    let to_do_itemID = $(to_do_item).parent().parent().attr('id');

    $.ajax({

        url     : "/delete/" + to_do_itemID,

        type : 'delete',

        dataType: 'text',

        success : function(data) {

            search_in_list();

        },

        error: function (err) {

            alert("Cannot delete to-do item");

        }

    });

};

search_in_list();