(function() {
//     function CollectionCtrl() {
//        this.albums = [];
//        for (var i=0; i < 12; i++) {
//            this.albums.push(angular.copy(albumPicasso));
//        }
//     }
    
    function CollectionCtrl(Fixtures) {
        this.albums = [];
        for (var i=0; i < 12; i++) {
            var data = Fixtures.getAlbum();
            this.albums.push(angular.copy(Fixtures.getAlbum()));
        }
     }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();