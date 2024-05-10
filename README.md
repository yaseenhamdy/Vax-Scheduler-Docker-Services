To Run this Project : 
1- install docker desktop
2- Clean and Install all the jar files of the java projects 
3- Open the command line in the main project folder which contain the docker compose.yml
4- write docker compose up -d
*****************************
if you want to create an indvidual containers
1- open each folder and build an image of the project by typing " docker build -t imageName . " ---> remove the double qoutes and type a name for the image 
2- write the command " docker run --name -p 0000:0000 -d imageName for each service " in this case every container is indvidual and no need docker compose 
but you can combine between the two cases :D
3- in the docker compose file add the image section and wrtie the image of the container that u want to add --> i've done this but commented it, you can remove the comments, like this image : ####
*****************************
