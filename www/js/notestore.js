angular.module('mynotes.notestore', [])
//custom Angular Service
  .factory('NoteStore', function() {
                              //Read when data exists or initialize when no data is available
    var notes = angular.fromJson(window.localStorage['notes'] || '[]');

    //To store the data locally
    function persist(){
      window.localStorage['notes'] = angular.toJson(notes);
    }

    return {
      list: function() {
        return notes;
      },

      get: function(noteId) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id === noteId) {
            return notes[i];
          }
        }
        return undefined;
      },

      create: function(note){
        notes.push(note);
        persist();
      },

      update: function(note) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id === note.id) {
            notes[i] = note;
            persist();
            return;
          }
        }
      }
    };
  });
