(function() {
     function LandingCtrl() {
        this.heroTitle = "DevTunes. Keeps you coding.";
     }
 
     angular
         .module('blocJams')
         .controller('LandingCtrl', LandingCtrl);
 })();