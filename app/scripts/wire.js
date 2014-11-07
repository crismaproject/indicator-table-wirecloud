angular.module(
    'de.cismet.crisma.widgets.wirecloud.indicatorTable',
    [
        'eu.crismaproject.worldstateAnalysis.directives',
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.crisma.ICMM.services'
    ]
).controller(
    'de.cismet.crisma.widgets.wirecloud.indicatorTable.wire',
    [
        '$scope',
        '$q',
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.crisma.ICMM.services.icmm',
        'DEBUG',
        function (
            $scope,
            $q,
            Worldstates,
            icmm,
            DEBUG
        ) {
            'use strict';

            var mashupPlatform, setSelectedWSWirecloud;

            if (typeof MashupPlatform === 'undefined') {
                if (DEBUG) {
                    console.log('mashup platform not available');
                }
            } else {
                // enable minification
                mashupPlatform = MashupPlatform;

                $scope.selectedWS = [];

                setSelectedWSWirecloud = function (newSelWsStringArray) {
                    var i, resolve, setArray, selWsStringArray;

                    if (DEBUG) {
                        console.log('BEGIN: receiving selected worldstates event: ' + newSelWsStringArray);
                    }

                    setArray = function (arr) {
                        var i, tmp;
                        
                        if (DEBUG) {
                            console.log('DO: receiving selected worldstates event: ' + arr);
                        }
                        
                        tmp = [];
                        for(i = 0; i < arr.length; ++i) {
                            tmp[i] = icmm.convertToCorrectIccDataFormat(arr[i]);
                        }
                        
                        $scope.selectedWS = tmp;

                        if (DEBUG) {
                            console.log('DONE: receiving selected worldstates event: ' + arr);
                        }
                    };

                    if (newSelWsStringArray) {
                        try {
                            selWsStringArray = JSON.parse(newSelWsStringArray);

                            if ($.isArray(selWsStringArray)) {
                                resolve = [];

                                for (i = 0; i < selWsStringArray.length; ++i) {
                                    resolve[i] = Worldstates.get({wsId: selWsStringArray[i]}).$promise;
                                }

                                $q.all(resolve).then(function (selWsArray) {
                                    setArray(selWsArray);
                                });
                            } else {
                                if (DEBUG) {
                                    console.log('not an array: ' + selWsStringArray);
                                }
                                setArray([]);
                            }
                        } catch (e) {
                            if (DEBUG) {
                                console.log(e);
                            }
                            setArray([]);
                        }
                    } else {
                        setArray([]);
                    }
                };

                mashupPlatform.wiring.registerCallback('setSelectedWorldstates', setSelectedWSWirecloud);
            }
        }
    ]
).config(
    [
        '$provide',
        function ($provide) {
            'use strict';

            var mashupPlatform;

            if (typeof MashupPlatform === 'undefined') {
                console.log('mashup platform not available');
            } else {
                // enable minification
                mashupPlatform = MashupPlatform;
                $provide.constant('DEBUG', mashupPlatform.prefs.get('DEBUG'));
                $provide.constant('CRISMA_DOMAIN', mashupPlatform.prefs.get('CRISMA_DOMAIN'));
                $provide.constant('CRISMA_ICMM_API', mashupPlatform.prefs.get('CRISMA_ICMM_API'));
            }
        }
    ]
);
