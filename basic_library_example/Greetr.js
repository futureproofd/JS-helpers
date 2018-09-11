(function(global,$){
    
    //to use 'new' function constructor without calling it directly, we want this initializer 
        //to return the results of another function constructor
    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language);
    }
    
    /* variables and objects available via closure, but hidden from others
    */
    var supportedLangs = ['en','es'];
    
    var greetings = {
        en : 'hello',
        es : 'hola'
    };
    
    var formalGreetings = {
        en : 'Greetings',
        es : 'Saludos'
    };
    
    var logMessages = {
        en : 'Logged in',
        es : 'Inicio sesion'
    };
    
    Greetr.prototype = {
        //and any additional methods/properties here (since we updated the prototype below)
        getFullName: function(){
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function(){
            //supportedLanguages is available lexically up the scope chain because of our closure
            if(supportedLangs.indexOf(this.language) === -1){
                throw "Invalid language";
            }
        },
        
        greeting : function(){
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting : function(){
            return formalGreetings[this.language] + ', ' + this.getFullName();
        },
        
        greet: function(formal){
            var msg;
            
            //if undefined or null it will be coerced to 'false'
            if(formal){
                msg = this.formalGreeting();
            }else{
                msg = this.greeting();
            }
            
            if(console){
                console.log(msg);
            }
            
            //'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function(){
            if(console){
                console.log(logMessages[this.language] + ': '+ this.getFullName());
            }
            return this;
        },
        
        setLang: function(lang){
            this.language = lang;
            this.validate();
            return this;
        },
        
        HTMLGreeting: function(selector, formal){
            if(!$){
                throw 'jQuery not loaded';
            }
            if(!selector){
                throw 'Missing jQuery selector';
            }
            
            var msg;
            if(formal){
                msg = this.formalGreeting();
            }else{
                msg = this.greeting();
            }
            $(selector).html(msg);
            
            return this;
        }
        
    };
    
    //this is the function constructor
    Greetr.init = function(firstName, lastName, language){
        
        //set 'this' to our calling empty object (created by the new operator)
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    };
    
    //set our init prototype to the greetr prototype
    //when we call greetr, it invokes a 'new' Greetr.init which means the function constructor
        //invokes a new object, causing the prototype to default to Greetr.init
        //we want to override it to the main Greetr object
    Greetr.init.prototype = Greetr.prototype;
    
    //Helpful aliases
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));