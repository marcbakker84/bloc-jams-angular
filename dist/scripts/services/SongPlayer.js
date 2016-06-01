(function() {
     function SongPlayer() {
         
         
        /**
            * @desc ??
            * @type ??
        */
         var SongPlayer = {};
          
        /**
            * @desc Currently playing song
            * @type {Object}
        */
         
         var currentSong = null;
        
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
                currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            currentSong = song;
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
            * @method SongPlayer.play
            * @desc Checks the status of the currently playing song and invokes playSong and/or setSong
            * @param {object} song
        */
        SongPlayer.play = function(song) {
                if (currentSong !== song) {
                    setSong(song);
                    playSong(song);
                } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };
         
        return SongPlayer;
        // JUKE --> why do we return songplayer and what is SongPlayer?    
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();