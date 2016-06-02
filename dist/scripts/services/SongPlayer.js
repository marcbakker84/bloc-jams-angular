(function() {
    function SongPlayer($rootScope, Fixtures) {
        /**
        * @desc ??
        * @type ??
        */
        var SongPlayer = {};
        
        /**
        * @desc Current album
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
         var currentBuzzObject = null;         
         
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
             
             
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc Plays a currentBuzzObject and sets song.playing to true to show the pause button
        * @param {object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            SongPlayer.currentSong.playing = true;
            //song.playing = true;
        } 
        
        /**
        * @function stopSong
        * @desc stops a currentBuzzObject and sets song.playing to null
        * @param {object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
            //song.playing = null;
        } 
        
        /**
        * @function getSongIndex
        * @desc Gets the index of the currently playing song.
        * @param {object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc Currently playing song
        * @type {Object}
        */    
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        * @desc Current volume (0-100) of currently playing song
        * @type {Number}
        */
        SongPlayer.volume = 60;
        
        
        /**
        * @method SongPlayer.play
        * @desc Checks the status of the currently playing song and invokes playSong and/or setSong
        * @param {object} song
        */
        SongPlayer.play = function(song) {
                song = song || SongPlayer.currentSong;
                if (SongPlayer.currentSong !== song) {
                    setSong(song);
                    playSong(song);
                } else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) { 
        // JUKE --> The conditional statement if (currentBuzzObject.isPaused()) is a check to make sure our assumption is correct.
                        playSong(song);
                    }
                }
        };
        
        /**
        * @method SongPlayer.payse
        * @desc Pauses the current song and changes the status of song.playing to false to show the play button.
        * @param {object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @method SongPlayer.previous
        * @desc Changes the currentsong index with 1 so, checks if it is <0 and if not the previous song will start to play.
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
                if (currentSongIndex < 0) {
                    stopSong();
                } else {
                    var song = currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
                }
            };  
        
        /**
        * @method SongPlayer.next
        * @desc Changes the currentsong index with 1 up, checks if it is higher than full album and if not the next song will start to play.
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
                if (currentSongIndex > currentAlbum.songs.length) {
                    stopSong();
                } else {
                    var song = currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
                }
            };  
    
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        /**
        * @function setVolume
        * @desc Set volume of currently playing song
        * @param {value} of the slider between 0 - 100
        */
        
        SongPlayer.setVolume = function(value) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(value);
            }
        };
        
        return SongPlayer;
        // JUKE --> why do we return songplayer and what is SongPlayer?    
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();