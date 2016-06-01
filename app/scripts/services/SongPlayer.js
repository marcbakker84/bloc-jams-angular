(function() {
    function SongPlayer(Fixtures) {  
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
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
            song.playing = true;
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
                    currentBuzzObject.stop();
                    SongPlayer.currentSong.playing = null;
                } else {
                    var song = currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
                }
            };   
    
         
        return SongPlayer;
        // JUKE --> why do we return songplayer and what is SongPlayer?    
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();