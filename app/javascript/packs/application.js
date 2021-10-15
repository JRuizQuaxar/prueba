// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//= require jquery
//= require jquery_ujs
//= require moment 
//= require fullcalendar
//= require fullcalendar/locale-all

//import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

//Rails.start()
Turbolinks.start()
ActiveStorage.start()
import $ from 'jquery';
require ("moment") //casi lo mismo, se agregó un cost moment

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

//document.addEventListener('DOMContentLoaded', function() {
  //let draggableEl = Draggable;
function eventCalendar() { //cambia
  let draggableEl = Draggable;
    var calendarEl = document.getElementById('calendar'); //lo mismo

    var calendar = new Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next',
        right: 'dayGridMonth,timeGridWeek,listMonth'
      },
      events: '/events.json',
      editable: true,
      eventDrop: function(info,delta, revertFunc) {
        //alert(info.event.title + " was dropped on " + info.event.start.toISOString());
        let event_data = { 
          event: {
            id: info.event.id,
            start: moment(info.event.start).format(),
            end: moment(info.event.end).format()
          }
        };
        console.log(event_data);
        // $.ajax({
        //   url: info.event.update_url,
        //   data: event_data,
        //   type: 'PUT'
        // });
        $.ajax({
          url: 'http://localhost:3000/events/' + info.event.id,
          data: event_data,
          type: 'PUT'
        });
      },
        plugins: [ dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
    droppable: true
    });

    calendar.render();
};

$(document).on('turbolinks:load', eventCalendar);