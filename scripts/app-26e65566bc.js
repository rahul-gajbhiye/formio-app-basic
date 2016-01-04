!function(){"use strict";angular.module("formioAppBasic",["ngSanitize","ui.router","ui.bootstrap","formio"]).config(["$stateProvider","$urlRouterProvider","FormioProvider","AppConfig",function(e,t,o,r){o.setBaseUrl(r.apiUrl),e.state("home",{url:"/",templateUrl:"views/main.html"}).state("auth",{"abstract":!0,url:"/auth",templateUrl:"views/user/auth.html"}).state("auth.login",{url:"/login",templateUrl:"views/user/login.html",controller:["$scope","$state","$rootScope",function(e,t,o){e.$on("formSubmission",function(e,r){r&&(o.user=r,t.go("home"))})}]}).state("auth.register",{url:"/register",templateUrl:"views/user/register.html",controller:["$scope","$state","$rootScope",function(e,t,o){e.$on("formSubmission",function(e,r){r&&(o.user=r,t.go("home"))})}]}),t.otherwise("/")}]).factory("FormioAlerts",function(){var e=[];return{addAlert:function(t){e.push(t),t.element?angular.element("#form-group-"+t.element).addClass("has-error"):e.push(t)},getAlerts:function(){var t=angular.copy(e);return e.length=0,e=[],t},onError:function t(e){if(e.message)this.addAlert({type:"danger",message:e.message,element:e.path});else{var o=e.hasOwnProperty("errors")?e.errors:e.data.errors;angular.forEach(o,t.bind(this))}}}}).run(["$rootScope","$state","$stateParams","Formio","AppConfig","FormioAlerts",function(e,t,o,r,s,i){e.userForm=s.forms.userForm,e.userRegisterForm=s.forms.userRegisterForm,e.userLoginForm=s.forms.userLoginForm,angular.forEach(s.forms,function(t,o){e[o]=t}),e.user||r.currentUser().then(function(t){e.user=t});var a=function(){t.go("auth.login"),i.addAlert({type:"danger",message:"Your session has expired. Please log in again."})};e.$on("formio.sessionExpired",a),e.$on("formio.unauthorized",function(){t.go("home")}),e.logout=function(){r.logout().then(function(){t.go("auth.login")})["catch"](a)},e.isActive=function(e){return-1!==t.current.name.indexOf(e)},e.$on("$stateChangeStart",function(o,s){e.authenticated=!!r.getToken(),"auth"!==s.name.substr(0,4)&&"admin.login"!==s.name.substr(0,11)&&(e.authenticated||(o.preventDefault(),t.go("auth.login")))})}])}(),angular.module("formioAppBasic").run(["$templateCache",function(e){e.put("app/user/auth.html",'<div class="row"><div class="jumbotron"><div class="row"><div class="col-sm-6 text-center"><p class="lead">You can easily embed your Forms and Resources into this application using.</p><div><pre>&lt;formio src="\'https://yourapp.form.io/user/login\'"&gt;&lt;/formio&gt;</pre></div><p class="lead">Need Help?</p><ul class="list-inline"><li><a class="btn btn-lg btn-success" target="_blank" href="http://help.form.io/embedding/">Embedding</a></li><li><a class="btn btn-lg btn-success" target="_blank" href="http://help.form.io">Documentation</a></li></ul></div><div class="col-sm-6"><h4>Try out these forms...</h4><div class="panel panel-default"><div class="panel-heading" style="padding-bottom: 0; border-bottom: none;"><ul class="nav nav-tabs" style="border-bottom: none;"><li role="presentation" ng-class="{active:isActive(\'auth.login\')}"><a ui-sref="auth.login()">Login</a></li><li role="presentation" ng-class="{active:isActive(\'auth.register\')}"><a ui-sref="auth.register()">Register</a></li></ul></div><div class="panel-body"><div class="row"><div class="col-lg-12"><div ui-view=""></div></div></div></div></div></div></div></div></div>'),e.put("app/user/login.html",'<formio src="userLoginForm"></formio>'),e.put("app/user/register.html",'<formio src="userRegisterForm"></formio>'),e.put("app/main.html",'<div class="row"><div class="jumbotron"><div class="row"><div class="col-sm-6 text-center"><p class="lead">You can easily embed your Forms and Resources into this application using.</p><div><pre>&lt;formio src="\'https://yourapp.form.io/user/login\'"&gt;&lt;/formio&gt;</pre></div><p class="lead">Need Help?</p><ul class="list-inline"><li><a class="btn btn-lg btn-success" target="_blank" href="http://help.form.io/embedding/">Embedding</a></li><li><a class="btn btn-lg btn-success" target="_blank" href="http://help.form.io">Documentation</a></li></ul></div><div class="col-sm-6"><p class="lead">Example Form</p><div class="well"><formio src="userForm"></formio></div></div></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-26e65566bc.js.map
