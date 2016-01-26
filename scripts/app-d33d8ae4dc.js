!function(){"use strict";angular.module("formioAppBasic",["ngSanitize","ui.router","ui.bootstrap","formio"]).filter("capitalize",[function(){return _.capitalize}]).filter("truncate",[function(){return function(e,r){return _.isNumber(r)&&(r={length:r}),_.truncate(e,r)}}]).provider("Resource",["$stateProvider",function(e){var r={};return{register:function(t,o,n){r[t]=t;var s=n&&n.parent?n.parent:null,a=t+"Id",i=function(e){var r={};return r[a]=e._id,r},u=function(e){return["$scope","$rootScope","$state","$stateParams","Formio","FormioUtils","$controller",e]},c=n&&n.templates?n.templates:{};e.state(t+"Index",{url:"/"+t,parent:s?s:null,params:n.params&&n.params.index,templateUrl:c.index?c.index:"views/resource/index.html",controller:u(function(e,r,s,u,c,l,m){e.currentResource={name:t,queryId:a,formUrl:o},e.$on("submissionView",function(e,r){s.go(t+".view",i(r))}),e.$on("submissionEdit",function(e,r){s.go(t+".edit",i(r))}),e.$on("submissionDelete",function(e,r){s.go(t+".delete",i(r))}),n&&n.index&&m(n.index,{$scope:e})})}).state(t+"Create",{url:"/create/"+t,parent:s?s:null,params:n.params&&n.params.create,templateUrl:c.create?c.create:"views/resource/create.html",controller:u(function(e,r,s,u,c,l,m){e.currentResource={name:t,queryId:a,formUrl:o},e.submission={data:{}};var f=!1;if(n&&n.create){var p=m(n.create,{$scope:e});f=p.handle||!1}f||e.$on("formSubmission",function(e,r){s.go(t+".view",i(r))})})}).state(t,{"abstract":!0,url:"/"+t+"/:"+a,parent:s?s:null,templateUrl:"views/resource/resource.html",controller:u(function(e,r,i,u,c,l,m){var f=o+"/submission/"+u[a];e.currentResource=e[t]={name:t,queryId:a,formUrl:o,submissionUrl:f,formio:new c(f),resource:{},form:{},href:"/#/"+t+"/"+u[a]+"/",parent:s?e[s]:{href:"/#/",name:"home"}},e.currentResource.loadFormPromise=e.currentResource.formio.loadForm().then(function(r){e.currentResource.form=e[t].form=r}),e.currentResource.loadSubmissionPromise=e.currentResource.formio.loadSubmission().then(function(r){e.currentResource.resource=e[t].submission=r}),n&&n["abstract"]&&m(n["abstract"],{$scope:e})})}).state(t+".view",{url:"/",parent:t,params:n.params&&n.params.view,templateUrl:c.view?c.view:"views/resource/view.html",controller:u(function(e,r,t,o,s,a,i){n&&n.view&&i(n.view,{$scope:e})})}).state(t+".edit",{url:"/edit",parent:t,params:n.params&&n.params.edit,templateUrl:c.edit?c.edit:"views/resource/edit.html",controller:u(function(e,r,o,s,a,u,c){var l=!1;if(n&&n.edit){var m=c(n.edit,{$scope:e});l=m.handle||!1}l||e.$on("formSubmission",function(e,r){o.go(t+".view",i(r))})})}).state(t+".delete",{url:"/delete",parent:t,params:n.params&&n.params["delete"],templateUrl:c["delete"]?c["delete"]:"views/resource/delete.html",controller:u(function(e,r,o,s,a,i,u){var c=!1;if(n&&n["delete"]){var l=u(n["delete"],{$scope:e});c=l.handle||!1}c||e.$on("delete",function(){o.go(t+"Index")})})})},$get:function(){return r}}}]).config(["$stateProvider","$urlRouterProvider","FormioProvider","ResourceProvider","AppConfig","$injector",function(e,r,t,o,n,s){t.setBaseUrl(n.apiUrl),e.state("home",{url:"/",templateUrl:"views/home.html"}).state("auth",{"abstract":!0,url:"/auth",templateUrl:"views/user/auth.html"}).state("auth.login",{url:"/login",templateUrl:"views/user/login.html",controller:["$scope","$state","$rootScope",function(e,r,t){e.$on("formSubmission",function(e,o){o&&(t.user=o,r.go("home"))})}]}).state("auth.register",{url:"/register",templateUrl:"views/user/register.html",controller:["$scope","$state","$rootScope",function(e,r,t){e.$on("formSubmission",function(e,o){o&&(t.user=o,r.go("home"))})}]}),angular.forEach(n.resources,function(e,r){o.register(r,e.form,s.get(e.resource+"Provider"))}),r.otherwise("/")}]).factory("FormioAlerts",["$rootScope",function(e){var r=[];return{addAlert:function(t){e.alerts.push(t),t.element?angular.element("#form-group-"+t.element).addClass("has-error"):r.push(t)},getAlerts:function(){var e=angular.copy(r);return r.length=0,r=[],e},onError:function t(e){if(e.message)this.addAlert({type:"danger",message:e.message,element:e.path});else{var r=e.hasOwnProperty("errors")?e.errors:e.data.errors;angular.forEach(r,t.bind(this))}}}}]).run(["$rootScope","$state","$stateParams","Formio","AppConfig","FormioAlerts",function(e,r,t,o,n,s){e.userForm=n.forms.user,e.userRegisterForm=n.forms.userRegister,e.userLoginForm=n.forms.userLogin,angular.forEach(n.forms,function(r,t){e[t]=r}),e.user||o.currentUser().then(function(r){e.user=r});var a=function(e){return function(){localStorage.removeItem("formioUser"),localStorage.removeItem("formioToken"),r.go("auth.login"),s.addAlert({type:"danger",message:e})}};e.$on("formio.sessionExpired",a("Your session has expired. Please log in again.")),e.logout=function(){o.logout().then(function(){r.go("auth.login")})["catch"](a("Your session has expired. Please log in again."))},e.isActive=function(e){return-1!==r.current.name.indexOf(e)},e.$on("$stateChangeStart",function(t,n){e.authenticated=!!o.getToken(),"auth"!==n.name.substr(0,4)&&"admin.login"!==n.name.substr(0,11)&&(e.authenticated||(t.preventDefault(),r.go("auth.login")))}),e.$on("$stateChangeSuccess",function(){e.alerts=s.getAlerts()})}])}(),angular.module("formioAppBasic").provider("ExpenseResource",function(){return{$get:function(){return null},index:["$scope","$stateParams",function(e,r){}],"abstract":["$scope","$stateParams",function(e,r){}],view:["$scope","$stateParams",function(e,r){}],create:["$scope","$state",function(e,r){e.$on("formSubmission",function(e,r){console.log(r)})}],edit:["$scope","$stateParams",function(e,r){}],"delete":["$scope","$stateParams",function(e,r){}]}});