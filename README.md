# OrchidsSPA
AngularJS Single Page App connected to an OData RESTful Web API, featuring all CRUD functionality
Carmel Schvartzman's OData RESTful WEB API & Single Page Application (SPA) :
---------------------------------------------------------------------- 


APPLICATION DESCRIPTION :


1) This SPA app is built on the AngularJS javascript framework, and connects to an OData WebAPI 
built on an .Net MVC WebApiController
2) The OData WebAPI v4.0 preserves data in XML files
3) The data is fetched by the Web API REST web service through a Data Repository
4) All style design is based on the Twitter Bootstrap




############################################################################################################################
1) AngularJS Single Page App (SPA)  supporting all CRUD functionality:

  	  http://carmelwebapi.somee.com/AngularJS/OrchidsSPA.html



############################################################################################################################
2) WebAPI:  "OrchidsWebAPIController" : ApiController    
        - database = XML file - OData RESTful  
		- RETURNS : XML(get)/JSON(post - patch - delete)
        - supplies JSON data to :
		     1) Ajax enabled web page :  http://carmelwebapi.somee.com/
			   2) AngularJS SPA App :      http://carmelwebapi.somee.com/AngularJS/OrchidsSPA.html     

		- OData protocol call samples:

    http://carmelwebapi.somee.com/WebAPI/OrchidsWebAPI/?$skip=2&$top=3
    http://carmelwebapi.somee.com/WebAPI/OrchidsWebAPI




##########################################################################################################################
