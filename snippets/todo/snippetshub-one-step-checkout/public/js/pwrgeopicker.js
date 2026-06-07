/**
 *  2015 RUCH S.A.
 *
 *  @author    RUCH S.A.
 *  @copyright 2015 RUCH S.A.
 *  @license RUCH S.A. ALL RIGHT RESERVED
 *  International Registered Trademark & Property of RUCH S.A.
 *  @license   RUCH S.A. ALL RIGHT RESERVED
 *
 */
;(function ( $, window, document, undefined ) {
    var pluginName = 'pwrgeopicker';
    var version = '0.1';

    var defaults  = {
        'inline': 'popup',
        'target': 'body',
        'pwr_api_url': '//mapka.paczkawruchu.pl/g/index.php/points/',
        'filter_by_city': true,
        'popup_template': '<div style="color: black !important;">#{Location}<br><b>#{StreetName}</b><br><b>Godziny otwarcia: #{OpeningHours}</b><br><br>' +
        '<button class="paczkawruchu_hover_button">Wybierz</button><br><br></div>',
        'popup': false,
        'max_points': 5,
        'onselect': null,
        'autocomplete': false,
        'type': 'ALL',
        'CashOnDelivery': null,
        'auto_start': false,
        'locale': {
            'city': 'Miasto',
            'street': 'Ulica',
            'searchbtn': 'szukaj &gt;',
            'no_points': 'Nie znaleziono punktĂłw',
            'bad_form-data': 'WypeĹnij poprawnie pole:'
        },
        'marker_icons': {
            'mouseover': '//mapka.paczkawruchu.pl/images/darkblue-dot.png',
            'mouseout': '//mapka.paczkawruchu.pl/images/blue-dot.png',
            'mousedown': '//mapka.paczkawruchu.pl/images/green-dot.png',
            'mouseup': '//mapka.paczkawruchu.pl/images/blue-dot.png'
        },
        'form': {
            'city': '',
            'street': ''
        },
        'map': {
            center: [51.9077298, 19.9526048],
            zoom: 7,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false
        }
    };

    /* Plugin instance */
    function PwrGeoPicker(options, element) {
        this.options = $.extend({}, defaults, options);
        this.__init.call(this);
    };

    function parseContent(that, marker)
    {
        var template = that.options['popup_template'];
        var customData = marker['customData'];
        if ( !customData['Location'] )
        {
            customData['Location'] = '';
        }
        var rgxp = /#\{([^{}]*)}/g;

        repr = function (str, match) {
            return typeof customData[match] === 'string' || typeof customData[match] === 'number' ? customData[match] : str;
        };

        return template.replace(rgxp, repr);
    };

    function createMarker(that, point) {
        var myLatlng = new google.maps.LatLng(point['Latitude'], point['Longitude']);

        var loc = point['Location'];
        if (  typeof loc !== 'string'  )
        {
            loc = '';
        }

        var marker = new google.maps.Marker({
            position: myLatlng,
            icon: '//mapka.paczkawruchu.pl/images/blue-dot.png',
            title: loc,
            customData: point
        });
        google.maps.event.addListener(marker, 'mouseover', function() {
            marker.setIcon(that.options['marker_icons']['mouseover']);
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
            marker.setIcon(that.options['marker_icons']['mouseout']);
        });
        google.maps.event.addListener(marker, 'mousedown', function() {
            marker.setIcon(that.options['marker_icons']['mousedown']);
        });
        google.maps.event.addListener(marker, 'mouseup', function() {
            marker.setIcon(that.options['marker_icons']['mouseup']);
        });
        if ( that.options['popup'] === false )
        {
            google.maps.event.addListener(marker, 'click', function(){
                that.onselectevent.call(that, this['customData']);
                if (that.options['inline'] != 'inline' )
                {
                    that.hide();
                }
            });
        } else {
            google.maps.event.addListener(marker, 'click', function(){
                if ( that._current_infowindow )
                {
                    that._current_infowindow.close();
                }
                that._current_infowindow = new google.maps.InfoWindow({
                    maxWidth: 300
                });
                if (!that['Location'])
                {
                    that['Location'] = '';
                }
                var content = $(parseContent(that, marker));
                content.find('button').on('click', function(e){
                    that.onselectevent.call(that, marker['customData']);
                    that._current_infowindow.close();
                    if (that.options['inline'] != 'inline' )
                    {
                        that.hide();
                    }
                });
                that._current_infowindow.setContent(content[0]);
                that._current_infowindow.open(that.map, marker);
            });
        }
        marker.setMap(that.map);
        return marker;
    };

    function find_closest_marker(lat, lng, points, exclude) {
        function rad(x) {
            return x * Math.PI / 180;
        };

        var R = 6371; // radius of earth in km
        var distances = [];
        var closest = -1;
        for (i = 0; i < points.length; i++) {
            if (exclude.indexOf(i) > -1)
                continue;

            var mlat = parseFloat(points[i].Latitude);
            var mlng = parseFloat(points[i].Longitude);
            var dLat = rad(mlat - lat);
            var dLong = rad(mlng - lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            distances[i] = d;
            if (closest == -1 || d < distances[closest]) {
                closest = i;
            }
        }

        return closest;
    };

    function LoadAndPlaceMarkers(that, city, lat, lng, prevent_scale, last_time)
    {
        var max_points = that.options['max_points'];
        if (last_time || $.trim(that.form['street'].val()) != '' )
        {
            max_points = 5;
        }
        var cod = 'ALL';
        if ( that.options['CashOnDelivery'] !== null )
        {
            cod = (that.options['CashOnDelivery']==true)?'TRUE':'FALSE';
        }
        var url = that.options['pwr_api_url'] + 'cashondelivery/'+cod+'/point/'+that.options['type']+'/';

        if ( that.options['filter_by_city'] == true )
        {
            url = url + 'city/'+city;
        }

        $.ajax({
            'url': url,
            'cache': true,
            'accepts': 'application/json',
            'contentType': 'application/json',
            'crossDomain': true,
            'dataType': 'jsonp',
            'error': function(xhr, status, error)
            {
                console.log(xhr, status, error);
            },
            'success': function(response, status, xhr)
            {
                console.log(response);

                if ( !response || response.length < 1)
                {
                    if ( last_time == true  )
                    {
                        that.showMessage(that.options['locale']['no_points']);
                    } else {
                        LoadAndPlaceMarkers(that, 'ALL', lat, lng, prevent_scale, true)
                    }

                    return;
                }

                that.clearMarkers();
                var _fit = [], mark_er;
                if ( max_points != '' && max_points > 0 )
                {
                    var _m, idxs = [];
                    for (var i = 0; i < max_points; i++) {
                        _m = find_closest_marker(lat, lng, response, idxs);
                        idxs.push(_m);
                        mark_er = createMarker(that, response[_m]);
                        _fit.push(mark_er );
                        that.markers.push(mark_er );
                    }

                } else {
                    for(var i=0; i<response.length;i++)
                    {
                        mark_er = createMarker(that, response[i]);
                        that.markers.push( mark_er );
                        _fit.push(mark_er);
                    }
                }
                that.fitBounds(_fit, prevent_scale);
            },
            'type': 'GET'
        });
    }

    function getForm(that)
    {
        var _embed_class = '';
        if ( that.options['target'] != 'body' )
        {
            _embed_class = 'inline';
        }

        var _elements = {
            'overlay': $('<div class="paczkawruchu_overlay"></div>'),
            'map': $('<div class="paczkawruchu_map_object"></div>'),
            'pwr': $('<div class="paczkawruchu_main '+_embed_class+'"></div>'),
            'city': $('<input type="text" class="paczkawruchu_input paczkawruchu_input_city" ' +
            'placeholder="'+that.options['locale']['city']+'" value="'+(that.options['form']['city']?
                that.options['form']['city']:'')+'" />'),
            'street': $('<input type="text" class="paczkawruchu_input paczkawruchu_input_street" ' +
            'placeholder="'+that.options['locale']['street']+'" value="'+(that.options['form']['street']?
                that.options['form']['street']:'')+'" />'),
            'searchbtn': $('<button class="paczkawruchu_input paczkawruchu_input_search paczkawruchu_hover_button">' +
            ''+that.options['locale']['searchbtn']+'</button>')
        };

        if ( that.options['inline'] != 'inline')
        {
            _elements['closebtn'] = $('<a class="paczkawruchu_close_btn"></a>');
        }

        _elements['searchbtn'].on('click', $.proxy( that.search, that ));

        if ( that.options['inline'] != 'inline' ) {
            _elements['closebtn'].on('click', $.proxy(that.hide, that));
        }

        if ( that.options['autocomplete'] == true )
        {
            var auto_city= new google.maps.places.Autocomplete(_elements['city'][0], {
                types: ['(cities)'],
                componentRestrictions: {country: 'pl'}
            });

            var auto_street = new google.maps.places.Autocomplete(_elements['street'][0], {
                types: ['address'],
                componentRestrictions: {country: 'pl'}
            });
            google.maps.event.addListener(auto_street, 'place_changed', function() {
                var place = auto_street.getPlace();
                for (var i = 0; i < place.address_components.length; i++) {
                    if (place.address_components[i].types[0] == 'route') {
                        _elements['street'].val(place.address_components[i].long_name);
                        break;
                    }
                }
            });
        }

        _elements['city'].on('keyup', function(e){
            if (e.keyCode == 13)
            {
                if ($.trim($(this).val()) == '' )
                {
                    e.preventDefault();
                    that.showMessage(that.options['locale']['bad_form-data']+' '+that.options['locale']['city']);
                } else {
                    that.search.call(that);
                }
            }
        });

        _elements['street'].on('keyup', function(e){
            if (e.keyCode == 13)
            {
                if ($.trim($(this).val()) == '' )
                {
                    e.preventDefault();
                    that.showMessage(that.options['locale']['bad_form-data']+' '+that.options['locale']['street']);
                } else {
                    that.search.call(that);
                }
            }
        });

        _elements['pwr'].append(_elements['city']);
        _elements['pwr'].append(_elements['street']);
        _elements['pwr'].append(_elements['searchbtn']);
        _elements['pwr'].append(_elements['closebtn']);
        _elements['pwr'].append(_elements['map']);

        return _elements;
    };

    function placeMap(that)
    {
        var mapOptions = that.options['map'];
        if ( mapOptions['center'] && mapOptions['center'].length==2 )
        {
            mapOptions['center'] = new google.maps.LatLng(mapOptions['center'][0], mapOptions['center'][1]);
        }
        var map = new google.maps.Map(that.form['map'][0], mapOptions);

        google.maps.event.addListener(map, 'dragend', $.proxy(that.ondragend, that));

        return map;
    };

    /* Plugin start */
    PwrGeoPicker.prototype = {
        __init: function(){
            var that = this;
            if ( this.options['onselect'] )
            {
                this.onselectevent = this.options['onselect'];
            } else {
                this.onselectevent = function (result) {
                    console.log(result);
                };
            }

            this._current_infowindow;
            this.ondragend = function(){};
            this.markers = [];
            this._state = false;
            this.form = getForm(this);
            this.map = null;
            this.geocoder = new google.maps.Geocoder();
            if ( this.options['target'] != 'body' )
            {
                this.show();
            }
        },
        fitBounds: function(_fit, prevent_scale)
        {
            console.log(_fit, prevent_scale)
            var latlngbounds = new google.maps.LatLngBounds();
            for(var i= 0; i<_fit.length; i++)
            {
                latlngbounds.extend(_fit[i].position);
            }

            if ( !prevent_scale ){
                this.map.setCenter(latlngbounds.getCenter());
                this.map.fitBounds(latlngbounds);
            }
        },
        clearMarkers: function() {
            if (this.markers.length > 0) {
                for (var maridx = 0; maridx < this.markers.length; maridx++) {
                    this.markers[maridx].setMap(null);
                }
                this.markers = [];
            }
        },
        'collectFormData': function(){
            var o = [$.trim( this.form['city'].val() ), $.trim( this.form['street'].val() )];
            return o;
        },
        'show': function(e){
            var that = this;
            if ( this._state === false )
            {
                if ( this.options['target'] == 'body' )
                {
                    $(this.options['target']).append(this.form['overlay']);
                    $(this.options['target']).append(this.form['pwr']);
                } else {
                    $(this.options['target']).html(this.form['pwr']);
                }

                setTimeout(function(){
                    that.map = placeMap(that);
                }, 400);

                this._state = true;
                if ( this.options['auto_start'] )
                {
                    this.search();
                }
            } else {
                this.form['overlay'].show();
                this.form['pwr'].show();
            }
        },
        'hide': function(e){
            this.form['overlay'].hide();
            this.form['pwr'].hide();
        },
        'destroy': function(){},
        'updateForm': function(city, street){},
        'search': function(e){
            var form = this.collectFormData();
            if ( form[0] != '' || form[1] != '' )
            {
                this.geocoder.geocode({ 'address': form.join(',')}, $.proxy(function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if ( !results[0].geometry.bounds )
                        {
                            this.map.setCenter(results[0].geometry.location)
                            this.map.setZoom(16);
                        } else {
                            this.map.fitBounds(results[0].geometry.bounds);
                        }
                        var city = null;
                        for(var i=0; i<results.length; i++ )
                        {
                            if ( results[i]['address_components'] != 'undefined' )
                            {
                                $.each(results[i]['address_components'], function(i, j){

                                    if ( this['types'] && this['types'].indexOf('locality') != -1 )
                                    {
                                        city = this['long_name'];
                                        return false;
                                    } else if ( this['types'] && this['types'].indexOf('administrative_area_level_2') != -1 )
                                    {
                                        city = this['long_name'];
                                        return false;
                                    }
                                });
                            }
                            if ( city )
                                break;
                        }
                        if ( !city && this.options['filter_by_city'] == true )
                        {
                            this.showMessage(this.options['locale']['bad_form-data'] + ' ' + this.options['locale']['city']);
                            return;
                        }
                        LoadAndPlaceMarkers(this, city, results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    }
                }, this));

                return true;
            }
            var msg = this.options['locale']['bad_form-data'];
            if ( form[0] == '' )
            {
                msg = msg + ' ' + this.options['locale']['city'];
            }
            if ( form[1] == '' )
            {
                msg = msg + ' ' + this.options['locale']['street'];
            }
            this.showMessage(msg);
            return false;
        },
        'showMessage': function(msg){
            alert(msg)
        },
        'onSelect': function(clb){
            this.onselectevent = clb;
        }
    };


    $.PwrGeoPicker = function(options) {
        return new PwrGeoPicker(options);
    };


    $.fn[ pluginName ] = function ( inline_or_not, options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                if ( !inline_or_not )
                {
                    inline_or_not = 'popup';
                }
                if ( !options ) {
                    options = {};
                }
                options['inline'] = inline_or_not;
                if ( inline_or_not == 'inline' )
                {
                    options['target'] = this;
                } else {
                    $(this).on('click', function(){
                       $(this).data("plugin_" + pluginName).show();
                    });
                }
                $.data( this, "plugin_" + pluginName, new PwrGeoPicker( options ) );
            }
        });
        return this;
    };

})( jQuery, window, document );