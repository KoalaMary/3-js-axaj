'use strict';

var info = $('.info');

function useXhr(api) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === xhr.DONE) {
            try {
                var data = JSON.parse(xhr.responseText);
                info.text('XMLHttpRequest: ' + data.date + '  ' + data.base + ' =' + data.rates.RUB + 'RUB');
                console.log('Result XMLHttpRequest: ', data);
            }
            catch (error) {
                console.log('XMLHttpRequest Error', error);
            }
        }
    });
    xhr.open('GET', api);
    xhr.send();
};

function useFetch(api) {
    var xhr = fetch(api, {
        method: 'GET'
    });
    xhr
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            info.text('Fetch: ' + data.date + '  ' + data.base + ' =' + data.rates.RUB + 'RUB');
            console.log('Result Fetch: ', data);
        })
        .catch(function (error) {
            console.log('Fetch Error', error);
        })
};

function useJSONP(api) {
    var script = document.createElement("script");
    script.src = api;
    document.head.appendChild(script);
    window.jsonCallback = function (data) {
        console.log('Result JSONP: ', data);
        var site = data.sites[0];
        info.text(site.siteName + ' ' + site.domainName + ' ' + site.description);
    }
};

function useAjax(api) {
    var ajax = $.get({
        url: api,
        type: 'GET',
        data: {
            symbols: 'RUB'
        },
        success: function (response) {
            console.log('Response ajax: ', response)
        },
        error: function (err) {
            console.log('Ajax Error', err)
        }
    });
    ajax.done(function (data) {
        console.log('Result ajax', data);
        info.text('Ajax: ' + data.date + '  ' + data.base + ' =' + data.rates.RUB + 'RUB');
    });
};

function useGet(api) {
    $.get(api, function (data) {
        info.text('Get: ' + data.date + '  ' + data.base + ' =' + data.rates.RUB + 'RUB');
        console.log('Result Get: ', data);
    });
};

function usePost(api, data) {
    $.post({
        url: api
    })
        .done(function (response) {
            try {
                info.text('Post: ' + 'id ' + response.id);
                console.log('Result Post: ', response);
            }
            catch (error) {
                console.log('Post Error: ', error);
            }
        })
        .fail(function (error) {
            console.log('Post Error: ', error);
        });
};

let fixerApi = 'http://api.fixer.io/latest?symbols=USD,RUB';
let jsonpApi = 'http://run.plnkr.co/plunks/v8xyYN64V4nqCshgjKms/data-2.json';
let postApi = 'http://jsonplaceholder.typicode.com/posts';

$('.tryXML').on('click', () => {useXhr(fixerApi);});
$('.tryFetch').on('click', () => {useFetch(fixerApi);});
$('.tryJSONP').on('click', () => {useJSONP(jsonpApi);});
$('.tryAjax').on('click', () => {useAjax(fixerApi);});
$('.tryGet').on('click', () => {useGet(fixerApi);});
$('.tryPost').on('click', () => {usePost(postApi);});
