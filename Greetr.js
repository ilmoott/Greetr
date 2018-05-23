//we encapsulate all the code inside a function, creating a new execution context
// so our variables doesn't affect the global space
;(function (global,jquery){
   
    //Greetr is a constructor that returns a new object created with
    //another constructor. As Greetr was set with "var", it's private
    var Greetr = function (firstname, lastname, language){
        return new Greetr.init(firstname, lastname, language);
    };
    
    //private properties - supported languages, greetings, formal greetings and logs
    var supportedLangs = ['en','es'];
    
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    }
    
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    }
    
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    }
    
    //here we're going to store all the methods of the Greetr.init
    //saving memory space
    Greetr.prototype = {
        
        //a privilege methods. it has access to privete properties
        // and can be used to expose them
        fullname: function(){
            return this.firstname +" "+this.lastname;
        },
        
        validate: function(){
            if (supportedLangs.indexOf(this.language) === -1){
                throw 'Invalid language';
            };
        },
        
        greeting: function (){
            return greetings[this.language] + ' ' + this.firstname+" !";
        },
        
        //this method uses a private property and a another method inside of it
        formalGreeting:  function (){
            return formalGreetings[this.language] + " " + this.fullname();
        },
        
        greet: function(formal){
            var msg;
            
            //if undefined or null it will be coerced to 'false'
            if (formal){
                msg = this.formalGreeting();
            }
            else{
                msg = this.greeting();
            }
            
            //if we're using this library on the browser
            if (console){
                console.log(msg);
            }
            
            //"this" refers to the calling object at execution time
            //makes the method chainable
            return this;
        },
        
        log: function(){
            
            
            if(console){
                console.log(logMessages[this.language]+": "+this.fullname());
            }
            
            //makes the method chainable
            return this
        },
        
        setLang: function(lang){
            this.language = lang;
            
            this.validate();
            
            //makes the method chainable
            return this;
        },
        
        //function that uses jQuery to update the screen
        //accepts a selector that will be passed to jQuery and a value for "formal"
        HTMLgreeting: function(selector,formal){
            
            //if jQuery is not loaded
            if(!$){
                throw 'jQuery not loaded';
            }
            
            //if there is no selector
            if (!selector){
                throw 'Missing jQuery selector';
            }
            
            //this saves the message to a variable according to the "formal" parameter
            //passed to the HTMLgreeting function
            var msg;
            if(formal){
                msg = this.formalGreeting();
            }
            else{
                msg = this.greeting();
            }
            
            //passes the selector parameter to the jQuery function
            //and update it to the screen usign the previous "msg"
            $(selector).html(msg);
            
            //makes it chainable
            return this
        }
    };
    
    
    //Greetr.init is the object that we're going to return to the global object
    Greetr.init = function (firstname, lastname, language){
        
        //we set the variable self to the value of this, so thanks to closures
        //we will always know the value of self/this
        var self = this;
        
        self.firstname = firstname || 'Default';
        self.lastname = lastname || 'Default';
        self.language = language || 'en'
        
    }
    
    //we set the Greetr.init prototype to be Greeter.prototype
    Greetr.init.prototype = Greetr.prototype;
    
    //we set "Greetr" to the global object, as well as "G$"
    //and set both to the Greetr object inside our library
    global.Greetr = global.G$ = Greetr;
    
}(window,jQuery));


/*
USING OUR LIBRARY

1. we create a click event and pass it a function
$('#login').click(function(){
    
    2.we set a variable to our object returned by our library
    var loginGrtr = G$('John','Doe');
    
    3.here we're hiding everything on the page, to make more clear
    when our object shows up
    $('#logindiv').hide();
    
    4.we use "setLang" and jQuery ".val()" to set the language to the value
    chosen by the user in the selection box
    5.then we use the "HTMLgreeting", with the ".greeting" class and "true"
    as paramenters to update the website
    6.we log the message to the console
    loginGrtr.setLang($('#lang').val()).HTMLgreeting('.greeting',true).log();
})
*/