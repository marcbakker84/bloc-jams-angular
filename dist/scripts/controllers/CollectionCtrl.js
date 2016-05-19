(function() {
    
    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(15);
     }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();